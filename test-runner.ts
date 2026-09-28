import sendTicket from './api/send-ticket.ts';
import sendCheckin from './api/send-checkin.ts';
import sendBroadcast from './api/send-broadcast.ts';
import cronEmails from './api/cron-emails.ts';

// Mock Vercel req/res
const createMockRes = (name) => {
  return {
    setHeader: () => {},
    status: (code) => {
      return {
        json: (data) => console.log(`[${name}] Status ${code}:`, data),
        end: () => console.log(`[${name}] Ended with status ${code}`)
      };
    },
    json: (data) => console.log(`[${name}] JSON:`, data),
  };
};

async function run() {
  const email = "ajosedare4u@gmail.com";
  
  console.log("Sending ticket email...");
  await sendTicket(
    { 
      method: 'POST', 
      body: { 
        email, 
        name: 'Ajose',
        ticketId: 'LL-TEST-123',
        session: 'Thursday Morning',
        phone: '08123456789',
        userType: 'professional'
      } 
    } as any, 
    createMockRes('Ticket') as any
  );

  /*
  console.log("Sending checkin email...");
  await sendCheckin(
    { 
      method: 'POST', 
      body: { 
        email, 
        name: 'Ajose',
        session: 'Thursday Morning'
      } 
    } as any, 
    createMockRes('Checkin') as any
  );

  console.log("Sending generic broadcast...");
  await sendBroadcast(
    { 
      method: 'POST', 
      body: { 
        users: [{ email, name: 'Ajose', session: 'Thursday Morning', status: 'approved' }],
        subject: 'Test Broadcast',
        htmlContent: '<h1>Hello!</h1><p>This is a test broadcast.</p>',
        template: 'generic'
      } 
    } as any, 
    createMockRes('Broadcast') as any
  );

  const templates = ['3-weeks', '2-weeks', '1-week', '3-days', '24-hours', 'post-event'];
  for (const tpl of templates) {
    console.log(`Sending broadcast template: ${tpl}...`);
    await sendBroadcast(
      { 
        method: 'POST', 
        body: { 
          users: [{ email, name: 'Ajose', session: 'Thursday Morning', status: 'approved' }],
          template: tpl,
          isReminder: tpl !== 'post-event'
        } 
      } as any, 
      createMockRes(`Broadcast-${tpl}`) as any
    );
  }
  */
  
  console.log("Done.");
}

run().catch(console.error);
