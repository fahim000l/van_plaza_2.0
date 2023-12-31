import { connectMongo } from "@/database/config";
import carts from "@/database/models/carts";
import orders from "@/database/models/orders";
import quantities_stock from "@/database/models/quantities_stock";
import { sendMail } from "@/lib/mailer";

export default async function (req, res) {
  try {
    await connectMongo().catch((err) =>
      res.json({ error: "Connection Failed...!" })
    );

    if (req.method === "POST") {
      if (!req.query.tran_id || !req.query.user) {
        return res.status(404).json({ error: "Invalid query" });
      } else {
        const findCart = { user: req.query.user };
        const userCart = await carts.find(findCart);
        let qpResult = [];
        userCart.forEach(async (cart) => {
          const findQp = { _id: cart?.qpId };
          const qpUpdatingDoc = {
            $inc: {
              quantity: -cart?.quantity,
            },
          };
          qpResult.push(
            await quantities_stock.updateMany(findQp, qpUpdatingDoc)
          );
        });
        console.log({ qpResult, length: qpResult?.length });
        console.log({ userCart, length: userCart?.length });
        await carts.deleteMany({ user: req.query.user });
        const findOrder = { transId: req.query.tran_id };
        const updatingDoc = {
          $set: {
            status: "success",
          },
        };

        const result = await orders.updateOne(findOrder, updatingDoc);
        if (result.acknowledged) {
          const mailResult = await sendMail(
            "Order Confirmed",
            req.query.user,
            "<p>Your order has been confirmed</p>"
          );

          return res.redirect(
            `${process.env.NEXT_PUBLIC_PROJECT_URL}payment?transId=${req.query.tran_id}`
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
