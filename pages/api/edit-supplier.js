import { client, connectMongo } from "@/database/config";
import { ObjectId } from "mongodb";

export default async function (req, res) {
  connectMongo().catch((err) => res.json({ error: "Connection Failed...!" }));

  try {
    await client.connect();
    const supplierCollection = client.db("van_plaza").collection("suppliers");

    if (req.method === "PUT") {
      if (!req.body) {
        return res.status(404).json({ error: "Invalid Body" });
      } else {
        if (!req.query.supplierId) {
          return res.status(404).json({ error: "Invalid query" });
        } else {
          const findSupplier = { _id: new ObjectId(req.query.supplierId) };
          const editingInfo = req.body;
          const option = { upsert: true };
          const updatingDoc = {
            $set: editingInfo,
          };
          const confirmation = await supplierCollection.updateOne(
            findSupplier,
            updatingDoc,
            option
          );
          return res.status(200).json(confirmation);
        }
      }
    } else {
      return res.status(500).json({
        error: `Http ${req.method} request is not allowed for this API`,
      });
    }
  } finally {
  }
}
