import { client, connectMongo } from "@/database/config";
import users from "@/database/models/users";

export default async function (req, res) {
  try {
    connectMongo().catch((err) =>
      res.json({ error: "Connection Failed...!", err })
    );

    if (!req.query.email) {
      return res.status(404).json({ message: "Invalid query" });
    } else {
      const query = { email: req.query.email };
      const user = await users.aggregate([
        {
          $match: query,
        },
        {
          $lookup: {
            from: "ordered_stocks",
            localField: "email",
            foreignField: "user",
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
                  from: "orders",
                  localField: "orderId",
                  foreignField: "_id",
                  as: "orderInfo",
                },
              },
              {
                $lookup: {
                  from: "categories",
                  localField: "categoryId",
                  foreignField: "_id",
                  as: "categoryInfo",
                  pipeline: [
                    {
                      $lookup: {
                        from: "products_stocks",
                        localField: "_id",
                        foreignField: "categoryId",
                        as: "sps",
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
                        ],
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
            from: "locations",
            localField: "email",
            foreignField: "user",
            as: "locations",
          },
        },
        {
          $lookup: {
            from: "carts",
            localField: "email",
            foreignField: "user",
            as: "carts",
            pipeline: [
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
                        pipeline: [
                          {
                            $lookup: {
                              from: "categories",
                              localField: "categoryId",
                              foreignField: "_id",
                              as: "categories",
                            },
                          },
                        ],
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
            ],
          },
        },
      ]);
      if (user) {
        return res.status(200).json(user[0]);
      } else {
        return res.status(404).json({ error: "User not found" });
      }
    }
  } finally {
  }
}
