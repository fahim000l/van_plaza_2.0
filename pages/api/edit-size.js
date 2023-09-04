import { client, connectMongo } from "@/database/config";
import { ObjectId } from "mongodb";

export default async function (req, res) {
  connectMongo().catch((err) => res.json({ erro: "Connection Failed...!" }));
  try {
    await client.connect();
    const sizeCollection = client.db("van_plaza").collection("sizes");
    if (req.method === "PUT") {
      if (!req.body) {
        return res.status(404).json({ error: "Invalid Body" });
      } else {
        if (!req.query.sizeId) {
          return req.status(404).json({ error: "Invalid query" });
        } else {
          const sizeInfo = req.body;
          const findSize = { _id: new ObjectId(req.query.sizeId) };
          const option = { upsert: true };
          const updatingDoc = {
            $set: sizeInfo,
          };
          const confirmation = await sizeCollection.updateOne(
            findSize,
            updatingDoc,
            option
          );

          return res.status(200).json(confirmation);
        }
      }
    } else {
      return res.status(500).json({
        error: `Http ${req.method} request is not allowed for this API`,
      });
    }
  } finally {
  }
}
