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

  const apiSecret = process.env.API_SECRET_KEY || 'livinglab-secret-2026';
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== `Bearer ${apiSecret}`) {
    return res.status(401).json({ error: 'Unauthorized: Invalid API Key' });
  }

  try {
    const { phone, ticketId, name, email, session, sessions } = req.body;

    if (!phone || !ticketId || !name) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    let emailSuccess = false;
    let resendResponse = null;

    if (smtpHost && smtpUser && smtpPass && email) {
      const sessionMap: Record<string, string> = {
        "Thursday Morning": "<div style='font-weight: bold; color: #111827; font-size: 15px; margin-bottom: 4px;'>Thursday 5th Nov &bull; Morning Session</div><div style='color: #64748B; font-size: 14px;'>9:00 AM - 11:30 AM</div>",
        "Thursday Afternoon": "<div style='font-weight: bold; color: #111827; font-size: 15px; margin-bottom: 4px;'>Thursday 5th Nov &bull; Afternoon Session</div><div style='color: #64748B; font-size: 14px;'>12:30 PM - 3:30 PM</div>",
        "Thursday Late": "<div style='font-weight: bold; color: #111827; font-size: 15px; margin-bottom: 4px;'>Thursday 5th Nov &bull; Late Session</div><div style='color: #64748B; font-size: 14px;'>4:00 PM - 7:00 PM</div>",
        "Friday Morning": "<div style='font-weight: bold; color: #111827; font-size: 15px; margin-bottom: 4px;'>Friday 6th Nov &bull; Morning Session</div><div style='color: #64748B; font-size: 14px;'>9:00 AM - 11:30 AM</div>",
        "Friday Afternoon": "<div style='font-weight: bold; color: #111827; font-size: 15px; margin-bottom: 4px;'>Friday 6th Nov &bull; Afternoon Session</div><div style='color: #64748B; font-size: 14px;'>12:30 PM - 3:30 PM</div>",
        "Friday Late": "<div style='font-weight: bold; color: #111827; font-size: 15px; margin-bottom: 4px;'>Friday 6th Nov &bull; Late Session</div><div style='color: #64748B; font-size: 14px;'>4:00 PM - 7:00 PM</div>"
      };
      
      let formattedSession = "";
      if (Array.isArray(sessions) && sessions.length > 0) {
        formattedSession = sessions.map(s => sessionMap[s] ? `<div style="margin-bottom: 12px; padding: 14px; background-color: #f8fafc; border-radius: 8px;">${sessionMap[s]}</div>` : "").join("");
      } else {
        formattedSession = session && sessionMap[session] ? `<div style="margin-bottom: 12px; padding: 14px; background-color: #f8fafc; border-radius: 8px;">${sessionMap[session]}</div>` : "TBD";
      }
      const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(email)}`;
      
      let emailHtml = '';
      try {
        emailHtml = fs.readFileSync(path.join(process.cwd(), 'src/emails/RegistrationSuccess.html'), 'utf-8');
      } catch (e) {
        try {
          emailHtml = fs.readFileSync(path.join(__dirname, '../src/emails/RegistrationSuccess.html'), 'utf-8');
        } catch (err2) {
          console.error('Error reading RegistrationSuccess.html', err2);
          return res.status(500).json({ error: 'Template file missing' });
        }
      }

      emailHtml = emailHtml.replace('{{UserEmail}}', encodeURIComponent(email));
      emailHtml = emailHtml.replace('{{FirstName}}', name.split(' ')[0]);
      emailHtml = emailHtml.replace('{{SessionDate}}', formattedSession);
      emailHtml = emailHtml.replace('{{SessionTime}}', '');
      emailHtml = emailHtml.replace(/\{\{TicketID\}\}/g, ticketId);
      emailHtml = emailHtml.replace('{{QRCodeUrl}}', qrCodeUrl);

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
          subject: "Your Ticket for Living Lab Nigeria 2026",
          html: emailHtml,
        });
        
        resendResponse = info;
        emailSuccess = true;
      } catch (emailError) {
        console.error('Nodemailer Error:', emailError);
      }
    } else {
      console.warn('SMTP credentials missing or email not provided');
    }

    return res.status(200).json({ 
      success: true, 
      emailSent: emailSuccess,
      resendResponse
    });
  } catch (error) {
    console.error('API Route Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
