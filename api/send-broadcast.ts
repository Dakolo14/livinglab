import type { VercelRequest, VercelResponse } from '@vercel/node';
import { db } from '../src/config/firebase'; // Note: Firebase needs to be initialized correctly here if not already
import { collection, query, where, getDocs } from 'firebase/firestore';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { audience, template } = req.body;
  
  if (!audience || !template) {
    return res.status(400).json({ error: 'Missing audience or template' });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    return res.status(500).json({ error: 'Resend API key missing' });
  }

  try {
    // 1. Fetch matching audience from Firestore
    const regsRef = collection(db, 'registrations');
    let q;
    
    if (audience === 'all') {
      q = query(regsRef);
    } else {
      q = query(regsRef, where('session', '==', audience));
    }

    const snapshot = await getDocs(q);
    const users: any[] = [];
    snapshot.forEach(doc => {
      const data = doc.data();
      if (data.email) users.push(data);
    });

    if (users.length === 0) {
      return res.status(404).json({ error: 'No users found for this audience' });
    }

    // 2. Generate email payload for Resend Batch API
    // Resend batch API takes an array of email objects (max 100 per request)
    const emailsToProcess = users.slice(0, 100); // Limit to 100 for safety, could do chunking
    
    const emailBatch = emailsToProcess.map(user => {
      let subject = "Living Lab Nigeria 2026 - Update";
      let html = "";

      // We can customize the HTML based on the template selected
      if (template === '3-weeks') {
        subject = "3 Weeks to go! Living Lab Nigeria 2026";
        html = `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
            <h2>We are just 3 weeks away!</h2>
            <p>Dear ${user.name.split(' ')[0]},</p>
            <p>Living Lab Nigeria 2026 is just around the corner. We are busy preparing an incredible experience for you at the Landmark Centre.</p>
            <p>As a reminder, your session is: <strong>${user.session}</strong></p>
            <p>Your Ticket ID is: <strong>${user.ticketId}</strong></p>
            <p>Get ready to discover the future of dermatological science with La Roche-Posay!</p>
            <p>Best regards,<br/>The Living Lab Team</p>
          </div>
        `;
      } else if (template === '24-hours') {
        subject = "Tomorrow! Living Lab Nigeria 2026";
        html = `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
            <h2>It happens tomorrow!</h2>
            <p>Dear ${user.name.split(' ')[0]},</p>
            <p>We can't wait to see you tomorrow for Living Lab Nigeria 2026.</p>
            <p>Please have your QR Code ready at the entrance for fast-track check-in. Your session is: <strong>${user.session}</strong>.</p>
            <p>Safe travels!</p>
            <p>Best regards,<br/>The Living Lab Team</p>
          </div>
        `;
      } else {
        subject = "Living Lab Nigeria 2026";
        html = `<p>Hello ${user.name}, this is a reminder for your upcoming session: ${user.session}.</p>`;
      }

      return {
        from: "Living Lab Nigeria <tickets@livinglabnigeria.com>",
        to: user.email,
        subject,
        html,
      };
    });

    // 3. Send using Resend Batch API
    const response = await fetch('https://api.resend.com/emails/batch', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(emailBatch)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Resend API error:", errorText);
      return res.status(500).json({ error: 'Failed to send broadcast with Resend' });
    }

    const data = await response.json();
    return res.status(200).json({ success: true, sentCount: emailsToProcess.length, data });
    
  } catch (err) {
    console.error("Broadcast error:", err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
