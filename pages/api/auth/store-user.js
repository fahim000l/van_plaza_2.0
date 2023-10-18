import { connectMongo, client } from "@/database/config";
import users from "@/database/models/users";
import { hash } from "bcrypt";

export default async function handler(req, res) {
  try {
    connectMongo().catch((err) => res.json({ error: "Connection Failed...!" }));

    if (req.method === "POST") {
      if (!req.body) {
        return res.status(404).json({ message: "Invalid body" });
      } else {
        const userInfo = req.body;

        const query = { email: userInfo?.email };
        const isExist = await users.findOne(query);
        if (isExist) {
          return res.status(422).json({ message: "User already exists" });
        } else {
          let userData;
          if (userInfo?.password) {
            userData = {
              email: userInfo?.email,
              userName: userInfo?.userName,
              password: await hash(userInfo?.password, 12),
              profilePic: userInfo?.profilePic,
              role: "user",
              isVarified: false,
              emailToken: await hash(process.env.NEXT_PUBLIC_EMAIL_TOKEN, 12),
            };
          } else {
            userData = {
              email: userInfo?.email,
              userName: userInfo?.userName,
              profilePic: userInfo?.profilePic,
              role: "user",
              isVarified: false,
              emailToken: await hash(process.env.NEXT_PUBLIC_EMAIL_TOKEN, 12),
            };
          }
          const confirmation = await users.create(userData);
          return res.status(200).json(confirmation);
        }
      }
    } else {
      res.status(500).json({
        message: `HTTP method ${req.method} not allowed for this API`,
      });
    }
  } finally {
  }
}
