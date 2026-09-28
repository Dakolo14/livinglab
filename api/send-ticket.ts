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
    const { phone, ticketId, name, email, session } = req.body;

    if (!phone || !ticketId || !name) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Format phone number to international format (234...) if it starts with 0
    let formattedPhone = phone.replace(/[^0-9]/g, '');
    if (formattedPhone.startsWith('0')) {
      formattedPhone = '234' + formattedPhone.slice(1);
    } else if (!formattedPhone.startsWith('234')) {
      if (formattedPhone.length === 10) {
        formattedPhone = '234' + formattedPhone;
      }
    }

    const termiiApiKey = process.env.TERMII_API_KEY;
    
    let smsSuccess = false;
    let termiiResponse = null;

    if (termiiApiKey) {
      const payload = {
        to: formattedPhone,
        from: 'N-Alert', // Default sender ID
        sms: `Hi ${name.split(' ')[0]}, your registration for Living Lab Nigeria 2026 is confirmed! Your Ticket ID is ${ticketId}. 15% discount code: LRP15. See you there!`,
        type: 'plain',
        channel: 'generic',
        api_key: termiiApiKey,
      };

      try {
        const response = await fetch('https://v4.api.termii.com/api/sms/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
        
        const data = await response.json();
        termiiResponse = data;
        
        if (response.ok && data.message_id) {
          smsSuccess = true;
        } else {
          console.error('Termii API Error:', data);
        }
      } catch (smsError) {
        console.error('Termii Fetch Error:', smsError);
      }
    } else {
      console.warn('TERMII_API_KEY is not set in environment variables');
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    let emailSuccess = false;
    let resendResponse = null;

    if (smtpHost && smtpUser && smtpPass && email) {
      // Map the simple session string to a beautiful date/time format
      const sessionMap: Record<string, string> = {
        "Thursday Morning": "Thursday 5th November, 2026<br/><span style='font-size:1.1rem;font-weight:normal;'>9:00 AM - 11:30 AM</span>",
        "Thursday Afternoon": "Thursday 5th November, 2026<br/><span style='font-size:1.1rem;font-weight:normal;'>12:30 PM - 3:30 PM</span>",
        "Thursday Late": "Thursday 5th November, 2026<br/><span style='font-size:1.1rem;font-weight:normal;'>4:00 PM - 7:00 PM</span>",
        "Friday Morning": "Friday 6th November, 2026<br/><span style='font-size:1.1rem;font-weight:normal;'>9:00 AM - 11:30 AM</span>",
        "Friday Afternoon": "Friday 6th November, 2026<br/><span style='font-size:1.1rem;font-weight:normal;'>12:30 PM - 3:30 PM</span>",
        "Friday Late": "Friday 6th November, 2026<br/><span style='font-size:1.1rem;font-weight:normal;'>4:00 PM - 7:00 PM</span>"
      };
      
      const formattedSession = session && sessionMap[session] ? sessionMap[session] : session || "TBD";

      // Create a URL-friendly version of the email for the QR code API
      const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(email)}`;
      
      let emailHtml = '';
      try {
        emailHtml = fs.readFileSync(path.join(process.cwd(), 'src/emails/RegistrationSuccess.html'), 'utf-8');
      } catch (e) {
        try {
          emailHtml = fs.readFileSync(path.join(__dirname, '../src/emails/RegistrationSuccess.html'), 'utf-8');
        } catch (err2) {
          console.error('Error reading RegistrationSuccess template file', err2);
          return res.status(500).json({ error: 'Template file missing', details: String(e) });
        }
      }

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
      console.warn('SMTP credentials are not set or email is missing');
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
