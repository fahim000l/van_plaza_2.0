import { connectMongo } from "@/database/config";
import orders from "@/database/models/orders";

export default async function (req, res) {
  try {
    await connectMongo().catch((err) =>
      res.json({ error: "Connection Failed...!" })
    );

    if (req.method === "POST") {
      if (!req.query.tran_id) {
        return res.status(404).json({ error: "Invalid query" });
      } else {
        const findOrder = { transId: req.query.tran_id };
        const updatingDoc = {
          $set: {
            status: "success",
          },
        };

        const result = await orders.updateOne(findOrder, updatingDoc);
        if (result.acknowledged) {
          return res.redirect(
            `${process.env.PROJECT_URL}/payment?transId=${req.query.tran_id}`
          );
        } else {
          return res.status(500).json({ success: false });
        }
      }
    } else {
      return res.status(500).json({
        error: `Http ${req.method} request is not allowed for this API`,
      });
    }
  } finally {
  }
}
