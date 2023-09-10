import { client, connectMongo } from "@/database/config";
import { ObjectId } from "mongodb";

export default async function (req, res) {
  connectMongo().catch((err) => res.json({ error: "COnnection Failed..!" }));

  try {
    await client.connect();
    const invoiceCollection = client.db("van_plaza").collection("invoices");
    const productsStockCollection = client
      .db("van_plaza")
      .collection("products_stocks");

    const quantitiesStockCollection = client
      .db("van_plaza")
      .collection("quantities_stock");

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

          const invoiceResult = await invoiceCollection.updateOne(
            findInvoice,
            invoiceUpdatingDoc,
            option
          );
          const stockProductsResult = await productsStockCollection.updateMany(
            findStockProducts,
            stockProductsUpdatingDoc,
            option
          );

          const stockQuantityResult =
            await quantitiesStockCollection.updateMany(
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
