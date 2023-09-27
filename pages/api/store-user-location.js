import { client, connectMongo } from "@/database/config";

export default async function (req, res) {
  try {
    await connectMongo().catch((err) =>
      res.json({ error: "Connection Failed...!" })
    );
    await client.connect();

    const usersCollection = client.db("van_plaza").collection("users");

    if (req.method === "PUT") {
      if (!req.query.email) {
        return res.status(404).json({ error: "Invalid query" });
      } else {
        if (!req.body) {
          return res.status(404).json({ error: "Invalid Body" });
        } else {
          const findUser = { email: req.query.email };
          const option = { upsert: true };

          const updatingDoc = {
            $push: {
              location: req.body,
            },
          };

          const result = await usersCollection?.updateOne(
            findUser,
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
