//carregando modulos para usar
const express = require("express");
const flash = require('connect-flash');
const path = require("path");
// configuracao para o formulario
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');

const app = express();
const admin = require('./routes/admin');

const session = require('express-session');
const passport = require("passport");

app.engine('handlebars',handlebars({defaultLayout:'main'}));
app.set('view engine','handlebars'); 
//configuracao de bodyparser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//public folder config
app.use(express.static(path.join(__dirname,"public")));

//configuracao da sessao
app.use(session({
  secret:"trabalhomaster",
  resave:true,
  saveUninitialized:true
}));
app.use(passport.initialize());
app.use(passport.session())
app.use(flash());
//criacao de um midleware
app.use((req,res,next)=>{
    console.log("midle em acao..");
    res.locals.success_msg=req.flash("success_msg");
    res.locals.error_msg=req.flash("error_msg");
    //req.next();
    res.locals.error=req.flash('error');
    res.locals.user=req.user||null;
    next();
}); 


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