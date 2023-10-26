import { connectMongo } from "@/database/config";
import products_stocks from "@/database/models/products_stocks";
import { ObjectId } from "mongodb";

export default async function (req, res) {
  try {
    const priceStatus = req.query.priceStatus;
    const priceRange = {
      $and: [
        { sellPrice: { $gt: req.query.minPrice } },
        { sellPrice: { $lt: req.query.maxPrice } },
      ],
    };
    console.log(priceStatus);

    connectMongo().catch((err) => res.json({ error: "Connection Failed...!" }));
    const sps = await products_stocks
      .aggregate([
        {
          $match: req.query.categoryId
            ? { categoryId: new ObjectId(req.query.categoryId) }
            : req.query.maxPrice && req.query.minPrice
            ? priceRange
            : {},
        },
        {
          $lookup: {
            from: "products",
            localField: "productId",
            foreignField: "_id",
            as: "products",
            pipeline:
              req.query.search !== "*"
                ? [
                    {
                      $search: {
                        index: "search_products",
                        text: {
                          query: req.query.search,
                          path: {
                            wildcard: "*",
                          },
                        },
                      },
                    },
                  ]
                : [
                    {
                      $lookup: {
                        from: "categories",
                        localField: "categoryId",
                        foreignField: "_id",
                        as: "categoryInfo",
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
      ])
      .sort({ sellPrice: parseInt(priceStatus) });

    return res.status(200).json(sps);
  } finally {
  }
}
