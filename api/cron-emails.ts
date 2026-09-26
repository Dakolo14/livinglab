import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import fs from 'fs';
import path from 'path';

const firebaseConfig = {
  apiKey: "AIzaSyCztmPvbg25lLmsQNtH0Ki2larDkfgRNV8",
  authDomain: "livinglabnigeria.firebaseapp.com",
  projectId: "livinglabnigeria",
  storageBucket: "livinglabnigeria.firebasestorage.app",
  messagingSenderId: "559075983447",
  appId: "1:559075983447:web:542945a6930d66124fa312",
  measurementId: "G-QX0EG4MSZ6"
};

let app;
let db;
try {
  app = initializeApp(firebaseConfig, "cron-app");
  db = getFirestore(app);
} catch (e) {
  console.error("Firebase init error", e);
}

// Map dayTime to exact Date objects (we use 00:00:00 for strict day comparisons)
const SESSION_DATES: Record<string, Date> = {
  "Thursday Morning": new Date('2026-11-05T00:00:00Z'),
  "Thursday Afternoon": new Date('2026-11-05T00:00:00Z'),
  "Thursday Late": new Date('2026-11-05T00:00:00Z'),
  "Friday Morning": new Date('2026-11-06T00:00:00Z'),
  "Friday Afternoon": new Date('2026-11-06T00:00:00Z'),
  "Friday Late": new Date('2026-11-06T00:00:00Z')
};

function getDaysDifference(targetDate: Date, currentDate: Date) {
  const diffTime = targetDate.getTime() - currentDate.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Ensure this is only called by Vercel Cron or a secure request
  // You can set a CRON_SECRET in Vercel and verify it here
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && req.headers.authorization !== `Bearer ${cronSecret}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (!smtpHost || !smtpUser || !smtpPass) {
    return res.status(500).json({ error: 'SMTP missing' });
  }

  try {
    const regsRef = collection(db, 'registrations');
    const snapshot = await getDocs(regsRef);
    const users: any[] = [];
    snapshot.forEach(doc => {
      const data = doc.data();
      if (data.email && data.dayTime) users.push(data);
    });

    if (users.length === 0) {
      return res.status(200).json({ status: 'No users found' });
    }

    let reminderHtmlRaw = fs.readFileSync(path.join(process.cwd(), 'src/emails/ReminderTemplate.html'), 'utf-8');
    let thankYouHtmlRaw = fs.readFileSync(path.join(process.cwd(), 'src/emails/ThankYou.html'), 'utf-8');

    const transporter = nodemailer.createTransport({
      pool: true,
      maxConnections: 5,
      maxMessages: 100,
      host: smtpHost,
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: true,
      auth: { user: smtpUser, pass: smtpPass },
    });

    // We normalize "today" to start of day UTC to match our session dates safely
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const emailsToSend = [];

    for (const user of users) {
      const sessionDate = SESSION_DATES[user.dayTime];
      if (!sessionDate) continue;

      const daysUntilEvent = getDaysDifference(sessionDate, today);
      let templateToSend = null;

      if (daysUntilEvent === 21) templateToSend = '3-weeks';
      else if (daysUntilEvent === 14) templateToSend = '2-weeks';
      else if (daysUntilEvent === 7) templateToSend = '1-week';
      else if (daysUntilEvent === 3) templateToSend = '3-days';
      else if (daysUntilEvent === 1) templateToSend = '24-hours';
      else if (daysUntilEvent === -1) templateToSend = 'thank-you'; // 1 day after event

      if (!templateToSend) continue;

      const firstName = user.name ? user.name.split(' ')[0] : 'Guest';
      
      const sessionMap: Record<string, string> = {
        "Thursday Morning": "Thursday 5th November, 2026<br/><span style='font-size:1.1rem;font-weight:normal;'>Morning Session</span>",
        "Thursday Afternoon": "Thursday 5th November, 2026<br/><span style='font-size:1.1rem;font-weight:normal;'>Early Afternoon Session</span>",
        "Thursday Late": "Thursday 5th November, 2026<br/><span style='font-size:1.1rem;font-weight:normal;'>Late Afternoon Session</span>",
        "Friday Morning": "Friday 6th November, 2026<br/><span style='font-size:1.1rem;font-weight:normal;'>Morning Session</span>",
        "Friday Afternoon": "Friday 6th November, 2026<br/><span style='font-size:1.1rem;font-weight:normal;'>Early Afternoon Session</span>",
        "Friday Late": "Friday 6th November, 2026<br/><span style='font-size:1.1rem;font-weight:normal;'>Late Afternoon Session</span>"
      };
      
      const formattedSession = sessionMap[user.dayTime] || user.dayTime;

      let subject = "Living Lab Nigeria 2026";
      let html = reminderHtmlRaw;

      if (templateToSend !== 'thank-you') {
        let reminderTitle = "UPCOMING EVENT REMINDER";
        let reminderMessage = "";

        if (templateToSend.includes('weeks') || templateToSend === '1-week') {
          const weeks = templateToSend.split('-')[0];
          subject = `Just ${weeks} ${weeks === '1' ? 'week' : 'weeks'} to go! Living Lab Nigeria 2026`;
          reminderTitle = `${weeks} ${weeks === '1' ? 'WEEK' : 'WEEKS'} TO GO`;
          reminderMessage = `Living Lab Nigeria 2026 is rapidly approaching. We are busy preparing an incredible, immersive dermatological experience for you.`;
        } else if (templateToSend === '3-days') {
          subject = "3 Days to go! Living Lab Nigeria 2026";
          reminderTitle = "3 DAYS TO GO";
          reminderMessage = "We are just 3 days away! Please ensure you have your Ticket QR Code ready for check-in on the day of your session.";
        } else if (templateToSend === '24-hours') {
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
        html = thankYouHtmlRaw.replace('{{FirstName}}', firstName);
      }

      emailsToSend.push({
        from: `"La Roche-Posay" <${smtpUser}>`,
        to: user.email,
        subject,
        html,
      });
    }

    if (emailsToSend.length > 0) {
      const results = await Promise.allSettled(
        emailsToSend.map(mail => transporter.sendMail(mail))
      );
      const successful = results.filter(r => r.status === 'fulfilled').length;
      return res.status(200).json({ success: true, sentCount: successful, totalCount: emailsToSend.length });
    } else {
      return res.status(200).json({ success: true, message: "No emails qualified to be sent today." });
    }
    
  } catch (err: any) {
    console.error("Cron error:", err);
    return res.status(500).json({ error: 'Internal server error', details: err.message });
  }
}
