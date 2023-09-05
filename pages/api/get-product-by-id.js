import { client, connectMongo } from "@/database/config";
import { ObjectId } from "mongodb";

export default async function (req, res) {
  connectMongo().catch((err) => res.json({ error: "Connection Failed...!" }));

  try {
    await client.connect();
    const productCollection = client.db("van_plaza").collection("products");

    if (!req.query.productId) {
      return res.status(404).json({ error: "Invalid query" });
    } else {
      const query = { _id: new ObjectId(req.query.productId) };
      const product = await productCollection.findOne(query);
      return res.status(200).json(product);
    }
  } finally {
  }
}
