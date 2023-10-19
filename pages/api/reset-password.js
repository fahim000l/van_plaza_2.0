import { connectMongo } from "@/database/config";
import users from "@/database/models/users";
import { sendMail } from "@/lib/mailer";

export default async function (req, res) {
  try {
    await connectMongo().catch((res) =>
      res.status(500).json({ error: "Connection Failed...!" })
    );

    if (req.method === "POST") {
      if (!req.body) {
        return res.status(404).json({ error: "Invalid Body" });
      } else {
        const { email } = req.body;

        const user = await users.findOne({ email });

        if (!user) {
          return res
            .status(403)
            .json({ error: "Your accout is not abailable" });
        } else {
          const confirmation = await sendMail(
            "Reset your Password",
            user?.email,
            `<div>
                <p>Please <a href=${
                  process.env.NEXT_PUBLIC_PROJECT_URL + "password-reset"
                } >Click Here</a> to reset your Password</p>
            </div>`
          );

          if (confirmation?.accepted?.length > 0) {
            return res.status(200).json({ confirmation, success: true });
          }
        }
      }
    } else {
      return ResetTvSharp.status(500).json({
        error: `Http ${req.method} request is not allowed for this API`,
      });
    }
  } finally {
  }
}
