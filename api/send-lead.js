import nodemailer from 'nodemailer';

export const config = {
  runtime: 'nodejs',
};

// ─── Email Templates ──────────────────────────────────────────────────────────

function adminEmailHTML({ name, email, phone, summary, timestamp }) {
  const rows = (summary || '')
    .split('\n')
    .filter(l => l.trim())
    .map(line => {
      const isUser = line.startsWith('[user]');
      const isAI   = line.startsWith('[assistant]');
      const text   = line.replace(/^\[(user|assistant)\]\s*/i, '');
      if (!text.trim()) return '';
      return `
        <tr>
          <td style="padding:10px 14px;vertical-align:top;width:72px;">
            <span style="
              display:inline-block;padding:3px 8px;border-radius:20px;font-size:11px;font-weight:600;letter-spacing:.5px;
              background:${isUser ? '#0f1a0d' : '#f0fbe8'};
              color:${isUser ? '#6fd62a' : '#3d8c00'};
              border:1px solid ${isUser ? '#3d8c00' : '#c8f0a0'};
            ">${isUser ? 'VISITOR' : 'AI'}</span>
          </td>
          <td style="padding:10px 14px;font-size:14px;color:#1a1a1a;line-height:1.6;border-bottom:1px solid #f0f0f0;">
            ${text}
          </td>
        </tr>`;
    }).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f6f0;font-family:'Inter',system-ui,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f0;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr><td style="background:#0f1a0d;border-radius:16px 16px 0 0;padding:32px 36px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td>
                <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:2px;color:#6fd62a;text-transform:uppercase;">Jellycut Studios</p>
                <h1 style="margin:8px 0 0;font-size:22px;font-weight:700;color:#ffffff;line-height:1.3;">🔔 New Chat Lead</h1>
                <p style="margin:6px 0 0;font-size:13px;color:rgba(255,255,255,0.5);">${timestamp}</p>
              </td>
              <td align="right" style="vertical-align:top;">
                <div style="width:48px;height:48px;background:rgba(111,214,42,0.15);border:1px solid rgba(111,214,42,0.3);border-radius:50%;display:flex;align-items:center;justify-content:center;">
                  <span style="font-size:22px;">💌</span>
                </div>
              </td>
            </tr>
          </table>
        </td></tr>

        <!-- Lead Info Cards -->
        <tr><td style="background:#ffffff;padding:28px 36px 0;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td width="31%" style="background:#f8fcf5;border:1px solid #d8edd0;border-radius:12px;padding:14px 16px;vertical-align:top;">
                <p style="margin:0 0 4px;font-size:10px;font-weight:700;letter-spacing:1.5px;color:#5a7255;text-transform:uppercase;">Name</p>
                <p style="margin:0;font-size:14px;font-weight:600;color:#0f1a0d;">${name || 'Website Visitor'}</p>
              </td>
              <td width="3%"></td>
              <td width="31%" style="background:#f0fbe8;border:1px solid #c8f0a0;border-radius:12px;padding:14px 16px;vertical-align:top;">
                <p style="margin:0 0 4px;font-size:10px;font-weight:700;letter-spacing:1.5px;color:#3d8c00;text-transform:uppercase;">Email</p>
                <p style="margin:0;font-size:14px;font-weight:600;color:#0f1a0d;word-break:break-all;">${email || 'Not provided'}</p>
              </td>
              <td width="3%"></td>
              <td width="32%" style="background:#f0fbe8;border:1px solid #c8f0a0;border-radius:12px;padding:14px 16px;vertical-align:top;">
                <p style="margin:0 0 4px;font-size:10px;font-weight:700;letter-spacing:1.5px;color:#3d8c00;text-transform:uppercase;">Mobile</p>
                <p style="margin:0;font-size:14px;font-weight:600;color:#0f1a0d;">${phone || 'Not provided'}</p>
              </td>
            </tr>
          </table>
        </td></tr>

        <!-- Reply CTA -->
        <tr><td style="background:#ffffff;padding:20px 36px;">
          ${email ? `
          <a href="mailto:${email}?subject=Re: Your project with Jellycut Studios&body=Hi there,%0A%0AThanks for reaching out! We'd love to learn more about your project.%0A%0ABest,%0AJellycut Studios"
             style="display:inline-block;background:#0f1a0d;color:#6fd62a;text-decoration:none;font-size:13px;font-weight:700;padding:12px 24px;border-radius:30px;letter-spacing:.5px;margin-right:8px;margin-bottom:8px;">
            ↩ Email ${email}
          </a>` : ''}
          ${phone ? `
          <a href="https://wa.me/${phone.replace(/\D/g,'')}"
             style="display:inline-block;background:#0f1a0d;color:#6fd62a;text-decoration:none;font-size:13px;font-weight:700;padding:12px 24px;border-radius:30px;letter-spacing:.5px;margin-bottom:8px;">
            💬 WhatsApp ${phone}
          </a>` : ''}
        </td></tr>

        <!-- Conversation Transcript -->
        <tr><td style="background:#ffffff;padding:0 36px 28px;">
          <p style="margin:0 0 12px;font-size:11px;font-weight:700;letter-spacing:1.5px;color:#5a7255;text-transform:uppercase;">Full Conversation</p>
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#fafafa;border:1px solid #ebebeb;border-radius:12px;overflow:hidden;">
            ${rows || '<tr><td style="padding:16px;color:#888;font-size:13px;">No conversation recorded.</td></tr>'}
          </table>
        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#0f1a0d;border-radius:0 0 16px 16px;padding:20px 36px;">
          <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.4);text-align:center;">
            Jellycut Studios · Kerala, India · <a href="https://jellycutstudio.com" style="color:#6fd62a;text-decoration:none;">jellycutstudio.com</a>
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function customerEmailHTML({ name, contactInfo }) {
  const firstName = (name || 'there').split(' ')[0];
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f6f0;font-family:'Inter',system-ui,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f0;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Hero -->
        <tr><td style="background:#0f1a0d;border-radius:16px 16px 0 0;padding:48px 36px 36px;text-align:center;">
          <!-- Logo mark -->
          <div style="width:56px;height:56px;background:rgba(111,214,42,0.12);border:1px solid rgba(111,214,42,0.25);border-radius:50%;margin:0 auto 20px;display:inline-block;line-height:56px;text-align:center;">
            <span style="font-size:26px;">✦</span>
          </div>
          <p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:2.5px;color:#6fd62a;text-transform:uppercase;">Jellycut Studios</p>
          <h1 style="margin:0 0 12px;font-size:28px;font-weight:700;color:#ffffff;line-height:1.25;">
            We got your message,<br>${firstName}! 🎉
          </h1>
          <p style="margin:0;font-size:15px;color:rgba(255,255,255,0.6);line-height:1.6;max-width:420px;margin:0 auto;">
            Our team will review your brief and get back to you within <strong style="color:#ffffff;">24 hours</strong> — no calls required.
          </p>
        </td></tr>

        <!-- What happens next -->
        <tr><td style="background:#ffffff;padding:36px 36px 28px;">
          <p style="margin:0 0 20px;font-size:11px;font-weight:700;letter-spacing:1.5px;color:#5a7255;text-transform:uppercase;">What happens next</p>

          <!-- Step 1 -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
            <tr>
              <td width="44" style="vertical-align:top;padding-top:2px;">
                <div style="width:32px;height:32px;background:#f0fbe8;border:1px solid #c8f0a0;border-radius:50%;text-align:center;line-height:32px;font-size:14px;font-weight:700;color:#3d8c00;">1</div>
              </td>
              <td style="vertical-align:top;padding-left:8px;">
                <p style="margin:0 0 2px;font-size:14px;font-weight:600;color:#0f1a0d;">We review your brief</p>
                <p style="margin:0;font-size:13px;color:#5a7255;line-height:1.5;">Our creative team looks at your project details and builds a custom approach.</p>
              </td>
            </tr>
          </table>

          <!-- Step 2 -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
            <tr>
              <td width="44" style="vertical-align:top;padding-top:2px;">
                <div style="width:32px;height:32px;background:#f0fbe8;border:1px solid #c8f0a0;border-radius:50%;text-align:center;line-height:32px;font-size:14px;font-weight:700;color:#3d8c00;">2</div>
              </td>
              <td style="vertical-align:top;padding-left:8px;">
                <p style="margin:0 0 2px;font-size:14px;font-weight:600;color:#0f1a0d;">We reach out within 24 hours</p>
                <p style="margin:0;font-size:13px;color:#5a7255;line-height:1.5;">Expect a personalised reply to ${contactInfo} with a proposal or next steps — no spam, ever.</p>
              </td>
            </tr>
          </table>

          <!-- Step 3 -->
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td width="44" style="vertical-align:top;padding-top:2px;">
                <div style="width:32px;height:32px;background:#f0fbe8;border:1px solid #c8f0a0;border-radius:50%;text-align:center;line-height:32px;font-size:14px;font-weight:700;color:#3d8c00;">3</div>
              </td>
              <td style="vertical-align:top;padding-left:8px;">
                <p style="margin:0 0 2px;font-size:14px;font-weight:600;color:#0f1a0d;">We build, you approve</p>
                <p style="margin:0;font-size:13px;color:#5a7255;line-height:1.5;">First draft delivered in 48–72 hours. You review async — no scheduling needed.</p>
              </td>
            </tr>
          </table>
        </td></tr>

        <!-- Portfolio CTA -->
        <tr><td style="background:#ffffff;padding:0 36px 36px;">
          <div style="background:#f8fcf5;border:1px solid #d8edd0;border-radius:14px;padding:24px;text-align:center;">
            <p style="margin:0 0 6px;font-size:15px;font-weight:600;color:#0f1a0d;">While you wait, explore our work →</p>
            <p style="margin:0 0 16px;font-size:13px;color:#5a7255;">See real results from brands we've worked with.</p>
            <a href="https://jellycutstudio.com/works"
               style="display:inline-block;background:#0f1a0d;color:#6fd62a;text-decoration:none;font-size:13px;font-weight:700;padding:12px 28px;border-radius:30px;letter-spacing:.5px;">
              View Portfolio ✦
            </a>
          </div>
        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#0f1a0d;border-radius:0 0 16px 16px;padding:24px 36px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td>
                <p style="margin:0;font-size:13px;font-weight:600;color:#ffffff;">Jellycut Studios</p>
                <p style="margin:4px 0 0;font-size:12px;color:rgba(255,255,255,0.4);">Kerala, India · AI-first creative studio</p>
              </td>
              <td align="right">
                <a href="https://jellycutstudio.com" style="display:inline-block;background:rgba(111,214,42,0.12);border:1px solid rgba(111,214,42,0.25);color:#6fd62a;text-decoration:none;font-size:12px;font-weight:700;padding:8px 16px;border-radius:20px;letter-spacing:.5px;">
                  Visit Site →
                </a>
              </td>
            </tr>
          </table>
          <p style="margin:16px 0 0;font-size:11px;color:rgba(255,255,255,0.25);text-align:center;">
            You received this because you chatted with our AI assistant. We respect your privacy — no spam, ever.
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ─── Handler ──────────────────────────────────────────────────────────────────

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, contactInfo, summary } = req.body;
    
    // Resolve email and phone, fallback to contactInfo
    const resolvedEmail = (email || (contactInfo && contactInfo.includes('@') ? (contactInfo.includes('/') ? contactInfo.split('/').find(p => p.includes('@')) : contactInfo).trim() : null) || '').trim() || null;
    const resolvedPhone = (phone || (contactInfo ? (contactInfo.includes('/') ? contactInfo.split('/').find(p => !p.includes('@')) : contactInfo.includes('@') ? null : contactInfo).trim() : null) || '').trim() || null;
    
    const displayContact = [resolvedEmail, resolvedPhone].filter(Boolean).join(' / ') || contactInfo || 'No contact provided';
    const timestamp = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'short',
    });

    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.log('\n📩 [Lead Captured — email creds not set]');
      console.log('  Name:', name);
      console.log('  Email:', resolvedEmail);
      console.log('  Phone:', resolvedPhone);
      console.log('  Conversation:\n', summary);
      return res.status(200).json({ success: true, mock: true });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const adminEmail = process.env.ADMIN_EMAIL || 'jellycutstudios@gmail.com';

    // ── 1. Admin notification ─────────────────────────────────────────────
    await transporter.sendMail({
      from: `"Jellycut Chat Bot" <${process.env.GMAIL_USER}>`,
      to: adminEmail,
      replyTo: resolvedEmail || undefined,
      subject: `🔔 New Lead: ${name || 'Website Visitor'} — ${displayContact}`,
      html: adminEmailHTML({ name, email: resolvedEmail, phone: resolvedPhone, summary, timestamp }),
    });

    // ── 2. Customer confirmation (only if we have their email) ────────────
    if (resolvedEmail) {
      await transporter.sendMail({
        from: `"Jellycut Studios" <${process.env.GMAIL_USER}>`,
        to: resolvedEmail,
        replyTo: adminEmail,
        subject: `We got your message! ✦ Jellycut Studios`,
        html: customerEmailHTML({ name, contactInfo: resolvedEmail }),
      });
    }

    return res.status(200).json({ success: true, customerEmailSent: !!resolvedEmail });
  } catch (error) {
    console.error('Email error:', error);
    return res.status(500).json({ error: error.message });
  }
}

