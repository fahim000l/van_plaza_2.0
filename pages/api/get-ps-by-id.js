import { connectMongo } from "@/database/config";
import products_stocks from "@/database/models/products_stocks";
import { ObjectId } from "mongodb";

export default async function (req, res) {
  try {
    await connectMongo().catch((err) =>
      res.json({ error: "Connection Failed...!" })
    );

    if (!req.query.psId) {
      return res.status(404).json({ error: "Invalid query" });
    } else {
      const requiredPs = await products_stocks.aggregate([
        {
          $match: {
            _id: new ObjectId(req.query.psId),
          },
        },
        {
          $lookup: {
            from: "products",
            localField: "productId",
            foreignField: "_id",
            as: "products",
            pipeline: [
              {
                $lookup: {
                  from: "categories",
                  localField: "categoryId",
                  foreignField: "_id",
                  as: "categories",
                  pipeline: [
                    {
                      $lookup: {
                        from: "sizes",
                        localField: "_id",
                        foreignField: "categoryId",
                        as: "allSizes",
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
        {
          $lookup: {
            from: "quantities_stocks",
            localField: "_id",
            foreignField: "psId",
            as: "qps",
            pipeline: [
              {
                $lookup: {
                  from: "sizes",
                  localField: "size",
                  foreignField: "_id",
                  as: "sizes",
                },
              },
            ],
          },
        },
      ]);

      return res.status(200).json(requiredPs);
    }
  } finally {
  }
}
