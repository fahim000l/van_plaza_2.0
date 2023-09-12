import { client, connectMongo } from "@/database/config";
import { ObjectId } from "mongodb";

export default async function (req, res) {
  connectMongo().catch((err) => res.json({ error: "Connection Failed ...!" }));

  try {
    await client.connect();
    const psCollection = client.db("van_plaza").collection("products_stocks");
    const qsCollection = client.db("van_plaza").collection("quantities_stock");

    if (req.method === "DELETE") {
      if (!req.query.invoiceId || !req.query.productId) {
        return res.status(404).json({ error: "Invalid query" });
      } else {
        const query = {
          $and: [
            { invoiceId: new ObjectId(req.query.invoiceId) },
            { productId: req.query.productId },
          ],
        };

        const psResult = await psCollection.deleteOne(query);
        const qsResult = await qsCollection.deleteMany(query);
        return res.status(200).json({ success: true, psResult, qsResult });
      }
    } else {
      return res.status(500).json({
        error: `Http ${req.method} request is not allowed for this API`,
      });
    }
  } finally {
  }
}
