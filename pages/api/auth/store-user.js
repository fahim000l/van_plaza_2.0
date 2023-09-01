import { connectMongo, client } from "@/database/config";
import { hash } from "bcrypt";

export default async function handler(req, res) {
  connectMongo().catch((err) => res.json({ error: "Connection Failed...!" }));
  try {
    await client.connect();
    const userCollection = client.db("van_plaza").collection("users");

    if (req.method === "POST") {
      if (!req.body) {
        return res.status(404).json({ message: "Invalid body" });
      } else {
        const userInfo = req.body;

        const query = { email: userInfo?.email };
        const isExist = await userCollection.findOne(query);
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
            };
          } else {
            userData = {
              email: userInfo?.email,
              userName: userInfo?.userName,
              profilePic: userInfo?.profilePic,
            };
          }
          const confirmation = await userCollection.insertOne(userData);
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
