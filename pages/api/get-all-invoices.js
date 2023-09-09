import { client, connectMongo } from "@/database/config";

export default async function (req, res) {
  connectMongo().catch((err) => res.json({ error: "Connection Failed...!" }));

  try {
    await client.connect();
    const invoiceCollection = client.db("van_plaza").collection("invoices");

    const query = {};
    const invoices = await invoiceCollection.find(query).toArray();
    return res.status(200).json(invoices);
  } finally {
  }
}
