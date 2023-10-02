import { connectMongo } from "@/database/config";
import carts from "@/database/models/carts";
import ordered_stocks from "@/database/models/ordered_stocks";
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
          success_url: `${process.env.PROJECT_URL}api/payment-success?tran_id=${transId}`,
          fail_url: `${process.env.PROJECT_URL}api/payment-fail`,
          cancel_url: `${process.env.PROJECT_URL}api/payment-cancel`,
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
          const orderedStocksData = [];

          const orderData = {
            user: customer?.email,
            location: orderInfo?.location,
            status: "initiated",
            deleveryFee: orderInfo?.deleveryFee,
            transId: transId,
            date: `${new Date().getDate()}-${
              new Date().getMonth() + 1
            }-${new Date().getFullYear()}`,
          };

          const result = await orders.create(orderData);

          if (result?._id) {
            orderingCarts?.forEach((cart) => {
              orderedStocksData?.push({
                qpId: cart?.qps?.[0]?._id,
                categoryId: cart?.qps?.[0]?.categoryId,
                transId,
                orderId: result?._id,
                quantity: cart?.quantity,
              });
            });

            const result2 = await ordered_stocks.insertMany(orderedStocksData);

            if (result2?.length > 0) {
              return res.status(200).json({ url: GatewayUrl });
            }
          }
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
