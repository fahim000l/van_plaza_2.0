import { connectMongo } from "@/database/config";
import orders from "@/database/models/orders";

export default async function (req, res) {
  try {
    await connectMongo().catch((err) =>
      res.json({ error: "Connection Failed...!" })
    );

    if (!req.query.transId) {
      return res.status(404).json("Invalid query");
    } else {
      const query = { transId: req.query.transId };
      const order = await orders.aggregate([
        {
          $match: query,
        },
        {
          $lookup: {
            from: "ordered_stocks",
            localField: "_id",
            foreignField: "orderId",
            as: "ops",
            pipeline: [
              {
                $lookup: {
                  from: "quantities_stocks",
                  localField: "qpId",
                  foreignField: "_id",
                  as: "qpsInfo",
                  pipeline: [
                    {
                      $lookup: {
                        from: "products_stocks",
                        localField: "psId",
                        foreignField: "_id",
                        as: "spsInfo",
                        pipeline: [
                          {
                            $lookup: {
                              from: "products",
                              localField: "productId",
                              foreignField: "_id",
                              as: "productInfo",
                            },
                          },
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
                        from: "sizes",
                        localField: "size",
                        foreignField: "_id",
                        as: "sizeInfo",
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      ]);
      return res.status(200).json(order[0]);
    }
  } finally {
  }
}
