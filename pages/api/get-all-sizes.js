import { client, connectMongo } from "@/database/config";

export default async function (req, res) {
  connectMongo().catch((err) => res.json({ error: "Connection Failed...!" }));
  try {
    await client.connect();
    const sizeCollection = client.db("van_plaza").collection("sizes");

    const query = {};
    const sizes = await sizeCollection.find(query).toArray();
    return res.status(200).json(sizes);
  } finally {
  }
}
