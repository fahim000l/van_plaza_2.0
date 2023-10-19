import { connectMongo } from "@/database/config";
import users from "@/database/models/users";
import { hash } from "bcrypt";

export default async function (req, res) {
  try {
    await connectMongo().catch((err) =>
      res.status(500).json({ error: "Connection Failed...!" })
    );

    if (req.method === "PUT") {
      if (!req.body) {
        return res.status(404).json({ error: "Invalid Body" });
      } else {
        const { email, password } = req.body;

        const hashedPass = await hash(password, 12);

        const result = await users.updateOne(
          { email },
          { $set: { password: hashedPass } }
        );

        return res.status(200).json({ success: true, result });
      }
    } else {
      return res.status(500).json({
        error: `Http ${req.method} request is not allowed for this API`,
      });
    }
  } finally {
  }
}
