import { connectMongo } from "@/database/config";
import users from "@/database/models/users";

export default async function (req, res) {
  try {
    await connectMongo().catch((err) =>
      res.json({ error: "Connection Failed...!" })
    );

    if (req.method === "PUT") {
      if (!req.query.email) {
        return res.status(404).json({ error: "Invalid query" });
      } else {
        if (!req.body) {
          return res.status(404).json({ error: "Invalid Body" });
        } else {
          const userInfo = req.body;
          const findUser = { email: req.query.email };

          const updatingDoc = {
            $set: userInfo,
          };

          const result = await users.updateOne(findUser, updatingDoc, {
            upsert: true,
          });

          return res.status(200).json({ success: true, result });
        }
      }
    } else {
      return res.status(500).json({
        error: `Http ${req.method} request is not allowed for this API`,
      });
    }
  } finally {
  }
}
