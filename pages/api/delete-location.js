import { connectMongo } from "@/database/config";
import locations from "@/database/models/locations";
import { ObjectId } from "mongodb";

export default async function (req, res) {
  try {
    await connectMongo().catch((err) =>
      res.json({ error: "Connection Failed...!" })
    );

    if (req.method === "DELETE") {
      if (!req.query.locationId) {
        return res.status(404).json({ error: "Invalid query" });
      } else {
        const query = { _id: new ObjectId(req.query.locationId) };
        const result = await locations.deleteOne(query);
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
