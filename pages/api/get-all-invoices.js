import { client, connectMongo } from "@/database/config";
import invoices from "@/database/models/invoices";

export default async function (req, res) {
  try {
    connectMongo().catch((err) => res.json({ error: "Connection Failed...!" }));
    const allInvoice = await invoices.aggregate([
      {
        $lookup: {
          from: "suppliers",
          localField: "supplierId",
          foreignField: "_id",
          as: "supplier",
        },
      },
      {
        $lookup: {
          from: "products_stocks",
          localField: "_id",
          foreignField: "invoiceId",
          as: "sps_invoice",
          pipeline: [
            {
              $lookup: {
                from: "products",
                localField: "productId",
                foreignField: "_id",
                as: "product",
                pipeline: [
                  {
                    $lookup: {
                      from: "categories",
                      localField: "categoryId",
                      foreignField: "_id",
                      as: "category",
                      pipeline: [
                        {
                          $lookup: {
                            from: "sizes",
                            localField: "_id",
                            foreignField: "categoryId",
                            as: "sizes_category",
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: "quantities_stocks",
          localField: "_id",
          foreignField: "invoiceId",
          as: "qps_invoice",
        },
      },
    ]);
    return res.status(200).json(allInvoice);
  } finally {
  }
}
