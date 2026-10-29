/**
 * Jellycut Studios Lead Outreach Sender
 * 
 * Usage:
 *   node scripts/send-outreach.mjs --to "client@example.com" --name "Alex" --subject "Quick question about [Brand]" --body "Hey Alex..."
 *   node scripts/send-outreach.mjs --json "path/to/payload.json"
 *   node scripts/send-outreach.mjs --test
 */

import nodemailer from 'nodemailer';
import { readFileSync, existsSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

// Load .env.local
const envPath = join(rootDir, '.env.local');
if (existsSync(envPath)) {
  const envContent = readFileSync(envPath, 'utf-8');
  for (const line of envContent.split('\n')) {
    const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (match) {
      process.env[match[1]] = match[2].trim().replace(/^["']|["']$/g, '');
    }
  }
}

const GMAIL_USER = process.env.GMAIL_USER || 'jellycutstudios@gmail.com';
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
const REPLY_TO = process.env.REPLY_TO_EMAIL || 'team@jellycutstudio.com';
const SENDER_NAME = process.env.OUTREACH_SENDER_NAME || 'Salman | Jellycut Studios';
const LOG_FILE = join(rootDir, 'outreach-log.json');

function getTransporter() {
  if (!GMAIL_APP_PASSWORD) {
    throw new Error('GMAIL_APP_PASSWORD is not set in .env.local. Please generate an App Password in your Google Account.');
  }
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_APP_PASSWORD,
    },
  });
}

/**
 * Format plain text into clean, modern, high-deliverability HTML
 */
export function formatOutreachHTML(bodyText, recipientName = '') {
  // Split into paragraphs
  const paragraphs = bodyText
    .split(/\n\s*\n/)
    .map(p => p.trim())
    .filter(Boolean)
    .map(p => {
      // Convert single line breaks to <br>
      const withBr = p.replace(/\n/g, '<br/>');
      return `<p style="margin: 0 0 16px 0; font-size: 15px; line-height: 1.65; color: #1f2937;">${withBr}</p>`;
    })
    .join('');

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #fafafa;">
  <div style="max-width: 580px; margin: 0 auto; background-color: #ffffff; padding: 32px 28px; border-radius: 12px; border: 1px solid #e5e7eb;">
    ${paragraphs}
    
    <!-- Signature -->
    <div style="margin-top: 28px; padding-top: 20px; border-top: 1px solid #f3f4f6; font-size: 14px; color: #4b5563;">
      <p style="margin: 0 0 4px 0; font-weight: 600; color: #111827;">${SENDER_NAME}</p>
      <p style="margin: 0 0 6px 0; font-size: 13px; color: #6b7280;">AI Video Ads & Creative Direction · Jellycut Studios</p>
      <p style="margin: 0; font-size: 13px;">
        <a href="https://jellycutstudio.com" style="color: #2563eb; text-decoration: none; font-weight: 500;">jellycutstudio.com</a>
        <span style="color: #9ca3af; margin: 0 6px;">·</span>
        <a href="mailto:${REPLY_TO}" style="color: #4b5563; text-decoration: none;">${REPLY_TO}</a>
      </p>
    </div>
  </div>
</body>
</html>`;
}

function appendToLog(entry) {
  let logs = [];
  try {
    if (existsSync(LOG_FILE)) {
      logs = JSON.parse(readFileSync(LOG_FILE, 'utf-8'));
    }
  } catch (e) {
    logs = [];
  }
  logs.push({
    ...entry,
    sentAt: new Date().toISOString(),
  });
  writeFileSync(LOG_FILE, JSON.stringify(logs, null, 2), 'utf-8');
}

/**
 * Main send function
 */
export async function sendOutreachEmail({ to, name = '', subject, body, isHtml = false }) {
  if (!to) throw new Error('Recipient email (to) is required.');
  if (!subject) throw new Error('Email subject is required.');
  if (!body) throw new Error('Email body is required.');

  const transporter = getTransporter();

  const htmlContent = isHtml ? body : formatOutreachHTML(body, name);
  const textContent = body;

  const mailOptions = {
    from: `"${SENDER_NAME}" <${GMAIL_USER}>`,
    to: to,
    replyTo: REPLY_TO,
    subject: subject,
    text: textContent,
    html: htmlContent,
  };

  const info = await transporter.sendMail(mailOptions);

  appendToLog({
    to,
    name,
    subject,
    messageId: info.messageId,
  });

  return { success: true, messageId: info.messageId };
}

// CLI handler
async function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--test')) {
    console.log(`\n🧪 Testing connection with: ${GMAIL_USER}`);
    console.log(`   Reply-To set to: ${REPLY_TO}`);
    try {
      const transporter = getTransporter();
      await transporter.verify();
      console.log('✅ SMTP connection successfully authenticated!\n');
    } catch (err) {
      console.error('❌ Connection verification failed:', err.message);
      process.exit(1);
    }
    return;
  }

  // Parse args
  let to = '';
  let name = '';
  let subject = '';
  let body = '';
  let jsonPath = '';

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--to') to = args[++i];
    else if (args[i] === '--name') name = args[++i];
    else if (args[i] === '--subject') subject = args[++i];
    else if (args[i] === '--body') body = args[++i];
    else if (args[i] === '--json') jsonPath = args[++i];
  }

  if (jsonPath) {
    const data = JSON.parse(readFileSync(jsonPath, 'utf-8'));
    to = data.to;
    name = data.name || '';
    subject = data.subject;
    body = data.body;
  }

  if (!to || !subject || !body) {
    console.log(`
Usage:
  node scripts/send-outreach.mjs --to "client@example.com" --name "Alex" --subject "Pitch" --body "Message text"
  node scripts/send-outreach.mjs --json "payload.json"
  node scripts/send-outreach.mjs --test
`);
    process.exit(1);
  }

  console.log(`\n📤 Sending outreach email...`);
  console.log(`   To:       ${to}`);
  console.log(`   From:     "${SENDER_NAME}" <${GMAIL_USER}>`);
  console.log(`   Reply-To: ${REPLY_TO}`);
  console.log(`   Subject:  ${subject}\n`);

  try {
    const result = await sendOutreachEmail({ to, name, subject, body });
    console.log(`✅ Email sent successfully! MessageId: ${result.messageId}`);
    console.log(`📋 Logged to outreach-log.json`);
  } catch (err) {
    console.error(`❌ Failed to send email: ${err.message}`);
    process.exit(1);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}

