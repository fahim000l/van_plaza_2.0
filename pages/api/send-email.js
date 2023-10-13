import { sendMail } from "../../lib/mailer.js";

export default async function (req, res) {
  try {
    console.log(req.body);

    if (req.method === "POST") {
      if (!req.body) {
        return res.status(404).json({ error: "Invalid Body" });
      } else {
        const mailResult = await sendMail(
          req.body.sub,
          req.body.to,
          req.body.text
        );
        return res
          .status(200)
          .json({ mailResult, message: "Mail sent successfully" });
      }
    } else {
      return res.status(500).json({
        error: `Http ${req.method} request is not allowed for this API`,
      });
    }
  } catch (error) {
    return res.json({ error });
  }
}
