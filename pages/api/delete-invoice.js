import { client, connectMongo } from "@/database/config";
import { ObjectId } from "mongodb";

export default async function (req, res) {
  connectMongo().catch((err) => res.json({ error: "Connection Failed...!" }));

  try {
    await client.connect();
    const invoiceCollection = client.db("van_plaza").collection("invoices");
    const psCollection = client.db("van_plaza").collection("products_stocks");
    const qsCollection = client.db("van_plaza").collection("quantities_stock");

    if (req.method === "DELETE") {
      if (!req.query.invoiceId) {
        return res.status(404).json({ error: "Invalid query" });
      } else {
        const invoiceQuery = { _id: new ObjectId(req.query.invoiceId) };
        const othersQuery = { invoiceId: new ObjectId(req.query.invoiceId) };
        const invoiceResult = await invoiceCollection.deleteOne(invoiceQuery);
        const psResult = await psCollection.deleteMany(othersQuery);
        const qsResult = await qsCollection.deleteMany(othersQuery);
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
