const fs = require('fs');
const path = require('path');

const sessionMap = {
  "Thursday Morning": "<div style='font-weight: bold; color: #111827; font-size: 15px; margin-bottom: 4px;'>📍 Thursday 5th Nov &bull; Morning Session</div><div style='color: #64748B; font-size: 14px;'>9:00 AM - 11:30 AM</div>",
  "Friday Afternoon": "<div style='font-weight: bold; color: #111827; font-size: 15px; margin-bottom: 4px;'>📍 Friday 6th Nov &bull; Afternoon Session</div><div style='color: #64748B; font-size: 14px;'>12:30 PM - 3:30 PM</div>"
};

const sessions = ["Thursday Morning", "Friday Afternoon"];
const formattedSession = sessions.map(s => sessionMap[s] ? `<div style="margin-bottom: 12px; padding: 14px; background-color: #ffffff; border: 1px solid #E2E8F0; border-radius: 8px; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">${sessionMap[s]}</div>` : "").join("");

let emailHtml = fs.readFileSync(path.join(process.cwd(), 'src/emails/RegistrationSuccess.html'), 'utf-8');

emailHtml = emailHtml.replace('{{UserEmail}}', 'test@livinglab.com');
emailHtml = emailHtml.replace('{{FirstName}}', 'Dr. Sarah');
emailHtml = emailHtml.replace('{{SessionDate}}', formattedSession);
emailHtml = emailHtml.replace(/\{\{TicketID\}\}/g, 'TKT-9999');
emailHtml = emailHtml.replace('{{QRCodeUrl}}', 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=test@livinglab.com');

fs.writeFileSync(path.join(process.cwd(), 'email-preview.html'), emailHtml);
console.log('Preview generated!');
