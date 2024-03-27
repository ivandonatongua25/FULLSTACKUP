
/*
http.createServer(function(req, res) {
    console.log("Servidor Levantado");
    res.writeHead(200,{'Content-Type': 'application'});
    res.write('hola donato');
    res.end();
}).listen(port);
*/
//const http =require("http");


//http.listen(port,()=>{
   // console.log("server listening on port", port );
    
//});








console.log("hola ivan");
const express = require("express");
const app = express();
require("dotenv").config(); 
const PORT = process.env.PORT || 3001;
 
const http = require("http").createServer(app);

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://inzenosa:r38BN1993yGHawaf@cluster0.gl9eu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
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
    res.send("hola ngua");
});













http.listen(PORT,()=>(console.log(`SERVIDOR CORRIENDO EN  ${PORT}`)));