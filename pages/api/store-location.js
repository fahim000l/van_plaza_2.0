import { connectMongo } from "@/database/config";
import locations from "@/database/models/locations";

export default async function (req, res) {
  try {
    await connectMongo().catch((err) =>
      res.json({ error: "Connection Failed...!" })
    );

    if (req.method === "POST") {
      if (!req.query.user) {
        return res.status(404).json({ error: "Invalid query" });
      } else {
        if (!req.body) {
          return res.status(404).json({ error: "Invalid Body" });
        } else {
          let locationInfo = req.body;
          locationInfo["user"] = req.query.user;
          const result = await locations.create(locationInfo);
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
