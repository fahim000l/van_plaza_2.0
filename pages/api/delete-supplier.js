import { client, connectMongo } from "@/database/config";
import { ObjectId } from "mongodb";

export default async function (req, res) {
  connectMongo().catch((err) => res.json({ error: "Connection Failed...!" }));

  try {
    await client.connect();
    const supplierCollection = client.db("van_plaza").collection("suppliers");

    if (req.method === "DELETE") {
      if (!req.query.supplierId) {
        return res.status(404).json({ error: "Invalid query" });
      } else {
        const query = { _id: new ObjectId(req.query.supplierId) };
        const confirmation = await supplierCollection.deleteOne(query);
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
