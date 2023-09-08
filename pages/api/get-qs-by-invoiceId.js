import { client, connectMongo } from "@/database/config";

export default async function (req, res) {
  connectMongo().catch((err) => res.json({ error: "Connection Failed...!" }));

  try {
    await client.connect();

    const quantities_stocks_collection = client
      .db("van_plaza")
      .collection("quantities-stock");

    if (!req.query.invoiceId) {
      return res.status(404).json({ error: "Invalid query" });
    } else {
      const query = { invoiceId: req.query.invoiceId };
      const stockQuantities = await quantities_stocks_collection
        .find(query)
        .toArray();
      return res.status(200).json(stockQuantities);
    }
  } finally {
  }
}
