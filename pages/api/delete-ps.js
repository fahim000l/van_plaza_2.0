import { client, connectMongo } from "@/database/config";
import products_stocks from "@/database/models/products_stocks";
import quantities_stock from "@/database/models/quantities_stock";
import { ObjectId } from "mongodb";

export default async function (req, res) {
  try {
    connectMongo().catch((err) =>
      res.json({ error: "Connection Failed ...!" })
    );

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

        const psResult = await products_stocks.deleteOne(query);
        const qsResult = await quantities_stock.deleteMany(query);
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
