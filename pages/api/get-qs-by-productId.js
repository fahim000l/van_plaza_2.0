import { client, connectMongo } from "@/database/config";

export default async function (req, res) {
  connectMongo().catch((err) => res.json({ error: "Connection Failed...!" }));

  try {
    await client.connect();
    const quantitiesStock_collection = client
      .db("van_plaza")
      .collection("quantities_stock");

    if (!req.query.productId) {
      return res.status(404).json({ error: "Invalid query" });
    } else {
      const query = { productId: req.query.productId };
      const stockQuantities = await quantitiesStock_collection
        .find(query)
        .toArray();

      return res.status(200).json(stockQuantities);
    }
  } finally {
  }
}
