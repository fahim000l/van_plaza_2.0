import { client, connectMongo } from "@/database/config";
import categories from "@/database/models/categories";

export default async function (req, res) {
  try {
    connectMongo().catch((err) => res.json({ error: "Connection Failed...!" }));

    const query = {};

    if (req.query.limit) {
      const allCategories = await categories.find(query).limit(req.query.limit);
      return res.status(200).json(allCategories);
    } else {
      const allCategories = await categories.aggregate([
        {
          $match: query,
        },
        {
          $lookup: {
            from: "sizes",
            localField: "_id",
            foreignField: "categoryId",
            as: "sizes",
          },
        },
      ]);
      return res.status(200).json(allCategories);
    }
  } finally {
  }
}
