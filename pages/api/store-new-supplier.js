import { client, connectMongo } from "@/database/config";
import suppliers from "@/database/models/suppliers";

export default async function (req, res) {
  try {
    connectMongo().catch((err) => res.json({ error: "Connection Failed...!" }));

    if (req.method === "POST") {
      if (!req.body) {
        return res.status(404).json({ error: "Invalid Body" });
      } else {
        const supplierInfo = req.body;
        const insertedSupplier = await suppliers.create(supplierInfo);
        return res.status(200).json({ success: true, insertedSupplier });
      }
    } else {
      return res.status(500).json({
        error: `Http ${req.method} request is not allowed for this API`,
      });
    }
  } finally {
  }
}
