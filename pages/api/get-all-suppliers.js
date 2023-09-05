import { client, connectMongo } from "@/database/config";

export default async function (req, res) {
  connectMongo().catch((err) => res.json({ error: "Connection Failed...!" }));

  try {
    await client.connect();
    const supplierCollection = client.db("van_plaza").collection("suppliers");

    const query = {};
    const suppliers = await supplierCollection.find(query).toArray();
    return res.status(200).json(suppliers);
  } finally {
  }
}
