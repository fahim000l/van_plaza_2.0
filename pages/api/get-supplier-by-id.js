import { client, connectMongo } from "@/database/config";
import { ObjectId } from "mongodb";

export default async function (req, res) {
  connectMongo().catch((err) => res.json({ error: "Connection Failed...!" }));

  try {
    await client.connect();
    const supplierCollection = client.db("van_plaza").collection("suppliers");

    if (!req.query.supplierId) {
      return res.status(404).json({ error: "Invalid query" });
    } else {
      const query = { _id: new ObjectId(req.query.supplierId) };
      const supplier = await supplierCollection.findOne(query);
      return res.status(200).json(supplier);
    }
  } finally {
  }
}
