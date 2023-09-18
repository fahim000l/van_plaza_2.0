import { client, connectMongo } from "@/database/config";
import quantities_stock from "@/database/models/quantities_stock";
import { ObjectId } from "mongodb";

export default async function (req, res) {
  try {
    connectMongo().catch((err) => res.json({ error: "connection Failed...!" }));
    if (req.method === "PUT") {
      if (!req.query.invoiceId || !req.query.productId || !req.query.sizeId) {
        return res.status(404).json({ error: "Invalid query" });
      } else {
        if (!req.body) {
          return res.status(404).json({ error: "Invalid Body" });
        } else {
          const { quantity } = req.body;

          const findQs = {
            $and: [
              { invoiceId: new ObjectId(req.query.invoiceId) },
              { productId: req.query.productId },
              { size: req.query.sizeId },
            ],
          };

          const option = { upsert: true };
          const qsUpdatingDoc = {
            $set: {
              quantity,
            },
          };

          const result = await quantities_stock.deleteOne(
            findQs,
            qsUpdatingDoc,
            option
          );

          return res.status(200).json({ success: true, result });
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
