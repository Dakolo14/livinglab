import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiSecret = process.env.API_SECRET_KEY || 'livinglab-secret-2026';
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== `Bearer ${apiSecret}`) {
    return res.status(401).json({ error: 'Unauthorized: Invalid API Key' });
  }

  const { template, users, customSubject, customMessage } = req.body;
  
  if (!template || !users || !Array.isArray(users)) {
    return res.status(400).json({ error: 'Missing template or users array' });
  }

  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  if (!smtpHost || !smtpUser || !smtpPass) {
    return res.status(500).json({ error: 'SMTP configuration missing' });
  }

  try {
    if (users.length === 0) {
      return res.status(404).json({ error: 'No users provided' });
    }

    let rawHtmlTemplate = '';
    let isReminder = true;
    try {
      if (template === 'thank-you') {
        try {
          rawHtmlTemplate = fs.readFileSync(path.join(process.cwd(), 'src/emails/ThankYou.html'), 'utf-8');
        } catch(e) {
          rawHtmlTemplate = fs.readFileSync(path.join(__dirname, '../src/emails/ThankYou.html'), 'utf-8');
        }
        isReminder = false;
      } else if (template === 'custom') {
        let msg = customMessage || '';
        
        // If the user didn't write any HTML tags at all, we format it nicely for them:
        if (!msg.includes('<') && !msg.includes('>')) {
          // Convert URLs to clickable links
          msg = msg.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" style="color: #00AEEF; text-decoration: underline;">$1</a>');
          // Preserve line breaks
          msg = msg.replace(/\n/g, '<br/>');
          // Wrap in a simple styled container
          msg = `<div style="font-family: Arial, sans-serif; font-size: 15px; color: #333; line-height: 1.6;">${msg}</div>`;
        }
        
        rawHtmlTemplate = msg;
        isReminder = false;
      } else {
        try {
          rawHtmlTemplate = fs.readFileSync(path.join(process.cwd(), 'src/emails/ReminderTemplate.html'), 'utf-8');
        } catch(e) {
          rawHtmlTemplate = fs.readFileSync(path.join(__dirname, '../src/emails/ReminderTemplate.html'), 'utf-8');
        }
      }
    } catch (e) {
      console.error('Error reading template file', e);
      return res.status(500).json({ error: 'Template file missing', details: String(e) });
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
        if (template === 'custom' && customSubject) {
          subject = customSubject;
        }

        let html = rawHtmlTemplate;

        let firstName = 'Guest';
        if (user.name) {
          const nameParts = user.name.trim().split(/\s+/);
          if (nameParts.length > 1 && ['dr.', 'dr', 'mr.', 'mr', 'mrs.', 'mrs', 'ms.', 'ms', 'prof.', 'prof'].includes(nameParts[0].toLowerCase())) {
            firstName = nameParts[1];
          } else {
            firstName = nameParts[0];
          }
        }
        
        const sessionMap: Record<string, string> = {
          "Thursday Morning": "Thursday 5th November, 2026<br/><span style='font-size:1.1rem;font-weight:normal;'>9:00 AM - 11:30 AM</span>",
          "Thursday Afternoon": "Thursday 5th November, 2026<br/><span style='font-size:1.1rem;font-weight:normal;'>12:30 PM - 3:30 PM</span>",
          "Thursday Late": "Thursday 5th November, 2026<br/><span style='font-size:1.1rem;font-weight:normal;'>4:00 PM - 7:00 PM</span>",
          "Friday Morning": "Friday 6th November, 2026<br/><span style='font-size:1.1rem;font-weight:normal;'>9:00 AM - 11:30 AM</span>",
          "Friday Afternoon": "Friday 6th November, 2026<br/><span style='font-size:1.1rem;font-weight:normal;'>12:30 PM - 3:30 PM</span>",
          "Friday Late": "Friday 6th November, 2026<br/><span style='font-size:1.1rem;font-weight:normal;'>4:00 PM - 7:00 PM</span>"
        };
        
        let formattedSession = "TBD";
        if (user.sessions && Array.isArray(user.sessions) && user.sessions.length > 0) {
          const order = ["Thursday Morning", "Thursday Afternoon", "Thursday Late", "Friday Morning", "Friday Afternoon", "Friday Late"];
          const sortedSessions = [...user.sessions].sort((a, b) => order.indexOf(a) - order.indexOf(b));
          formattedSession = sortedSessions.map(s => sessionMap[s] || s).join("<br/><br/>");
        } else if (user.session) {
          formattedSession = sessionMap[user.session] || user.session;
        }

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
          } else if (template === '48-hours') {
            subject = "48 Hours to go! Living Lab Nigeria 2026";
            reminderTitle = "48 HOURS TO GO";
            reminderMessage = "We are just 48 hours away! Please ensure you have your Ticket QR Code ready for check-in on the day of your session.";
          } else if (template === '24-hours') {
            subject = "24 Hours to go! Living Lab Nigeria 2026";
            reminderTitle = "24 HOURS TO GO";
            reminderMessage = "We are just 24 hours away! Please ensure you have your Ticket QR Code ready for check-in on the day of your session.";
          }

          html = html.replace('{{ReminderTitle}}', reminderTitle);
          html = html.replace('{{FirstName}}', firstName);
          html = html.replace('{{ReminderMessage}}', reminderMessage);
          html = html.replace('{{SessionDate}}', formattedSession);
          html = html.replace('{{SessionTime}}', '');
        } else {
          if (template === 'thank-you') {
            subject = "Thank you for attending Living Lab Nigeria 2026";
          }
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
    
  } catch (err: any) {
    console.error("Broadcast error:", err);
    return res.status(500).json({ error: 'Internal server error', details: err.message, stack: err.stack });
  }
}
