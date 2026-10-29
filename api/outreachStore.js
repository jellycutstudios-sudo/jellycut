/**
 * Jellycut Studios — Persistent Outreach & Lead Tracking Store
 * 
 * Manages persistent lead tracking, campaign logs, and suppression lists.
 * Stored locally in data/outreach-store.json for zero-dependency persistence.
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');
const dataDir = join(rootDir, 'data');
const DB_FILE = join(dataDir, 'outreach-store.json');

// Ensure data directory exists
if (!existsSync(dataDir)) {
  mkdirSync(dataDir, { recursive: true });
}

const DEFAULT_STATE = {
  leads: [],
  suppressedEmails: [], // Unsubscribed or do-not-contact
  lastUpdated: new Date().toISOString()
};

function readDB() {
  try {
    if (!existsSync(DB_FILE)) {
      writeFileSync(DB_FILE, JSON.stringify(DEFAULT_STATE, null, 2), 'utf-8');
      return DEFAULT_STATE;
    }
    const data = JSON.parse(readFileSync(DB_FILE, 'utf-8'));
    return {
      leads: Array.isArray(data.leads) ? data.leads : [],
      suppressedEmails: Array.isArray(data.suppressedEmails) ? data.suppressedEmails : [],
      lastUpdated: data.lastUpdated || new Date().toISOString()
    };
  } catch (err) {
    console.error('[OutreachStore Error]:', err.message);
    return DEFAULT_STATE;
  }
}

function writeDB(data) {
  try {
    data.lastUpdated = new Date().toISOString();
    writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('[OutreachStore Write Error]:', err.message);
    return false;
  }
}

/**
 * Check if an email is already sent or suppressed
 */
export function isSuppressed(email) {
  if (!email) return false;
  const cleanEmail = email.toLowerCase().trim();
  const db = readDB();

  // Check explicit suppression list (unsubscribes)
  if (db.suppressedEmails.some(e => e.toLowerCase().trim() === cleanEmail)) {
    return { suppressed: true, reason: 'opted_out' };
  }

  // Check if already sent
  const existingSent = db.leads.find(l => 
    l.email.toLowerCase().trim() === cleanEmail && l.status === 'sent'
  );
  if (existingSent) {
    return { 
      suppressed: true, 
      reason: 'already_sent', 
      sentAt: existingSent.sentAt,
      company: existingSent.companyName 
    };
  }

  return { suppressed: false };
}

/**
 * Add an email to the suppression / opt-out list
 */
export function addSuppression(email, reason = 'user_unsubscribe') {
  const cleanEmail = email.toLowerCase().trim();
  const db = readDB();
  if (!db.suppressedEmails.includes(cleanEmail)) {
    db.suppressedEmails.push(cleanEmail);
  }
  
  // Also update existing leads with this email to opted_out
  db.leads.forEach(l => {
    if (l.email.toLowerCase().trim() === cleanEmail) {
      l.status = 'opted_out';
      l.optedOutAt = new Date().toISOString();
      l.optOutReason = reason;
    }
  });

  writeDB(db);
  return { success: true, email: cleanEmail };
}

/**
 * Get all stored leads with optional status filter
 */
export function getAllLeads(filterStatus = null) {
  const db = readDB();
  if (!filterStatus) return db.leads;
  return db.leads.filter(l => l.status === filterStatus);
}

/**
 * Get a lead by ID or Email
 */
export function getLead(idOrEmail) {
  const db = readDB();
  const needle = idOrEmail.toLowerCase().trim();
  return db.leads.find(l => l.id === idOrEmail || l.email.toLowerCase().trim() === needle);
}

/**
 * Save or update a lead
 */
export function saveLead(leadData) {
  const db = readDB();
  const id = leadData.id || `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  
  const existingIndex = db.leads.findIndex(l => l.id === id || l.email.toLowerCase().trim() === leadData.email.toLowerCase().trim());
  
  const record = {
    id,
    email: leadData.email.toLowerCase().trim(),
    companyName: leadData.companyName || '',
    websiteUrl: leadData.websiteUrl || '',
    country: leadData.country || 'International',
    leadType: leadData.leadType || 'auto_detect',
    
    // Intelligence & Research
    researchSummary: leadData.researchSummary || '',
    confidenceLevel: leadData.confidenceLevel || 'medium', // high | medium | manual_review
    sources: leadData.sources || [],
    recommendedService: leadData.recommendedService || 'AI Video Ads',
    portfolioAnchor: leadData.portfolioAnchor || 'Filbey Neural Crunch',
    
    // Copy
    subject: leadData.subject || '',
    body: leadData.body || '',
    
    // Lifecycle Status
    status: leadData.status || 'draft', // draft | approved | sent | bounced | opted_out
    createdAt: leadData.createdAt || new Date().toISOString(),
    approvedAt: leadData.approvedAt || null,
    sentAt: leadData.sentAt || null,
    messageId: leadData.messageId || null,
    error: leadData.error || null,
    followUpStatus: leadData.followUpStatus || 'pending'
  };

  if (existingIndex >= 0) {
    db.leads[existingIndex] = { ...db.leads[existingIndex], ...record, updatedAt: new Date().toISOString() };
  } else {
    db.leads.unshift(record);
  }

  writeDB(db);
  return record;
}

/**
 * Record successful send
 */
export function markLeadSent(leadId, messageId) {
  const db = readDB();
  const lead = db.leads.find(l => l.id === leadId);
  if (lead) {
    lead.status = 'sent';
    lead.sentAt = new Date().toISOString();
    lead.messageId = messageId;
    lead.error = null;
    writeDB(db);
  }
  return lead;
}

/**
 * Record send failure
 */
export function markLeadFailed(leadId, errorMessage) {
  const db = readDB();
  const lead = db.leads.find(l => l.id === leadId);
  if (lead) {
    lead.status = 'failed';
    lead.error = errorMessage;
    writeDB(db);
  }
  return lead;
}

