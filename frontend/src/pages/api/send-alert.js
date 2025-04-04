import { sendAlert } from "../../app/organiser/alerts/twilio";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { organiserPhone, eventName } = req.body; // ✅ FIXED: No JSON.parse needed
    const result = await sendAlert(organiserPhone, eventName);

    if (result.success) {
      res.status(200).json({ success: true });
    } else {
      res.status(500).json({ error: result.error });
    }
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
