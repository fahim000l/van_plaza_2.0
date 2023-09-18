import { client, connectMongo } from "@/database/config";
import categories from "@/database/models/categories";

export default async function (req, res) {
  try {
    await connectMongo().catch((err) =>
      res.json({ error: "Connection Failed...!" })
    );

    if (req.method === "POST") {
      if (!req.body) {
        return res.status(404).json({ error: "Invalid body" });
      } else {
        const categoryInfo = req.body;
        const insertedCategory = await categories.create(categoryInfo);
        res.status(200).json({ success: true, insertedCategory });
      }
    } else {
      return res.status(500).json({
        error: `Http ${req.method} request is not allowed for this API`,
      });
    }
  } finally {
  }
}
