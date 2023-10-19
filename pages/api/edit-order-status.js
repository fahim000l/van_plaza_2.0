import { connectMongo } from "@/database/config";
import orders from "@/database/models/orders";
import { sendMail } from "@/lib/mailer";
import { ObjectId } from "mongodb";

export default async function (req, res) {
  try {
    await connectMongo().catch((err) =>
      res.json({ error: "Connection Failed...!" })
    );

    if (req.method === "PUT") {
      if (!req.query.orderId) {
        return res.status(404).json({ error: "Invalid query" });
      } else {
        const query = { _id: new ObjectId(req.query.orderId) };

        const order = await orders.findOne(query);

        let updatingDoc;

        if (order?.status === "success") {
          updatingDoc = {
            $set: {
              status: "delevered",
            },
          };
        } else {
          updatingDoc = {
            $set: {
              status: "success",
            },
          };
        }
        const result = await orders.updateOne(query, updatingDoc);
        console.log(result);

        const mailResult = await sendMail(
          "Order Confirmed",
          order.user,
          "<p>Your order has been delevered</p>"
        );

        return res.status(200).json({ success: true, result });
      }
    } else {
      return res.status(500).json({
        error: `Http ${req.method} request is not allowed for this API`,
      });
    }
  } finally {
  }
}
