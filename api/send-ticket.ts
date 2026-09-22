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

    const resendApiKey = process.env.RESEND_API_KEY;
    let emailSuccess = false;
    let resendResponse = null;

    if (resendApiKey && email) {
      // Create a URL-friendly version of the email for the QR code API
      const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(email)}`;
      
      const emailHtml = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h2 style="color: #00AEEF;">LIVING LAB NIGERIA 2026</h2>
          <p>Hi ${name.split(' ')[0]},</p>
          <p>Your registration is confirmed! We are thrilled to host you.</p>
          
          <div style="background-color: #F3F4F6; padding: 20px; border-radius: 8px; text-align: center; margin: 24px 0;">
            <p style="margin: 0; font-size: 0.9rem; color: #6B7280; text-transform: uppercase;">Your Ticket ID</p>
            <p style="margin: 8px 0 0 0; font-size: 1.5rem; font-family: monospace; font-weight: bold; color: #111827;">
              ${ticketId}
            </p>
          </div>

          <div style="background-color: #00AEEF; color: white; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 24px;">
            <h3 style="margin: 0 0 8px 0;">🎉 15% Exclusive Discount!</h3>
            <p style="margin: 0;">Get 15% off on all purchases at the stand in the event!</p>
            <p style="margin: 12px 0 0 0; font-size: 0.9rem;">Use Code: <span style="background: rgba(255,255,255,0.2); padding: 4px 8px; border-radius: 4px; font-weight: bold;">LRP15</span></p>
          </div>
          
          <div style="text-align: center; margin: 32px 0;">
            <p style="margin-bottom: 16px; font-weight: bold;">Scan this QR code at the entrance:</p>
            <img src="${qrCodeUrl}" alt="Your Ticket QR Code" style="width: 200px; height: 200px; border: 1px solid #E5E7EB; border-radius: 8px; padding: 12px;" />
          </div>

          <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 32px 0;" />
          <p style="font-size: 0.8rem; color: #9CA3AF; text-align: center;">
            This email was sent automatically. Please do not reply.
          </p>
        </div>
      `;

      try {
        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': \`Bearer \${resendApiKey}\`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: "La Roche-Posay <lrp@livinglabnigeria.com>",
            to: [email],
            subject: "Your Ticket for Living Lab Nigeria 2026",
            html: emailHtml,
          }),
        });
        
        const data = await response.json();
        resendResponse = data;
        
        if (response.ok) {
          emailSuccess = true;
        } else {
          console.error('Resend API Error:', data);
        }
      } catch (emailError) {
        console.error('Resend Fetch Error:', emailError);
      }
    } else {
      console.warn('RESEND_API_KEY is not set or email is missing');
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
