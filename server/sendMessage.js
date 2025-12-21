import twilio from 'twilio'
import dotenv from 'dotenv' ;
dotenv.config();
 
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);
 
console.log(client)

async function createMessage() {
  const message = await client.messages.create({
    body: "Hello, there!",
    from: "whatsapp:+14155238886",
    to: "whatsapp:+918000655232",
  });
 
  console.log(message.body);
}
 
createMessage();
 