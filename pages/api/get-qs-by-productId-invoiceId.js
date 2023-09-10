import { client, connectMongo } from "@/database/config";
import { ObjectId } from "mongodb";

export default async function (req, res) {
  connectMongo().catch((err) => res.json({ error: "Connection Failed..!" }));

  try {
    await client.connect();
    const quantityStockCollection = client
      .db("van_plaza")
      .collection("quantities_stock");

    if (!req.query.productId) {
      return res.status(404).json({ error: "Invalid query" });
    } else {
      if (!req.query.invoiceId) {
        return res.status(404).json({ error: "Invalid query" });
      } else {
        const query = {
          $and: [
            { productId: req.query.productId },
            { invoiceId: new ObjectId(req.query.invoiceId) },
          ],
        };

        const quantityStocks = await quantityStockCollection
          .find(query)
          .toArray();

        return res.status(200).json(quantityStocks);
      }
    }
  } finally {
  }
}
