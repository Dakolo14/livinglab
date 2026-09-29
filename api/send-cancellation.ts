import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';
import { CancellationSuccessHtml } from './templates/CancellationSuccessTemplate';

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

  const apiSecret = process.env.API_SECRET_KEY || 'livinglab-secret-2026';
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== `Bearer ${apiSecret}`) {
    return res.status(401).json({ error: 'Unauthorized: Invalid API Key' });
  }

  try {
    const { phone, ticketId, name, email } = req.body;

    if (!ticketId || !name || !email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Optional SMS via Termii
    const termiiApiKey = process.env.TERMII_API_KEY;
    let smsSuccess = false;
    let termiiResponse = null;

    if (termiiApiKey && phone) {
      let formattedPhone = phone.replace(/[^0-9]/g, '');
      if (formattedPhone.startsWith('0')) {
        formattedPhone = '234' + formattedPhone.slice(1);
      } else if (!formattedPhone.startsWith('234') && formattedPhone.length === 10) {
        formattedPhone = '234' + formattedPhone;
      }

      const payload = {
        to: formattedPhone,
        from: 'N-Alert',
        sms: `Hi ${name.split(' ')[0]}, your registration for Living Lab Nigeria (Ticket ${ticketId}) has been successfully cancelled.`,
        type: 'plain',
        channel: 'generic',
        api_key: termiiApiKey,
      };

      try {
        const response = await fetch('https://v4.api.termii.com/api/sms/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await response.json();
        termiiResponse = data;
        if (response.ok && data.message_id) smsSuccess = true;
      } catch (smsError) {
        console.error('Termii Fetch Error:', smsError);
      }
    }

    // Email sending
    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    let emailSuccess = false;
    let resendResponse = null;

    if (smtpHost && smtpUser && smtpPass) {
      let emailHtml = CancellationSuccessHtml;
      emailHtml = emailHtml.replace('{{FirstName}}', name.split(' ')[0]);
      emailHtml = emailHtml.replace(/\{\{TicketID\}\}/g, ticketId);

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
          subject: "Registration Cancelled - Living Lab Nigeria 2026",
          html: emailHtml,
        });
        
        resendResponse = info;
        emailSuccess = true;
      } catch (emailError) {
        console.error('Nodemailer Error:', emailError);
      }
    }
    
    return res.status(200).json({ 
      success: true, 
      smsSent: smsSuccess,
      termiiResponse,
      emailSent: emailSuccess,
      resendResponse
    });
  } catch (error) {
    console.error('API Route Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
