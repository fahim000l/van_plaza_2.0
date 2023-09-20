import { connectMongo } from "@/database/config";
import carts from "@/database/models/carts";

export default async function (req, res) {
  try {
    await connectMongo().catch((err) =>
      res.json({ error: "Connection Failed...!" })
    );

    if (!req.query.user) {
      return res.status(404).json({ error: "Invalid query" });
    } else {
      const allCartItems = await carts.aggregate([
        {
          $match: {
            user: req.query.user,
          },
        },
        {
          $lookup: {
            from: "quantities_stocks",
            localField: "qpId",
            foreignField: "_id",
            as: "qps",
            pipeline: [
              {
                $lookup: {
                  from: "products",
                  localField: "productId",
                  foreignField: "_id",
                  as: "products",
                },
              },
              {
                $lookup: {
                  from: "products_stocks",
                  localField: "psId",
                  foreignField: "_id",
                  as: "sps",
                },
              },
            ],
          },
        },
      ]);

      return res.status(200).json(allCartItems);
    }
  } finally {
  }
}
