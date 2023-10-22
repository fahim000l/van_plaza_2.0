import { connectMongo } from "@/database/config";
import carts from "@/database/models/carts";
import { serialize } from "cookie";

export default async function (req, res) {
  try {
    await connectMongo().catch((err) =>
      res.status(500).json({ error: "Connection Failed...!" })
    );

    if (!req.query.email) {
      return res.status(404).json({ error: "Invalid query" });
    } else {
      const deleteAllCarts = await carts.deleteMany({ user: req.query.email });

      res.setHeader(
        "Set-Cookie",
        serialize("token", "", {
          httpOnly: true,
          path: "/",
          maxAge: 0,
        })
      );

      return res.status(200).json({ success: true, deleteAllCarts });
    }
  } finally {
  }
}
