import { client, connectMongo } from "@/database/config";
import locations from "@/database/models/locations";

export default async function (req, res) {
  try {
    await connectMongo().catch((err) =>
      res.json({ error: "Connection Failed...!" })
    );

    if (req.method === "PUT") {
      if (!req.query.email) {
        return res.status(404).json({ error: "Invalid query" });
      } else {
        if (!req.body) {
          return res.status(404).json({ error: "Invalid Body" });
        } else {
          const findLocation = { user: req.query.email, def: true };
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
