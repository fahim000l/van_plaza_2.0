import { client, connectMongo } from "@/database/config";
import sizes from "@/database/models/sizes";

export default async function (req, res) {
  try {
    connectMongo().catch((err) => res.json({ error: "Connection Failed...!" }));

    if (req.method === "POST") {
      if (!req.body) {
        return res.status(404).json({ error: "Invalid Body" });
      } else {
        const sizeInfo = req.body;
        const insertedSize = await sizes.create(sizeInfo);
        return res.status(200).json({ success: true, insertedSize });
      }
    } else {
      return res.status(500).json({
        error: `Http ${req.method} request is not allowed for this API`,
      });
    }
  } finally {
  }
}
