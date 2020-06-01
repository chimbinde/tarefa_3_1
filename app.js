//carregando modulos para usar
const express = require("express");
const path = require("path");
// configuracao para o formulario
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');

const app = express();
const admin = require('./routes/admin');

app.engine('handlebars',handlebars({defaultLayout:'main'}));
app.set('view engine','handlebars'); 
//configuracao de bodyparser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//public folder config
app.use(express.static(path.join(__dirname,"public")));


//rotas nativas
app.get("/",function(req,res){
    res.render('index');
  // HTMLFormControlsCollection.log(__dirname)
  // res.sendFile(__dirname+"/views/index.html");
   // res.sendFile(__dirname+"./index.html");
  // res.send("Seja bem vindo..2");
   // res.send("aleluia");
  });
app.use('/admin',admin);
const PORT = process.env.PORT || 8081;

app.listen(PORT,()=>{
    console.log("servidor rodando:port:8081");
}); 