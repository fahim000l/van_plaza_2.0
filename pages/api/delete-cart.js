import { connectMongo } from "@/database/config";
import carts from "@/database/models/carts";
import { ObjectId } from "mongodb";

export default async function (req, res) {
  try {
    await connectMongo().catch((err) =>
      res.json({ error: "Connection Failed...!" })
    );

    if (req.method === "PUT") {
      if (!req.body) {
        return res.status(404).json({ error: "Invalid Body" });
      } else {
        const findCart = {
          user: req.body.user,
          qpId: new ObjectId(req.body.qpId),
        };
        const option = { upsert: true };

        let updatingDoc;

        const isExist = await carts.findOne(findCart);

        if (isExist) {
          updatingDoc = {
            $inc: {
              quantity: -1,
            },
          };
        } else {
          updatingDoc = {
            $set: {
              quantity: req.body.quantity,
            },
          };
        }

        const carted = await carts.updateOne(findCart, updatingDoc, option);

        return res.status(200).json({ success: true, carted });
      }
    } else {
      return res.status(500).json({
        error: `Http ${req.method} request is not allowed for this API`,
      });
    }
  } finally {
  }
}
