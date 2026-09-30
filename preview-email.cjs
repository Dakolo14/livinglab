const fs = require('fs');
const path = require('path');

const sessionMap = {
  "Thursday Morning": "<div style='font-weight: bold; color: #111827; font-size: 15px; margin-bottom: 4px;'>Thursday 5th Nov &bull; Morning Session</div><div style='color: #64748B; font-size: 14px;'>9:00 AM - 11:30 AM</div>",
  "Friday Afternoon": "<div style='font-weight: bold; color: #111827; font-size: 15px; margin-bottom: 4px;'>Friday 6th Nov &bull; Afternoon Session</div><div style='color: #64748B; font-size: 14px;'>12:30 PM - 3:30 PM</div>",
  "Thursday Late": "<div style='font-weight: bold; color: #111827; font-size: 15px; margin-bottom: 4px;'>Thursday 5th Nov &bull; Late Session</div><div style='color: #64748B; font-size: 14px;'>4:00 PM - 7:00 PM</div>"
};

const sessions = ["Friday Afternoon", "Thursday Late", "Thursday Morning"];
const order = ["Thursday Morning", "Thursday Afternoon", "Thursday Late", "Friday Morning", "Friday Afternoon", "Friday Late"];
const sortedSessions = [...sessions].sort((a, b) => order.indexOf(a) - order.indexOf(b));

const formattedSession = sortedSessions.map(s => sessionMap[s] ? `<div style="margin-bottom: 12px; padding: 14px; background-color: #f8fafc; border-radius: 8px;">${sessionMap[s]}</div>` : "").join("");

let emailHtml = fs.readFileSync(path.join(process.cwd(), 'src/emails/RegistrationSuccess.html'), 'utf-8');

emailHtml = emailHtml.replace('{{UserEmail}}', 'test@livinglab.com');
emailHtml = emailHtml.replace('{{FirstName}}', 'Sarah');
emailHtml = emailHtml.replace('{{SessionDate}}', formattedSession);
emailHtml = emailHtml.replace(/\{\{TicketID\}\}/g, 'TKT-9999');
emailHtml = emailHtml.replace('{{QRCodeUrl}}', 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=test@livinglab.com');

fs.writeFileSync(path.join(process.cwd(), 'email-preview.html'), emailHtml);
console.log('Preview generated!');
