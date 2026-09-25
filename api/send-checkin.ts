import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Missing name or email' });
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    if (!smtpHost || !smtpUser || !smtpPass) {
      console.warn('SMTP config missing');
      return res.status(500).json({ error: 'Email configuration missing' });
    }

    // Read the CheckInSuccess template
    let emailHtml = '';
    try {
      emailHtml = fs.readFileSync(path.join(process.cwd(), 'src/emails/CheckInSuccess.html'), 'utf-8');
    } catch (e) {
      console.error('Error reading CheckInSuccess template file', e);
      return res.status(500).json({ error: 'Template file missing' });
    }

    // Inject dynamic data
    const firstName = name.split(' ')[0];
    emailHtml = emailHtml.replace('{{FirstName}}', firstName);

    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: parseInt(process.env.SMTP_PORT || '465'),
        secure: true,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const info = await transporter.sendMail({
        from: `"La Roche-Posay" <${smtpUser}>`,
        to: email,
        subject: "Welcome to Living Lab Nigeria 2026",
        html: emailHtml,
      });

      return res.status(200).json({ success: true, emailResponse: info });
    } catch (emailError) {
      console.error('Nodemailer API Error:', emailError);
      return res.status(500).json({ error: 'Failed to send email' });
    }
  } catch (error) {
    console.error('API Route Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
