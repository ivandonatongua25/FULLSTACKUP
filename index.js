
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
/****/
//const { MongoClient, ServerApiVersion } = require('mongodb');
//const uri = "mongodb+srv://inzenosa:r38BN1993yGHawaf@cluster0.gl9eu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
//const client = new MongoClient(uri, {
  //serverApi: {
    //version: ServerApiVersion.v1,
    //strict: true,
    //deprecationErrors: true,
  //}
//});
//async function run() {
  //try {
    // Connect the client to the server	(optional starting in v4.7)
    //await client.connect();
    // Send a ping to confirm a successful connection
    //await client.db("admin").command({ ping: 1 });
    //console.log("Pinged your deployment. You successfully connected to MongoDB!");
  //} finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  //}
//}
//run().catch(console.dir);

/*app.get("/", (req, res) => {
    res.send("ivan ngua");
});*/





const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://alumno:alumno@cluster0.9mzi5k6.mongodb.net/?retryWrites=true&w=majority";
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
    console.log("saludos de nuevo ivan!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);






/***Controladores de User***/
const UsrController = require('./Controllers/user');
const AuthController = require('./Controllers/auth');
const Middleware = require('./middleware/auth-middleware');
const MailController = require('./Controllers/mail');

/***Controladores de Peluche */
const PeluController = require('./Controllers/peluche');
/***Controladores de Conejo */
const ConeController = require('./Controllers/conejo');



mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected");
  })
  .catch((err) => console.log(err));


app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
 
  res.status(200).json("Hola Bienvenido de Nuevo Ivan Donato.");
});

// GET - POST - DELETE - PUT - PATCH 





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

///Las rutas de peluche

// Get Info de un Peluche

app.get("/peluches/:id",async (req,res) =>{

  let pelucheId =  req.params.id;

  try{

    pelu = await PeluController.getPeluche(pelucheId);

    res.status(200).json(pelu);

  }catch(error){
    res.status(500).send("Error");
  }

});



// Get de todos los peluches

app.get("/peluches",/*Middleware.verify,*/async (req,res) =>{

  let limit = req.query.limit;
  let offset = req.query.offset;

  try{
      const results = await PeluController.getAllPeluches(limit,offset);
      res.status(200).json(results);

  }catch(error){
      res.status(500).send("Error. Intente mÃ¡s tarde.")
  }

});


// Creo un nuevo Peluche

app.post("/peluches",async (req,res) =>{
    
  let animal = req.body.animal;
  let nombre = req.body.nombre;
  let color = req.body.color;
  let accesorio = req.body.accesorio;
  try{
    const result = await PeluController.addPeluche(animal,nombre,color,accesorio);
    if(result){
      res.status(201).send("Peluche creado correctamente"); // 201
    }else{
      res.status(409).send("El peluche ya existe"); // 409
    }  
  }catch(error){
    res.status(500).send("Error al crear Peluches."); //500
  }  
  
});



app.put("/peluches/:id",async (req,res) =>{

  const peluch = { _id: req.params.id, ...req.body };
  //             {_id: req.params.id, name: req.body.name, lastname, email }
  try{
    
    const result = await PeluController.editPeluche(peluch);
    if(result){
      res.status(200).json(result);
    }else{
      res.status(404).send("El peluche no existe.");
    }  
  }catch(error){  
    res.status(500).send("Error Algo salio mal");
  } 

});



app.delete("/peluches/:id", async(req,res) =>{

  try{

    const result = await PeluController.deletePeluche(req.params.id);
    if(result){
      res.status(200).send("Peluche borrado.")
    }else{
      res.status(404).send("No se ha podido eliminar el peluche.")
    }  

  }catch(error){
    res.status(500).send("Error algo salio mal")
  }
});




///Las rutas del conejo

// Get Info de un Conejo





// Get de todos los Conejos

app.get("/conejos",/*Middleware.verify,*/async (req,res) =>{

  let limit = req.query.limit;
  let offset = req.query.offset;

  try{
      const results = await ConeController.getAllConejos(limit,offset);
      res.status(200).json(results);

  }catch(error){
      res.status(500).send("Error. Intente mÃ¡s tarde.")
  }

});


// Creo un nuevo Conejo

app.post("/conejos",async (req,res) =>{
    
  let animal = req.body.animal;
  let nombre = req.body.nombre;
  let color = req.body.color;

  let accesorio = req.body.accesorio;
  try{
    const result = await ConeController.addConejo(animal,nombre,color,accesorio);
    if(result){
      res.status(201).send("Conejo creado correctamente"); // 201
    }else{
      res.status(409).send("El Conejo ya existe"); // 409
    }  
  }catch(error){
    res.status(500).send("Error al crear Conejo."); //500
  }  
  
});


app.get("/conejos/:id",async (req,res) =>{

  let conejoId =  req.params.id;

  try{

    cone = await ConeController.getConejo(conejoId);

    res.status(200).json(cone);

  }catch(error){
    res.status(500).send("Error");
  }

});

//editar conejo

app.put("/conejos/:id",async (req,res) =>{

  const conej = { _id: req.params.id, ...req.body };
  //             {_id: req.params.id, name: req.body.name, lastname, email }
  try{
    
    const result = await ConeController.editConejo(conej);
    if(result){
      res.status(200).json(result);
    }else{
      res.status(404).send("El Conejo no existe.");
    }  
  }catch(error){  
    res.status(500).send("Error Algo salio mal");
  } 

});



app.delete("/conejos/:id", async(req,res) =>{

  try{

    const result = await ConeController.deleteConejo(req.params.id);
    if(result){
      res.status(200).send("Conejo  borrado.")
    }else{
      res.status(404).send("No se ha podido eliminar el conejo.")
    }  

  }catch(error){
    res.status(500).send("Error algo salio mal")
  }
});

//MailController.sendMail();


























http.listen(PORT,()=>(console.log(`SERVIDOR CORRIENDO EN  ${PORT}`)));