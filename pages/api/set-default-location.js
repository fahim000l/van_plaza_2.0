import { connectMongo } from "@/database/config";
import locations from "@/database/models/locations";
import { ObjectId } from "mongodb";

export default async function (req, res) {
  try {
    await connectMongo().catch((err) =>
      res.json({ error: "Connection Failed...!" })
    );

    if (req.method === "PUT") {
      if (!req.query.user || !req.query.locationId) {
        return res.status(404).json({ error: "Invalid query" });
      } else {
        const findDefailtLocation = { user: req.query.user, def: true };
        const findLocation = { _id: new ObjectId(req.query.locationId) };
        const option = { upsert: true };

        const defaultRemovingDoc = {
          $set: {
            def: false,
          },
        };

        const defaultAddingDoc = {
          $set: {
            def: true,
          },
        };

        const result1 = await locations.updateOne(
          findDefailtLocation,
          defaultRemovingDoc,
          option
        );

        const result2 = await locations.updateOne(
          findLocation,
          defaultAddingDoc,
          option
        );

        return res.status(200).json({ success: true, result1, result2 });
      }
    } else {
      return res.status(500).json({
        error: `Http ${req.method} request is not allowed for this API`,
      });
    }
  } finally {
  }
}
