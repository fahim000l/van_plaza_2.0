import { client, connectMongo } from "@/database/config";
import products from "@/database/models/products";

export default async function (req, res) {
  try {
    connectMongo().catch((err) => res.json({ error: "Connection Failed...!" }));

    if (req.method === "POST") {
      if (!req.body) {
        return res.status(404).json({ error: "Invalid body" });
      } else {
        const productInfo = req.body;
        const insertingProduct = await products.create(productInfo);
        return res.status(200).json({ success: true, insertingProduct });
      }
    } else {
      return res.status(500).json({
        error: `Http ${req.method} request is not allowed for this API`,
      });
    }
  } finally {
  }
}
