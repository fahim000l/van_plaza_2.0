import { client, connectMongo } from "@/database/config";
import { ElectricScooterSharp } from "@mui/icons-material";
import productsStock from "../dashboard/stock-collection/products-stock";

export default async function (req, res) {
  connectMongo().catch((err) => res.json({ error: "Connection Failed...!" }));

  await client.connect();
  const invoiceCollection = client.db("van_plaza").collection("invoices");
  const productsStockCollection = client
    .db("van_plaza")
    .collection("products_stocks");
  const quantitiesStockCollection = client
    .db("van_plaza")
    .collection("quantities-stock");

  if (req.method === "POST") {
    if (!req.body) {
      return res.status(404).json({ error: "Invalid Body" });
    } else {
      const stockInfo = req.body;
      const { invoiceData, productsData, quantityData } = stockInfo;

      const invoiceConfirmation = await invoiceCollection.insertOne(
        invoiceData
      );

      if (invoiceConfirmation?.acknowledged) {
        const invoiceId = invoiceConfirmation?.insertedId;
        productsData?.forEach((pd) => (pd.invoiceId = invoiceId));
        quantityData?.forEach((qd) => (qd.invoiceId = invoiceId));

        const productsConfirmation = await productsStockCollection.insertMany(
          productsData
        );

        if (productsConfirmation?.acknowledged) {
          const quantitiesConfirmation =
            await quantitiesStockCollection.insertMany(quantityData);

          return res.status(200).json({
            invoiceConfirmation,
            productsConfirmation,
            quantitiesConfirmation,
            success: true,
          });
        } else {
          return res.status(500).json({ error: "Products Insertion Failed" });
        }
      } else {
        return res.status(500).json({ error: "Invoice Insertion failed" });
      }
    }
  } else {
    return res.status(500).json({
      error: `Http ${req.method} request is not allowed for this API`,
    });
  }
}
