import { client, connectMongo } from "@/database/config";
import { ObjectId } from "mongodb";

export default async function (req, res) {
  connectMongo().catch((err) => res.json({ error: "Connection Failed...!" }));
  try {
    await client.connect();
    const qsCollection = client.db("van_plaza").collection("quantities_stock");

    if (!req.query.invoiceId || !req.query.productId || !req.query.sizeId) {
      return res.status(200).json({ error: "Invalid query" });
    } else {
      const query = {
        $and: [
          { invoiceId: new ObjectId(req.query.invoiceId) },
          { productId: req.query.productId },
          { size: req.query.sizeId },
        ],
      };

      const qs = await qsCollection.findOne(query);
      return res.status(200).json(qs);
    }
  } finally {
  }
}
