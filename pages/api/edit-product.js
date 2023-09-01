import { client, connectMongo } from "@/database/config";
import { ObjectId } from "mongodb";

export default async function (req, res) {
  connectMongo().catch((err) => res.json({ error: "Connection Failed...!" }));

  try {
    await client.connect();
    const productCollection = client.db("van_plaza").collection("products");

    if (req.method === "PUT") {
      if (!req.body) {
        return res.status(404).json({ error: "Invalied Body" });
      } else {
        if (!req.query.productId) {
          return res.status(404).json({ error: "Invalid query" });
        } else {
          const editingInfo = req.body;
          const findProduct = { _id: new ObjectId(req.query.productId) };
          const option = { upsert: true };
          const updatingDoc = {
            $set: editingInfo,
          };

          const confirmation = await productCollection.updateOne(
            findProduct,
            updatingDoc,
            option
          );

          return res.status(200).json(confirmation);
        }
      }
    } else {
      return res
        .status(500)
        .json({ error: `Http ${req.method} is not allowed for this API` });
    }
  } finally {
  }
}
