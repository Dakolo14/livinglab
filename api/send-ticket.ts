import type { VercelRequest, VercelResponse } from '@vercel/node';

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
    const { phone, ticketId, name, email } = req.body;

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

    // TODO: Add Resend Email logic here once the key is provided
    
    return res.status(200).json({ 
      success: true, 
      smsSent: smsSuccess,
      termiiResponse,
      emailSent: false // Pending Resend integration
    });
  } catch (error) {
    console.error('API Route Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
