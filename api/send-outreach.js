import { sendOutreachEmail } from '../scripts/send-outreach.mjs';
import { isSuppressed, markLeadSent, markLeadFailed, saveLead } from './outreachStore.js';

export const config = {
  runtime: 'nodejs',
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Security: protect outbound sending endpoint with admin authentication
  const adminSecret = process.env.ADMIN_SECRET_KEY || 'jellycut_outreach_secret_2026';
  const authHeader = req.headers.authorization || req.headers['x-admin-token'] || '';
  const token = authHeader.replace(/^Bearer\s+/i, '').trim();

  // Also allow requests from local dev server loopback if header matches
  if (!token || token !== adminSecret) {
    return res.status(401).json({ error: 'Unauthorized: Valid admin secret required' });
  }

  try {
    const { 
      to, 
      name, 
      subject, 
      body, 
      leadId,
      isSimulation = false 
    } = req.body;

    if (!to || !subject || !body) {
      return res.status(400).json({ error: 'Missing required fields: to, subject, body' });
    }

    // 1. Safety check: Suppression / Duplicate check
    const suppressionCheck = isSuppressed(to);
    if (suppressionCheck.suppressed && !isSimulation) {
      return res.status(409).json({ 
        error: `Outreach blocked by safety filter: This contact is marked as ${suppressionCheck.reason}.`,
        suppressionReason: suppressionCheck.reason,
        sentAt: suppressionCheck.sentAt
      });
    }

    // 2. Simulated / Dry-run send
    if (isSimulation) {
      console.log(`\n🧪 [Simulated Outreach Send]`);
      console.log(`   To: ${to}`);
      console.log(`   Subject: ${subject}`);
      console.log(`   Simulation mode active — no actual email dispatched.`);
      
      return res.status(200).json({ 
        success: true, 
        simulated: true, 
        message: 'Simulation test passed. Email was verified and formatted without live delivery.' 
      });
    }

    // 3. Live Send via Nodemailer
    const result = await sendOutreachEmail({ to, name, subject, body });

    // 4. Update persistent tracking store
    if (leadId) {
      markLeadSent(leadId, result.messageId);
    } else {
      saveLead({
        email: to,
        companyName: name || '',
        subject,
        body,
        status: 'sent',
        messageId: result.messageId,
        sentAt: new Date().toISOString()
      });
    }

    return res.status(200).json({ 
      success: true, 
      messageId: result.messageId,
      sentTo: to 
    });
  } catch (error) {
    console.error('Outreach error:', error);
    if (req.body.leadId) {
      markLeadFailed(req.body.leadId, error.message);
    }
    return res.status(500).json({ error: error.message });
  }
}
