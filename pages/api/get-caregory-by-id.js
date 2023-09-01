import { client, connectMongo } from "@/database/config";
import { ObjectId } from "mongodb";

export default async function (req, res) {
  connectMongo().catch((err) => res.json({ error: "Connection Failed...!" }));

  try {
    await client.connect();

    const categoryCollection = client.db("van_plaza").collection("categories");

    if (!req.query.categoryId) {
      return res.status(404).json({ error: "Invalid query" });
    } else {
      const query = { _id: new ObjectId(req.query.categoryId) };
      const category = await categoryCollection.findOne(query);
      return res.status(200).json(category);
    }
  } finally {
  }
}
