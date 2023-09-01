import { client, connectMongo } from "@/database/config";

export default async function (req, res) {
  connectMongo().catch((err) => res.json({ error: "Connection Failed...!" }));
  try {
    await client.connect();
    const categoryCollection = client.db("van_plaza").collection("categories");

    const query = {};
    const categories = await categoryCollection.find(query).toArray();
    return res.status(200).json(categories);
  } finally {
  }
}
