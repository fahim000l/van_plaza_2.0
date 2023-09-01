import { client, connectMongo } from "@/database/config";

export default async function (req, res) {
  connectMongo().catch((err) => res.json({ error: "Connection Failed...!" }));
  try {
    await client.connect();
    const userCollection = client.db("van_plaza").collection("users");

    if (!req.query.email) {
      return res.status(404).json({ message: "Invalid query" });
    } else {
      const query = { email: req.query.email };
      const user = await userCollection.findOne(query);
      if (user) {
        return res.status(200).json(user);
      } else {
        return res.status(404).json({ error: "User not found" });
      }
    }
  } finally {
  }
}
