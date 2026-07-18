import nodemailer from 'nodemailer';

export const config = {
  runtime: 'nodejs',
};

export default async function handler(req, res) {
  // If we want to support standard Express/Node-like req/res (since it's a Nodeless function on Vercel)
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, contactInfo, summary } = req.body;

    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.log('Mock email sent (Missing GMAIL_USER or GMAIL_APP_PASSWORD):', { name, contactInfo, summary });
      return res.status(200).json({ success: true, mock: true });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD, // Must be an App Password, not the regular account password
      },
    });

    const mailOptions = {
      from: `"Jellycut Chat" <${process.env.GMAIL_USER}>`,
      to: 'jellycutstudios@gmail.com', // Sending to themselves
      replyTo: contactInfo, // So they can hit "Reply" in Gmail and it goes to the user's email
      subject: `New Lead from Live Chat: ${name}`,
      html: `
        <h2>New Lead from Live Chat</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Contact Info:</strong> ${contactInfo}</p>
        <p><strong>Conversation Summary:</strong></p>
        <pre style="background: #f4f4f4; padding: 10px; border-radius: 5px;">${summary || 'No summary provided.'}</pre>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true, messageId: info.messageId });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ error: error.message });
  }
}
