import { connectMongo } from "@/database/config";
import users from "@/database/models/users";
import { NextResponse } from "next/server";
import { compare } from "bcrypt";

export default async function (req, res) {
  try {
    await connectMongo().catch((err) =>
      res.status(500).json({ error: "Connection Failed...!" })
    );

    if (!req.query.emailToken || !req.query.email || !req.query.path) {
      return res.status(404).json({ error: "Invalid query" });
    } else {
      const isValid = compare(
        process.env.NEXT_PUBLIC_EMAIL_TOKEN,
        req.query.emailToken
      );

      if (isValid) {
        const result = await users.updateOne(
          { email: req.query.email },
          { $set: { isVarified: true } }
        );

        return res.redirect(
          `${process.env.NEXT_PUBLIC_PROJECT_URL + req.query.path}`
        );
      } else {
        return res.status(404).json({ error: "Unauthorized" });
      }
    }
  } finally {
  }
}
