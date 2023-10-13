import { connectMongo } from "@/database/config";
import users from "@/database/models/users";
import { serialize } from "cookie";
import { SignJWT } from "jose";

import JWT from "jsonwebtoken";

export default async function (req, res) {
  try {
    await connectMongo().catch((err) =>
      res.json({ error: "Connection Failed...!" })
    );

    if (!req.query.email) {
      return res.status(404).json({ error: "Invalid query" });
    } else {
      const user = await users.findOne({ email: req.query.email });

      const token = JWT.sign(
        { email: user?.email },
        process.env.NEXT_PUBLIC_JWT_TOKEN,
        { expiresIn: "1d" }
      );

      const tokenWithPayload = token + "_role_" + user?.role;

      res.setHeader(
        "Set-Cookie",
        serialize("token", tokenWithPayload, {
          httpOnly: true,
          path: "/",
        })
      );

      return res.json({ success: true });
    }
  } finally {
  }
}
