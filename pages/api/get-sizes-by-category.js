import { client, connectMongo } from "@/database/config";
import { ObjectId } from "mongodb";

export default async function (req, res) {
  connectMongo().catch((err) => res.json({ message: "Connection Failed...!" }));

  try {
    await client.connect();
    const sizeCollection = client.db("van_plaza").collection("sizes");

    if (!req.query.categoryId) {
      return res.status(404).json({ error: "Invalid query" });
    } else {
      const query = { categoryId: new ObjectId(req.query.categoryId) };
      const sizes = await sizeCollection.find(query).toArray();
      return res.status(200).json(sizes);
    }
  } finally {
  }
}
