import { client, connectMongo } from "@/database/config";
import sizes from "@/database/models/sizes";

export default async function (req, res) {
  try {
    connectMongo().catch((err) => res.json({ error: "Connection Failed...!" }));
    const allSizes = await sizes.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "categoryId",
          foreignField: "_id",
          as: "category",
        },
      },
    ]);
    return res.status(200).json(allSizes);
  } finally {
  }
}
