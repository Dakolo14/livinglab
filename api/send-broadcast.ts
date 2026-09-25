import type { VercelRequest, VercelResponse } from '@vercel/node';
import { db } from '../src/config/firebase'; 
import { collection, query, where, getDocs } from 'firebase/firestore';
import fs from 'fs';
import path from 'path';

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
    const regsRef = collection(db, 'registrations');
    let q;
    
    if (audience === 'all') {
      q = query(regsRef);
    } else {
      q = query(regsRef, where('dayTime', '==', audience));
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

    let rawHtmlTemplate = '';
    let isReminder = true;
    try {
      if (template === 'thank-you') {
        rawHtmlTemplate = fs.readFileSync(path.join(process.cwd(), 'src/emails/ThankYou.html'), 'utf-8');
        isReminder = false;
      } else {
        rawHtmlTemplate = fs.readFileSync(path.join(process.cwd(), 'src/emails/ReminderTemplate.html'), 'utf-8');
      }
    } catch (e) {
      console.error('Error reading template file', e);
      return res.status(500).json({ error: 'Template file missing' });
    }

    const emailsToProcess = users.slice(0, 100); 
    
    const emailBatch = emailsToProcess.map(user => {
      let subject = "Living Lab Nigeria 2026";
      let html = rawHtmlTemplate;

      const firstName = user.name ? user.name.split(' ')[0] : 'Guest';
      
      const sessionMap: Record<string, string> = {
        "Thursday Morning": "Thursday 5th November, 2026<br/><span style='font-size:1.1rem;font-weight:normal;'>Morning Session</span>",
        "Thursday Afternoon": "Thursday 5th November, 2026<br/><span style='font-size:1.1rem;font-weight:normal;'>Early Afternoon Session</span>",
        "Thursday Late": "Thursday 5th November, 2026<br/><span style='font-size:1.1rem;font-weight:normal;'>Late Afternoon Session</span>",
        "Friday Morning": "Friday 6th November, 2026<br/><span style='font-size:1.1rem;font-weight:normal;'>Morning Session</span>",
        "Friday Afternoon": "Friday 6th November, 2026<br/><span style='font-size:1.1rem;font-weight:normal;'>Early Afternoon Session</span>",
        "Friday Late": "Friday 6th November, 2026<br/><span style='font-size:1.1rem;font-weight:normal;'>Late Afternoon Session</span>"
      };
      
      const formattedSession = user.dayTime && sessionMap[user.dayTime] ? sessionMap[user.dayTime] : user.dayTime || "TBD";

      if (isReminder) {
        let reminderTitle = "UPCOMING EVENT REMINDER";
        let reminderMessage = "";

        if (template === '3-weeks' || template === '2-weeks' || template === '1-week') {
          const weeks = template.split('-')[0];
          subject = `Just ${weeks} ${weeks === '1' ? 'week' : 'weeks'} to go! Living Lab Nigeria 2026`;
          reminderTitle = `${weeks} ${weeks === '1' ? 'WEEK' : 'WEEKS'} TO GO`;
          reminderMessage = `Living Lab Nigeria 2026 is rapidly approaching. We are busy preparing an incredible, immersive dermatological experience for you.`;
        } else if (template === '3-days') {
          subject = "3 Days to go! Living Lab Nigeria 2026";
          reminderTitle = "3 DAYS TO GO";
          reminderMessage = "We are just 3 days away! Please ensure you have your Ticket QR Code ready for check-in on the day of your session.";
        } else if (template === '24-hours') {
          subject = "Tomorrow! Living Lab Nigeria 2026";
          reminderTitle = "IT HAPPENS TOMORROW";
          reminderMessage = "The wait is almost over. We can't wait to welcome you tomorrow for the exclusive Living Lab Nigeria experience.";
        }

        html = html.replace('{{ReminderTitle}}', reminderTitle);
        html = html.replace('{{FirstName}}', firstName);
        html = html.replace('{{ReminderMessage}}', reminderMessage);
        html = html.replace('{{SessionDate}}', formattedSession);
        html = html.replace('{{SessionTime}}', '');
      } else {
        // Thank you template logic
        subject = "Thank you for attending Living Lab Nigeria 2026";
        html = html.replace('{{FirstName}}', firstName);
      }

      return {
        from: "La Roche-Posay <lrp@livinglabnigeria.com>",
        to: user.email,
        subject,
        html,
      };
    });

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
