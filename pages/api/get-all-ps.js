import { connectMongo } from "@/database/config";
import products_stocks from "@/database/models/products_stocks";
import { ObjectId } from "mongodb";

export default async function (req, res) {
  try {
    connectMongo().catch((err) => res.json({ error: "Connection Failed...!" }));
    const sps = await products_stocks.aggregate([
      {
        $match: req.query.categoryId
          ? { categoryId: new ObjectId(req.query.categoryId) }
          : {},
      },
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
    ]);

    return res.status(200).json(sps);
  } finally {
  }
}
