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
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Living Lab Registration Successful</title>
<style>
  body {
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
    font-family: 'Locator Regular', Helvetica, Arial, sans-serif;
    color: #111827;
  }
  .email-wrapper {
    width: 100%;
    background-color: #f4f4f4;
    padding: 40px 0;
  }
  .email-container {
    max-width: 600px;
    margin: 0 auto;
    background-color: #ffffff;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  }
  .header-banner {
    background: linear-gradient(180deg, #e0f2fe 0%, #ffffff 100%);
    text-align: center;
    padding: 60px 20px 30px;
  }
  .logo {
    max-width: 140px;
    margin-bottom: 40px;
  }
  .success-title {
    color: #0ea5e9;
    font-size: 36px;
    font-weight: bold;
    text-transform: uppercase;
    margin: 0;
    line-height: 1;
    letter-spacing: -1.5px;
  }
  .content {
    padding: 40px 50px;
  }
  .greeting {
    font-size: 16px;
    margin-bottom: 20px;
  }
  .message {
    font-size: 15px;
    line-height: 1.6;
    color: #4b5563;
    margin-bottom: 30px;
  }
  .session-details {
    margin-bottom: 40px;
  }
  .session-label {
    font-size: 14px;
    color: #4b5563;
    margin-bottom: 5px;
  }
  .session-date {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 5px;
    color: #000000;
  }
  .session-time {
    font-size: 14px;
    color: #4b5563;
  }
  .ticket-section {
    text-align: center;
    padding-top: 40px;
    border-top: 1px solid #e5e7eb;
  }
  .ticket-label {
    font-size: 12px;
    text-transform: uppercase;
    color: #6b7280;
    letter-spacing: 1px;
    margin-bottom: 10px;
  }
  .ticket-id {
    font-size: 18px;
    font-weight: bold;
    color: #000000;
    margin-bottom: 30px;
  }
  .qr-code {
    max-width: 220px;
    margin: 0 auto 20px;
    display: block;
  }
  .footer-instruction {
    font-size: 13px;
    color: #6b7280;
    text-align: center;
    margin-top: 20px;
  }
  .footer {
    background-color: #00aeef;
    color: #ffffff;
    text-align: center;
    padding: 30px 20px;
    font-size: 12px;
  }
  @media only screen and (max-width: 600px) {
    .content {
      padding: 30px 20px;
    }
    .success-title {
      font-size: 28px;
    }
    .email-wrapper {
      padding: 0;
    }
  }
</style>
</head>
<body>
  <div class="email-wrapper">
    <div class="email-container">
      
      <div class="header-banner">
        <img src="https://www.livinglabnigeria.com/livinglablogo.webp" alt="Living Lab" class="logo" />
        <h1 class="success-title">REGISTRATION<br/>SUCCESSFUL</h1>
      </div>

      <div class="content">
        <div class="greeting">Dear Dr. ${name.split(' ')[0]},</div>
        
        <div class="message">
          Your registration is confirmed. We are absolutely thrilled to welcome you to the exclusive Living Lab Nigeria 2026 experience by La Roche-Posay.
        </div>

        <div class="session-details">
          <div class="session-label">Your Reserved Session:</div>
          <div class="session-date">${formattedSession}</div>
        </div>

        <div class="ticket-section">
          <div class="ticket-label">DIGITAL TICKET ID</div>
          <div class="ticket-id">${ticketId}</div>
          
          <img src="${qrCodeUrl}" alt="Your QR Code" class="qr-code" />
          
          <div class="footer-instruction">
            Please present this QR code at the entrance for fast-track check-in.
          </div>
        </div>

        <div style="text-align: center; margin-top: 50px; padding-top: 40px; border-top: 1px solid #e5e7eb;">
          <h3 style="margin-top: 0; color: #00aeef; font-size: 13px; text-transform: uppercase; letter-spacing: 2px;">Exclusive Attendee Perk</h3>
          <p style="font-size: 15px; color: #4b5563; line-height: 1.6; max-width: 400px; margin: 15px auto 20px;">
            Enjoy a 15% discount on all purchases made at the La Roche-Posay stand during the event.
          </p>
          <p style="margin: 0; font-weight: bold; font-size: 18px; color: #111827;">
            Discount Code: <span style="color: #00aeef;">LRP15</span>
          </p>
        </div>

        <div class="message" style="margin-top: 40px; margin-bottom: 0;">
          We look forward to an inspiring session with you!<br><br>
          Warm regards,<br>
          <strong>The Living Lab Team</strong>
        </div>
      </div>

      <div class="footer">
        © 2026 La Roche-Posay. All rights reserved.<br/>
        Living Lab Nigeria
      </div>

    </div>
  </div>
</body>
</html>
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
