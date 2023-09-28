import { connectMongo } from "@/database/config";
import locations from "@/database/models/locations";
import { ObjectId } from "mongodb";

export default async function (req, res) {
  try {
    await connectMongo().catch((err) =>
      res.json({ error: "Connection Failed...!" })
    );

    if (req.method === "PUT") {
      if (!req.query.locationId) {
        return res.status(404).json({ error: "Invalid query" });
      } else {
        if (!req.body) {
          return res.status(404).json({ error: "Invalid Body" });
        } else {
          const findLocation = { _id: new ObjectId(req.query.locationId) };
          const option = { upsert: true };
          const updatingDoc = {
            $set: {
              Region: req.body?.Region,
              City: req.body?.City,
              Area: req.body?.Area,
              Address: req.body?.Address,
              LandMark: req.body?.LandMark,
            },
          };

          const result = await locations.updateOne(
            findLocation,
            updatingDoc,
            option
          );

          return res.status(200).json({ success: true, result });
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
