import { sendMail } from "@/lib/mailer";

export default async function (req, res) {
  try {
    if (req.method === "POST") {
      if (!req.body) {
        return res.status(404).json({ error: "Invalid Body" });
      } else {
        const mailResult = await sendMail(
          "Customer mail",
          process.env.NEXT_PUBLIC_NODE_MAILER_FROM
        );
      }
    } else {
      return res.status(500).json({
        error: `Http ${req.method} request is not allowed for this api`,
      });
    }
  } finally {
  }
}
