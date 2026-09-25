import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';
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

  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  if (!smtpHost || !smtpUser || !smtpPass) {
    return res.status(500).json({ error: 'SMTP configuration missing' });
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
    
    const transporter = nodemailer.createTransport({
      pool: true,
      maxConnections: 5,
      maxMessages: 100,
      host: smtpHost,
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: true,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // Send emails sequentially or via Promise.all
    // For Vercel max duration (10s), Promise.all is faster but might hit SMTP rate limits
    // Hostinger should handle 100 concurrent connections fine or we can map in chunks
    const results = await Promise.allSettled(
      emailsToProcess.map(user => {
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
          subject = "Thank you for attending Living Lab Nigeria 2026";
          html = html.replace('{{FirstName}}', firstName);
        }

        return transporter.sendMail({
          from: `"La Roche-Posay" <${smtpUser}>`,
          to: user.email,
          subject,
          html,
        });
      })
    );

    const successful = results.filter(r => r.status === 'fulfilled').length;
    return res.status(200).json({ success: true, sentCount: successful, totalCount: emailsToProcess.length });
    
  } catch (err) {
    console.error("Broadcast error:", err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
