import { client, connectMongo } from "@/database/config";
import { ObjectId } from "mongodb";

export default async function (req, res) {
  connectMongo().catch((err) => res.json({ error: "Connection Failed...!" }));

  try {
    await client.connect();
    const invoiceCollection = client.db("van_plaza").collection("invoices");

    if (!req.query.invoiceId) {
      return res.status(404).json({ error: "Invalid query" });
    } else {
      const query = { _id: new ObjectId(req.query.invoiceId) };

      const invoice = await invoiceCollection.findOne(query);
      return res.status(200).json(invoice);
    }
  } finally {
  }
}
