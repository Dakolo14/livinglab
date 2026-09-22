const payload = {
  to: "2348000000000", // Will use a dummy or let termii fail on it
  from: "N-Alert",
  sms: "Test SMS",
  type: "plain",
  channel: "generic",
  api_key: "tlv_pCp864RNHXREjJ5ODno0LD4zxdWpeGADQeVgcrVY6E4",
};

fetch('https://v4.api.termii.com/api/sms/send', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload)
})
.then(res => res.json())
.then(data => console.log('Termii Response:', data))
.catch(err => console.error('Termii Error:', err));
