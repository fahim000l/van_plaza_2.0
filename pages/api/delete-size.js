import { client, connectMongo } from "@/database/config";
import { ObjectId } from "mongodb";

export default async function (req, res) {
  connectMongo().catch((err) => res.json({ error: "Connection Failed...!" }));

  try {
    await client.connect();
    const sizeCollection = client.db("van_plaza").collection("sizes");

    if (req.method === "DELETE") {
      if (!req.query.sizeId) {
        return res.status(404).json({ error: "Invalid query" });
      } else {
        const query = { _id: new ObjectId(req.query.sizeId) };
        const confirmation = await sizeCollection.deleteOne(query);
        return res.status(200).json(confirmation);
      }
    } else {
      return res.status(500).json({
        error: `Http ${req.method} request is not allowed for this API`,
      });
    }
  } finally {
  }
}
