import { connectMongo } from "@/database/config";
import carts from "@/database/models/carts";
import orders from "@/database/models/orders";
import users from "@/database/models/users";
import { ObjectId } from "mongodb";
import SSLCommerzPayment from "sslcommerz-lts";

export default async function (req, res) {
  try {
    await connectMongo().catch((err) =>
      res.json({ error: "Connection Failed...!" })
    );

    if (req.method === "POST") {
      if (!req.body) {
        return res.status(404).json({ error: "Invalid Body" });
      } else {
        const orderInfo = req.body;

        const customer = await users.findOne({ email: orderInfo?.user });

        const orderingCarts = await carts.aggregate([
          {
            $match: { user: orderInfo?.user },
          },
          {
            $lookup: {
              from: "quantities_stocks",
              localField: "qpId",
              foreignField: "_id",
              as: "qps",
              pipeline: [
                {
                  $lookup: {
                    from: "products_stocks",
                    localField: "psId",
                    foreignField: "_id",
                    as: "sps",
                  },
                },
              ],
            },
          },
        ]);

        const totalPrice = () => {
          return orderingCarts?.reduce((total, cart) => {
            return (
              total +
              parseFloat(cart?.qps?.[0]?.sps?.[0]?.sellPrice) *
                parseInt(cart?.quantity)
            );
          }, 0);
        };

        const transId = new ObjectId().toString();

        const data = {
          total_amount:
            parseFloat(totalPrice()) + parseFloat(orderInfo?.deleveryFee),
          currency: "BDT",
          tran_id: transId, // use unique tran_id for each api call
          success_url: `${process.env.PROJECT_URL}payment/success?tran_id=${transId}`,
          fail_url: `${process.env.PROJECT_URL}payment/fail`,
          cancel_url: `${process.env.PROJECT_URL}payment/cancel`,
          ipn_url: "http://localhost:3030/ipn",
          shipping_method: "Courier",
          product_name: "Computer.",
          product_category: "Electronic",
          product_profile: "general",
          cus_name: customer?.userName,
          cus_email: customer?.email,
          cus_add1: orderInfo?.location?.Address?.address,
          cus_add2: orderInfo?.location?.Address?.address,
          cus_city: "Chittagong",
          cus_state: "Chittagong",
          cus_postcode: "4100",
          cus_country: "Bangladesh",
          cus_phone: customer?.phone,
          cus_fax: "01711111111",
          ship_name: "Going Merry",
          ship_add1: "Dhaka",
          ship_add2: "Dhaka",
          ship_city: "Dhaka",
          ship_state: "Dhaka",
          ship_postcode: 1000,
          ship_country: "Bangladesh",
        };

        const sslcz = new SSLCommerzPayment(
          process.env.NEXT_PUBLIC_SSL_COMMERZ_STORE_ID,
          process.env.NEXT_PUBLIC_SSL_COMMERZ_STORE_PASSWORD,
          false
        );

        sslcz.init(data).then(async (apiResponse) => {
          let GatewayUrl = apiResponse?.GatewayPageURL;
          const qpIds = [];
          orderingCarts?.forEach((cart) => {
            qpIds?.push(cart?.qps?.[0]?._id);
          });

          const orderData = {
            user: customer?.email,
            qpIds: qpIds,
            location: orderInfo?.location,
            status: "initiated",
            deleveryFee: orderInfo?.deleveryFee,
            transId: transId,
          };

          const result = await orders.create(orderData);

          if (result?._id) {
          }

          return res.status(200).json({ data, GatewayUrl, orderData, result });
        });
      }
    } else {
      return res.status(500).json({
        error: `Http ${req.method} request is not allowed for this API`,
      });
    }
  } finally {
  }
}
