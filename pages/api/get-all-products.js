import { client, connectMongo } from "@/database/config";

export default async function (req, res) {
  connectMongo().catch((err) => res.json({ error: "Connection Failed..!" }));

  try {
    await client.connect();
    const productCollection = client.db("van_plaza").collection("products");

    const query = {};
    const products = await productCollection.find(query).toArray();
    return res.status(200).json(products);
  } finally {
  }
}
