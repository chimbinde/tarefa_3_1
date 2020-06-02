const express = require("express");
const router = express.Router();
const dados = require('./../model/Data'); 
const bcrypt = require("bcryptjs");
//const {eAdmin} = require("../helpers/eAdmin");

router.get('/',(req,res)=>{
     //res.send("Pagina principal do admin");
     //res.render("admin/index");
     res.render("admin/dashboard");
 });
 router.get('/voluntarios',(req,res)=>{ 
    const post = require('./../model/Voluntario');
    let info = `
        <thead >
            <tr><th class='w-100 text-center bg-warning' colspan='5'>Lista de Voluntarios</th></tr>
            <tr class='bg-info'>
                <th class='w-2'>#</th>
                <th class='w-50'>Nome</th>
                <th class='w-38'>Apelido</th>              
                <th class='w-10'>Email</th>  
                <th class='w-10'>Ações</th>            
            </tr> 
            </thead><tbody> `+ post.getVoluntariosHtml()+ ` </tbody> 
    `;
    res.render("admin/voluntarios",{dado:info});
});
router.get('/membros',(req,res)=>{
    //res.render("admin/membros");
    const post = require('./../model/Membro');
   
    let info = `
        <thead >
            <tr><th class='w-100 text-center bg-warning' colspan='6'>Lista de Voluntarios</th></tr>
            <tr class='bg-info'>
                <th class='w-2'>#</th>
                <th class='w-50'>Nome</th>
                <th class='w-38'>Apelido</th>              
                <th class='w-10'>Email</th>
                <th class='w-10'>AnoInicio</th>
                <th class='w-10'>Ações</th>
            </tr> 
            </thead><tbody> `+ post.getMembrosHtml()+ ` </tbody> 
    `; 
    //res.render("admin/membros",{dados:info});
    res.render("admin/membros",{dado:info});


});

router.post('/voluntarios/criar',(req,res)=>{
    let nome = req.body.nome;
    let apelido = req.body.apelido;
    let email = req.body.email;
    let anoInicio = req.body.anoInicio;
    let password = req.body.password;
    let confPassword = req.body.confPassword;

  //  console.log(nome);
    let erros=[];
    if(nome=="" || typeof nome==undefined || nome==null){
        erros.push({texto:"nome invalido.."});
    }
    if(apelido=="" || typeof apelido==undefined || apelido==null){
        erros.push({texto:"apelido invalido.."});
    }

    if(!email || typeof email==undefined || email==null){
        erros.push({texto:"email invalido.."});
    }
    if(!password || typeof password==undefined || password==null){
        erros.push({texto:"password invalida.."});
    }
    if(!confPassword || typeof confPassword==undefined || confPassword==null){
        erros.push({texto:"conf password invalida.."});
    }
    if(confPassword !== password){
        erros.push({texto:"palavras diferentes."});
    }
    let senha = password;
    let tipoConta = 0;

 
    if(erros.length>0){
        alert("Dados com problemas");
       // return;
        res.render("admin/voluntarios",{erros:erros});
      //  console.log("@"+erros.length);
    }else {
 
        bcrypt.genSalt(10,(erro,salt)=>{
            bcrypt.hash(senha,salt,(erro,hash)=>{
                if(erro){
                    req.flash("error_msg","erro ao salvar");
                    req.redirect("/admin/voluntarios");
                }
                senha= hash; 
                const post = require('./../model/Voluntario');

                post.save(nome,apelido, email, senha, tipoConta);
                req.flash("success_msg","Inserido com sucesso..");
                res.redirect("/admin/voluntarios");
            });
    
        }); 


    }  

});

