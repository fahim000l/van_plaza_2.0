import { client, connectMongo } from "@/database/config";
import invoices from "@/database/models/invoices";
import products_stocks from "@/database/models/products_stocks";
import quantities_stock from "@/database/models/quantities_stock";

export default async function (req, res) {
  try {
    connectMongo().catch((err) => res.json({ error: "Connection Failed...!" }));
    if (req.method === "POST") {
      if (!req.body) {
        return res.status(404).json({ error: "Invalid Body" });
      } else {
        const stockInfo = req.body;
        const { invoiceData, productsData, quantityData } = stockInfo;

        const insertInvoice = await invoices.create(invoiceData);

        if (insertInvoice?._id) {
          const invoiceId = insertInvoice?._id;
          productsData?.forEach((pd) => (pd.invoiceId = invoiceId));
          quantityData?.forEach((qd) => (qd.invoiceId = invoiceId));

          const insertPs = await products_stocks.insertMany(productsData);
          insertPs?.forEach((pd) => {
            const psId = pd?._id;
            quantityData?.forEach((qd) => {
              if (
                qd?.invoiceId === pd?.invoiceId &&
                qd?.productId === pd?.productId.toString()
              ) {
                qd.psId = psId;
              }
            });
          });

          if (insertPs[0]?._id) {
            const insertQs = await quantities_stock.insertMany(quantityData);

            return res.status(200).json({
              insertInvoice,
              insertPs,
              insertQs,
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
  } finally {
  }
}
