import type { VercelRequest, VercelResponse } from '@vercel/node';
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

    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.warn('RESEND_API_KEY is not set');
      return res.status(500).json({ error: 'API key configuration missing' });
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

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: "La Roche-Posay <lrp@livinglabnigeria.com>",
        to: [email],
        subject: "Welcome to Living Lab Nigeria 2026",
        html: emailHtml,
      }),
    });
    
    const data = await response.json();
    
    if (response.ok) {
      return res.status(200).json({ success: true, resendResponse: data });
    } else {
      console.error('Resend API Error:', data);
      return res.status(500).json({ error: 'Failed to send email' });
    }
  } catch (error) {
    console.error('API Route Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
