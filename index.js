
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



app.get("/", (req, res) => {
    res.send("hola ngua");
});













http.listen(PORT,()=>(console.log(`SERVIDOR CORRIENDO EN  ${PORT}`)));