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

    const resendApiKey = process.env.RESEND_API_KEY;
    let emailSuccess = false;
    let resendResponse = null;

    if (resendApiKey && email) {
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
      
      const emailHtml = `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
          
          <!-- Header -->
          <div style="text-align: center; margin-bottom: 32px;">
            <h1 style="color: #000; font-weight: 800; letter-spacing: 2px; margin: 0;">LIVING LAB</h1>
            <p style="color: #666; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; margin: 4px 0 0 0;">NIGERIA 2026</p>
          </div>

          <!-- Greeting -->
          <p style="font-size: 1.1rem;">Dear Dr. ${name.split(' ')[0]},</p>
          <p style="font-size: 1.1rem;">Your registration is confirmed. We are absolutely thrilled to welcome you to the exclusive Living Lab Nigeria 2026 experience by La Roche-Posay.</p>
          
          <!-- Event Details Box -->
          <div style="background-color: #f8f9fa; border-left: 4px solid #000; padding: 20px; margin: 32px 0;">
            <p style="margin: 0; font-size: 0.85rem; color: #666; text-transform: uppercase; font-weight: bold;">Your Reserved Session</p>
            <p style="margin: 8px 0 0 0; font-size: 1.3rem; font-weight: bold; color: #000;">
              ${formattedSession}
            </p>
          </div>
          
          <!-- Ticket & QR Code -->
          <div style="background-color: #00AEEF; color: white; padding: 32px 20px; border-radius: 12px; text-align: center; margin: 32px 0;">
            <p style="margin: 0; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; opacity: 0.9;">Digital Ticket ID</p>
            <p style="margin: 8px 0 24px 0; font-size: 2rem; font-family: monospace; font-weight: bold; letter-spacing: 2px;">
              ${ticketId}
            </p>
            
            <div style="background: white; padding: 16px; border-radius: 8px; display: inline-block;">
              <img src="${qrCodeUrl}" alt="Your Ticket QR Code" style="width: 200px; height: 200px; display: block;" />
            </div>
            <p style="margin: 16px 0 0 0; font-size: 0.9rem; opacity: 0.9;">Please present this QR code at the entrance for fast-track check-in.</p>
          </div>

          <!-- Perks -->
          <div style="border: 1px solid #E5E7EB; padding: 24px; border-radius: 12px; text-align: center; margin-bottom: 32px;">
            <h3 style="margin: 0 0 12px 0; color: #000;">Exclusive Attendee Perk</h3>
            <p style="margin: 0; color: #555;">Enjoy a <strong>15% discount</strong> on all purchases made at the La Roche-Posay stand during the event.</p>
            <p style="margin: 16px 0 0 0; font-size: 1rem;">Discount Code: <span style="background: #f1f5f9; padding: 6px 12px; border-radius: 6px; font-weight: bold; color: #00AEEF; border: 1px dashed #cbd5e1;">LRP15</span></p>
          </div>
          
          <p style="font-size: 1.1rem;">We look forward to an inspiring session with you!</p>
          <p style="font-size: 1.1rem; margin-top: 32px;">Warm regards,<br/><strong>The Living Lab Team</strong></p>

          <!-- Footer -->
          <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 40px 0 24px 0;" />
          <p style="font-size: 0.75rem; color: #9CA3AF; text-align: center; line-height: 1.5;">
            This email was sent to ${email}. If you need to make changes to your registration or can no longer attend, please contact us.<br/><br/>
            &copy; 2026 La Roche-Posay. All rights reserved.
          </p>
        </div>
      `;

      try {
        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
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
