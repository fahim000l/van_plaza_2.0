const { MongoClient, ServerApiVersion } = require("mongodb");
// const uri = `${process.env.DB_URL}`;
const uri = `mongodb+srv://van_plaza:4Xuaydh7a4UZJTeh@pluggedin.lv6yqjw.mongodb.net`;
console.log(uri);

// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connectMongo = async () => {
  try {
    // // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // // Send a ping to confirm a successful connection
    // await client.db("van_plaza").command({ ping: 1 });
    // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!"
    // );

    await client.connect();
    console.log("Connected to the local server");
  } finally {
    // Ensures that the client will close when you finish/error
  }
};

export { connectMongo, client };
