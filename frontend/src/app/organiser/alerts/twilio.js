import twilio from "twilio";

export async function sendAlert(organiserPhone, eventName) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioPhone = process.env.TWILIO_PHONE_NUMBER;

  const client = twilio(accountSid, authToken);

  try {
    const message = await client.messages.create({
      body: `🚨 Alert: ${eventName} is ongoing! Stay updated.`,
      from: twilioPhone,
      to: organiserPhone,
    });

    console.log("SMS Sent:", message.sid);
    return { success: true, sid: message.sid };
  } catch (error) {
    console.error("Twilio Error:", error);
    return { success: false, error: error.message };
  }
}
