import { connectMongo } from "@/database/config";
import ordered_stocks from "@/database/models/ordered_stocks";

export default async function (req, res) {
  try {
    await connectMongo().catch((err) =>
      res.json({ error: "Connection Failed...!" })
    );

    const AllFav = await ordered_stocks.aggregate([
      {
        $match: { user: req.query.user },
      },
    ]);
  } finally {
  }
}
