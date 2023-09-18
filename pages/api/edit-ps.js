import { client, connectMongo } from "@/database/config";
import products_stocks from "@/database/models/products_stocks";
import quantities_stock from "@/database/models/quantities_stock";
import { ObjectId } from "mongodb";

export default async function (req, res) {
  try {
    connectMongo().catch((err) => res.json({ error: "Connection Failed..!" }));

    if (req.method === "PUT") {
      if (!req.query.invoiceId || !req.query.productId) {
        return res.status(404).json({ error: "Invalid query" });
      } else {
        if (!req.body) {
          return res.status(404).json({ error: "Invalid Body" });
        } else {
          const { productId, buyPrice, sellPrice } = req.body;
          const findPs = {
            $and: [
              { invoiceId: new ObjectId(req.query.invoiceId) },
              { productId: req.query.productId },
            ],
          };
          const findQs = {
            $and: [
              { invoiceId: new ObjectId(req.query.invoiceId) },
              { productId: req.query.productId },
            ],
          };

          const option = { upsert: true };

          const psUpdatingDoc = {
            $set: {
              productId,
              buyPrice,
              sellPrice,
            },
          };

          const qsUpdatingDoc = {
            $set: {
              productId,
            },
          };

          const psResult = await products_stocks.updateOne(
            findPs,
            psUpdatingDoc,
            option
          );
          const qsResult = await quantities_stock.updateMany(
            findQs,
            qsUpdatingDoc,
            option
          );

          return res.status(200).json({ success: true, psResult, qsResult });
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