router.post('/membros/criar',(req,res)=>{
    let nome = req.body.nome;
    let apelido = req.body.apelido;
    let email = req.body.email;
    let anoInicio = req.body.anoInicio;
    let password = req.body.password;
    let confPassword = req.body.confPassword;

  //  console.log(nome);
    let erros=[];
    if(nome=="" || typeof nome==undefined || nome==null){
        erros.push({texto:"nome invalido.."});
    }
    if(apelido=="" || typeof apelido==undefined || apelido==null){
        erros.push({texto:"apelido invalido.."});
    }

    if(!email || typeof email==undefined || email==null){
        erros.push({texto:"email invalido.."});
    }
    if(!anoInicio || typeof anoInicio==undefined || anoInicio==null){
        erros.push({texto:"ano invalido.."});
    }
    if(!password || typeof password==undefined || password==null){
        erros.push({texto:"password invalida.."});
    }
    if(!confPassword || typeof confPassword==undefined || confPassword==null){
        erros.push({texto:"conf password invalida.."});
    }
    if(confPassword !== password){
        erros.push({texto:"palavras diferentes."});
    }
    let senha = password;
    let tipoConta = 1;
  
    if(erros.length>0){
        alert("Dados com problemas");
       // return;
        res.render("admin/membros",{erros:erros});
      //  console.log("@"+erros.length);
    }else {
 
        bcrypt.genSalt(10,(erro,salt)=>{
            bcrypt.hash(senha,salt,(erro,hash)=>{
                if(erro){
                    req.flash("error_msg","erro ao salvar");
                    req.redirect("/admin/membros");
                }
                senha= hash; 
                //console.log(hash);
               // post.save(nome, email, senha, admin);
                const post = require('./../model/Membro');

               // console.log(nome+'-'+apelido+'-'+ email+'-'+ senha+'-'+tipoConta+'-'+anoInicio);
                post.save(nome,apelido, email, senha, tipoConta,anoInicio);
                req.flash("success_msg","Inserido com sucesso..");
                res.redirect("/admin/membros");
            });
    
        }); 
    }  
});
router.get('/membros/del/:id',(req,res)=>{
   // console.log("ok ok ok"+req.params.id);
    const post = require('./../model/Membro');
    let id=req.params.id;
    console.log(">>"+id+">>")
    if(post.findId(id)!=-1) {
        
        post.delete(id);
        req.flash("success_msg","Eliminado com sucesso..");
       //console.log("aqui bro..@"+id);
    }  
    else {
        req.flash("error_msg","Nao localizou o elemento");
       // console.log("aqui bro..@@"+id);
    }
    let info = `
        <thead >
            <tr><th class='w-100 text-center bg-warning' colspan='6'>Lista de Voluntarios</th></tr>
            <tr class='bg-info'>
                <th class='w-2'>#</th>
                <th class='w-50'>Nome</th>
                <th class='w-38'>Apelido</th>              
                <th class='w-10'>Email</th>
                <th class='w-10'>AnoInicio</th>
                <th class='w-10'>Ações</th>
            </tr> 
            </thead><tbody> `+ post.getMembrosHtml()+ ` </tbody> 
    `; 
    res.render("admin/membros",{dado:info});
});

router.get('/voluntarios/del/:id',(req,res)=>{
    // console.log("ok ok ok"+req.params.id);
     const post = require('./../model/Voluntario');
     let id=req.params.id;
     if(post.findId(id)!=-1) {
         
         post.delete(id);
         req.flash("success_msg","Eliminado com sucesso..");
        //console.log("aqui bro..@"+id);
     }  
     else {
         req.flash("error_msg","Nao localizou o elemento");
        // console.log("aqui bro..@@"+id);
     }
     let info = `
     <thead >
                <tr><th class='w-100 text-center bg-warning' colspan='5'>Lista de Voluntarios</th></tr>
                <tr class='bg-info'>
                    <th class='w-2'>#</th>
                    <th class='w-50'>Nome</th>
                    <th class='w-38'>Apelido</th>              
                    <th class='w-10'>Email</th>  
                    <th class='w-10'>Ações</th>            
                </tr> 
                </thead><tbody> `+ post.getVoluntariosHtml()+ ` </tbody> 
        `;
        res.render("admin/voluntarios",{dado:info}); 

 });



 router.get('/speakers',(req,res)=>{
    let part = `
    <thead >
        <tr><th class='w-100 text-center bg-warning' colspan='4'>Lista de Oradores</th></tr>
        <tr class='bg-info'>
            <th class='w-2'>#</th>
            <th class='w-50'>Nome</th>
            <th class='w-38'>Cargo</th>              
            <th class='w-10'>Foto</th>              
        </tr> 
        </thead><tbody> `+ dados.getSpeakers()+ ` </tbody> 
`
    res.render("admin/speakers",{part:part});
});
router.get('/participants',(req,res)=>{  
    let part=`
            <thead>
                <tr><th class='w-100 text-center bg-warning' colspan='4'>Lista de Participantes</th></tr>
                <tr class='bg-info'>
                    <th class='w-2'>#</th>
                    <th class='w-50'>Nome</th>
                    <th class='w-38'>E-mail</th>              
                    <th class='w-10'>Ações</th>              
                </tr> 
            </thead><tbody> `+ dados.getAll()+ ` </tbody> `;

    res.render("admin/participants",{part:part});
});

 module.exports = router;