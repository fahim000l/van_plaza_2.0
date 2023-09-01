import { client, connectMongo } from "@/database/config";
import { ObjectId } from "mongodb";

export default async function (req, res) {
  connectMongo().catch((err) => res.json({ error: "Connection Failed...!" }));

  try {
    await client.connect();
    const categoryCollection = client.db("van_plaza").collection("categories");

    if (req.method === "PUT") {
      if (!req.body) {
        res.status(404).json({ error: "Invalid Body" });
      } else {
        const editingInfo = req.body;
        const findCategory = { _id: new ObjectId(editingInfo?.categoryId) };
        const option = { upsert: true };
        const updatingDoc = {
          $set: {
            categoryName: editingInfo?.editingName,
          },
        };

        const confirmation = await categoryCollection.updateOne(
          findCategory,
          updatingDoc,
          option
        );

        res.status(200).json(confirmation);
      }
    } else {
      res.status(500).json({
        error: `Http ${req.method} request is not allowed for this API`,
      });
    }
  } finally {
  }
}
