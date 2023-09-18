import { client, connectMongo } from "@/database/config";
import invoices from "@/database/models/invoices";
import { ObjectId } from "mongodb";

export default async function (req, res) {
  try {
    connectMongo().catch((err) => res.json({ error: "Connection Failed...!" }));

    if (!req.query.invoiceId) {
      return res.status(404).json({ error: "Invalid query" });
    } else {
      const invoiceById = await invoices.aggregate([
        {
          $match: {
            _id: new ObjectId(req.query.invoiceId),
          },
        },
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
      return res.status(200).json(invoiceById);
    }
  } finally {
  }
}
