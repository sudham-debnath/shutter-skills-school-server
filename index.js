const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());





//MongoDB
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.apksail.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();


    const classCollection = client.db("classManager").collection("classes");


    // Insert (Create) a class to database
    app.post("/add-class", async (req, res) => {
      const data = req.body;
      console.log(data);
      const result = await classCollection.insertOne(data);
      res.send(result);
    });

    // Get (Read) a class from database
    app.get("/all-classes", async (req, res) => {
      const classes = classCollection.find();
      const result = await classes.toArray();
      res.send(result);
    });



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get("/", (req, res) => {
    res.send("Shutter Skills School Server is running successfully on port 5000");
  });
  
  app.listen(port, () => {
    console.log(`Shutter Skills School Server is running on port : ${port}`);
  });