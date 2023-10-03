import { connectMongo } from "@/database/config";
import orders from "@/database/models/orders";

export default async function (req, res) {
  try {
    await connectMongo().catch((err) =>
      res.json({ error: "Connection Failed...!" })
    );

    let query = {};
    if (req.query.status) {
      query = { status: req.query.status };
    }

    const allOrders = await orders.aggregate([
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
                as: "qpInfo",
                pipeline: [
                  {
                    $lookup: {
                      from: "products_stocks",
                      localField: "psId",
                      foreignField: "_id",
                      as: "psInfo",
                      pipeline: [
                        {
                          $lookup: {
                            from: "products",
                            localField: "productId",
                            foreignField: "_id",
                            as: "productInfo",
                            pipeline: [
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
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "email",
          as: "userInfo",
        },
      },
    ]);

    return res.status(200).json(allOrders);
  } finally {
  }
}
