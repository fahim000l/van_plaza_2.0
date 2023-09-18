import { client, connectMongo } from "@/database/config";
import invoices from "@/database/models/invoices";
import products_stocks from "@/database/models/products_stocks";
import quantities_stock from "@/database/models/quantities_stock";
import { ObjectId } from "mongodb";

export default async function (req, res) {
  try {
    connectMongo().catch((err) => res.json({ error: "Connection Failed...!" }));

    if (req.method === "DELETE") {
      if (!req.query.invoiceId) {
        return res.status(404).json({ error: "Invalid query" });
      } else {
        const invoiceQuery = { _id: new ObjectId(req.query.invoiceId) };
        const othersQuery = { invoiceId: new ObjectId(req.query.invoiceId) };
        const invoiceResult = await invoices.deleteOne(invoiceQuery);
        const psResult = await products_stocks.deleteMany(othersQuery);
        const qsResult = await quantities_stock.deleteMany(othersQuery);
        return res
          .status(200)
          .json({ success: true, invoiceResult, psResult, qsResult });
      }
    } else {
      return res.status(500).json({
        error: `Http ${req.method} request is not allowed for this API`,
      });
    }
  } finally {
  }
}
