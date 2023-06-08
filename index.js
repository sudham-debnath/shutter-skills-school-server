const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());


//shutterSkills
//NsmegCic7w8O6s1K


//MongoDB


const uri = "mongodb+srv://shutterSkills:NsmegCic7w8O6s1K@cluster0.apksail.mongodb.net/?retryWrites=true&w=majority";

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
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);




app.get("/", (req, res) => {
    res.send("Shutter Skills School Server is running successfully on port 5000");
  });
  
  app.listen(port, () => {
    console.log(`Shutter Skills School Server is running on port : ${port}`);
  });