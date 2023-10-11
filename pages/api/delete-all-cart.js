import { connectMongo } from "@/database/config";
import carts from "@/database/models/carts";

export default async function (req, res) {
  try {
    await connectMongo().catch((err) =>
      res.json({ error: "Connection Failed...!" })
    );

    if (req.method === "DELETE") {
      if (!req.query.user) {
        return res.status(404).json({ error: "Invalid query" });
      } else {
        const result = await carts.deleteMany({ user: req.query.user });
        return res.status(200).json({ success: true, result });
      }
    } else {
      return res.status(500).json({
        error: `Http ${req.method} request is not allowed for this API`,
      });
    }
  } finally {
  }
}
