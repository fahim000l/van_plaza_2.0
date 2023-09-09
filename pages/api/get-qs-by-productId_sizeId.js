import { client, connectMongo } from "@/database/config";

export default async function (req, res) {
  connectMongo().catch((err) => res.json({ error: "Connection Failed...!" }));

  try {
    await client.connect();

    const quantities_stocks_collection = client
      .db("van_plaza")
      .collection("quantities_stock");

    if (!req.query.productId) {
      return res.status(404).json({ error: "Invalid query" });
    } else {
      if (!req.query.sizeId) {
        return res.status(404).json({ error: "Invalid Size" });
      } else {
        const query = {
          $and: [
            { productId: req.query.productId },
            { size: req.query.sizeId },
          ],
        };
        const stockquantities = await quantities_stocks_collection
          .find(query)
          .toArray();
        return res.status(200).json(stockquantities);
      }
    }
  } finally {
  }
}
