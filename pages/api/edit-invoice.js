import { client, connectMongo } from "@/database/config";
import invoices from "@/database/models/invoices";
import products_stocks from "@/database/models/products_stocks";
import quantities_stock from "@/database/models/quantities_stock";
import { ObjectId } from "mongodb";

export default async function (req, res) {
  try {
    connectMongo().catch((err) => res.json({ error: "COnnection Failed..!" }));

    if (req.method === "PUT") {
      if (!req.body) {
        return res.status(404).json("Invalid Body");
      } else {
        if (!req.query.invoiceId) {
          return res.status(404).json("Invalid query");
        } else {
          const { date, supplierId, transId } = req.body;
          const findInvoice = { _id: new ObjectId(req.query.invoiceId) };
          const findStockProducts = {
            invoiceId: new ObjectId(req.query.invoiceId),
          };
          const findStockQuantity = {
            invoiceId: new ObjectId(req.query.invoiceId),
          };

          const option = { upsert: true };
          const invoiceUpdatingDoc = {
            $set: {
              date,
              supplierId,
              transId,
            },
          };

          const stockProductsUpdatingDoc = {
            $set: {
              transId,
            },
          };
          const stockQuantitiesUpdatingDoc = {
            $set: {
              transId,
            },
          };

          const invoiceResult = await invoices.updateOne(
            findInvoice,
            invoiceUpdatingDoc,
            option
          );
          const stockProductsResult = await products_stocks.updateMany(
            findStockProducts,
            stockProductsUpdatingDoc,
            option
          );

          const stockQuantityResult = await quantities_stock.updateMany(
            findStockQuantity,
            stockQuantitiesUpdatingDoc,
            option
          );

          return res.status(200).json({
            success: true,
            invoiceResult,
            stockProductsResult,
            stockQuantityResult,
          });
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
