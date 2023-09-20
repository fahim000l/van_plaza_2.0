import { connectMongo } from "@/database/config";
import carts from "@/database/models/carts";
import { ObjectId } from "mongodb";

export default async function (req, res) {
  try {
    await connectMongo().catch((err) =>
      res.json({ error: "Connection Failed...!" })
    );

    if (!req.query.qpId) {
      return res.status(404).json({ error: "Invalid query" });
    } else {
      const allCarts = await carts.aggregate([
        {
          $match: { qpId: new ObjectId(req.query.qpId) },
        },
        {
          $lookup: {
            from: "quantities_stocks",
            localField: "qpId",
            foreignField: "_id",
            as: "qps",
          },
        },
      ]);

      return res.status(200).json(allCarts);
    }
  } finally {
  }
}
