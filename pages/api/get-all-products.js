import { client, connectMongo } from "@/database/config";
import products from "@/database/models/products";

export default async function (req, res) {
  try {
    connectMongo().catch((err) => res.json({ error: "Connection Failed..!" }));
    const allProducts = await products.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "categoryId",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $lookup: {
          from: "products_stocks",
          localField: "_id",
          foreignField: "productId",
          as: "sps_product",
        },
      },
      {
        $lookup: {
          from: "quantities_stocks",
          localField: "_id",
          foreignField: "productId",
          as: "qps_product",
        },
      },
      {
        $lookup: {
          from: "sizes",
          localField: "categoryId",
          foreignField: "categoryId",
          as: "sizes_category",
        },
      },
    ]);
    return res.status(200).json(allProducts);
  } finally {
  }
}
