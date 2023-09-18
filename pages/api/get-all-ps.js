import { client, connectMongo } from "@/database/config";

export default async function (req, res) {
  connectMongo().catch((err) => res.json({ error: "Connection Failed...!" }));

  try {
    await client.connect();
    const psCollection = client.db("van_plaza").collection("products_stocks");
    const productCollection = client.db("van_plaza").collection("products");
    const sps = await psCollection
      .aggregate([
        {
          $lookup: {
            from: productCollection?.collectionName,
            localField: "productId",
            foreignField: "_id",
            as: "productInfo",
          },
        },
      ])
      .toArray();

    return res.status(200).json(sps);
  } finally {
  }
}
