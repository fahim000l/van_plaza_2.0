import { client, connectMongo } from "@/database/config";

export default async function (req, res) {
  connectMongo().catch((err) => res.json({ error: "Connection Failed...!" }));

  try {
    await client.connect();
    const categoryCollection = client.db("van_plaza").collection("categories");

    if (req.method === "POST") {
      if (!req.body) {
        return res.status(404).json({ error: "Invalid body" });
      } else {
        const categoryInfo = req.body;
        const confirmation = await categoryCollection.insertOne(categoryInfo);
        res.status(200).json(confirmation);
      }
    } else {
      return res.status(500).json({
        error: `Http ${req.method} request is not allowed for this API`,
      });
    }
  } finally {
  }
}
