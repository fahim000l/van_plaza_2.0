import { client, connectMongo } from "@/database/config";

export default async function (req, res) {
  connectMongo().catch((err) => res.json({ error: "Connection Failed...!" }));

  try {
    await client.connect();

    const productsStock_collection = client
      .db("van_plaza")
      .collection("products_stocks");

    if (!req.query.invoiceId) {
      return res.status(404).json({ error: "Invalid query" });
    } else {
      const query = { invoiceId: req.query.invoiceId };
      const stockProducts = await productsStock_collection
        .find(query)
        .toArray();
      return res.status(200).json(stockProducts);
    }
  } finally {
  }
}
