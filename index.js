
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








//console.log("hola ivan");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
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

/*app.get("/", (req, res) => {
    res.send("ivan ngua");
});*/













/******/
const UsrController = require('./Controllers/user');
const AuthController = require('./Controllers/auth');
const Middleware = require('./middleware/auth-middleware');
const MailController = require('./Controllers/mail');


mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected");
  })
  .catch((err) => console.log(err));


app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
 
  res.status(200).json("Hola estoy funcionando.");
});

// GET - POST - DELETE - PUT - PATCH 

//MailController.sendMail();

//Get de todos los usuarios
/*

/*app.post("/",(req,res) => {
    res.send("Llamada post");
});*/

// Get de todos los usuarios

app.get("/users",/*Middleware.verify,*/async (req,res) =>{

  let limit = req.query.limit;
  let offset = req.query.offset;

  try{
      const results = await UsrController.getAllUsers(limit,offset);
      res.status(200).json(results);

  }catch(error){
      res.status(500).send("Error. Intente mÃ¡s tarde.")
  }

});

// Get Info de un usuario

app.get("/users/:id",async (req,res) =>{

    let userId =  req.params.id;

    try{

      user = await UsrController.getUser(userId);

      res.status(200).json(user);

    }catch(error){
      res.status(500).send("Error");
    }

});

// Creo un nuevo usuario

app.post("/users",async (req,res) =>{
    
    let name = req.body.name;
    let lastname = req.body.lastname;
    let email = req.body.email;
    let isActive = req.body.isActive;
    let password = req.body.password;
    try{
      const result = await UsrController.addUser(name,lastname,email,isActive,password);
      if(result){
        res.status(201).send("Usuario creado correctamente"); // 201
      }else{
        res.status(409).send("El usuario ya existe"); // 409
      }  
    }catch(error){
      res.status(500).send("Error al crear el usuario."); //500
    }  
    
});

// Modifico un usuario
app.put("/users/:id",async (req,res) =>{

    const user = { _id: req.params.id, ...req.body };
    //             {_id: req.params.id, name: req.body.name, lastname, email }
    try{
      
      const result = await UsrController.editUser(user);
      if(result){
        res.status(200).json(result);
      }else{
        res.status(404).send("El usuario no existe.");
      }  
    }catch(error){  
      res.status(500).send("Error");
    } 

});

// Elimino un usuario
app.delete("/users/:id", async(req,res) =>{

    try{

      const result = await UsrController.deleteUser(req.params.id);
      if(result){
        res.status(200).send("Usuario borrado.")
      }else{
        res.status(404).send("No se ha podido eliminar el usuario.")
      }  

    }catch(error){
      res.status(500).send("Error")
    }
});

app.put("/users/:id/roles",async (req,res) =>{
    
    const roles = req.body.roles;
    //const user = { _id: req.params.id, ...req.body };
    try{
      
      const result = await UsrController.editRoles(roles,req.params.id);
      if(result){
        res.status(200).json(result);
      }else{
        res.status(404).send("El usuario no existe.");
      }  
    }catch(error){  
      res.status(500).send("Error");
    } 
})

app.post("/auth/login", async (req,res) => {

    const email = req.body.email;
    const password = req.body.password;
    try{
      const result = await AuthController.login(email,password);
      if(result){
        res.status(200).json(result);
      }else{
        res.status(401).send("No puede estar aqui")
      }
    }catch(error){
        res.status(500).send("Error");
    }  
})

/* Manda un mail */
//MailController.sendMail();
/*
http.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
});
*/








http.listen(PORT,()=>(console.log(`SERVIDOR CORRIENDO EN  ${PORT}`)));
