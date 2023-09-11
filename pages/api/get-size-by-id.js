import { client, connectMongo } from "@/database/config";
import { ObjectId } from "mongodb";

export default async function (req, res) {
  connectMongo().catch((err) => res.json({ error: "Connection Failed...!" }));

  try {
    await client.connect();
    const sizeCollection = client.db("van_plaza").collection("sizes");

    if (!req.query.sizeId) {
      return res.status(404).json({ error: "Invalid query" });
    } else {
      const query = { _id: new ObjectId(req.query.sizeId) };
      const size = await sizeCollection.findOne(query);
      return res.status(200).json(size);
    }
  } finally {
  }
}
