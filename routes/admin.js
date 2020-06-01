const express = require("express");
const router = express.Router();
const dados = require('./../model/Data'); 
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
            <tr><th class='w-100 text-center bg-warning' colspan='4'>Lista de Voluntarios</th></tr>
            <tr class='bg-info'>
                <th class='w-2'>#</th>
                <th class='w-50'>Nome</th>
                <th class='w-38'>Apelido</th>              
                <th class='w-10'>Email</th>              
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
            <tr><th class='w-100 text-center bg-warning' colspan='5'>Lista de Voluntarios</th></tr>
            <tr class='bg-info'>
                <th class='w-2'>#</th>
                <th class='w-50'>Nome</th>
                <th class='w-38'>Apelido</th>              
                <th class='w-10'>Email</th>
                <th class='w-10'>AnoInicio</th>               
            </tr> 
            </thead><tbody> `+ post.getMembrosHtml()+ ` </tbody> 
    `; 
    //res.render("admin/membros",{dados:info});
    res.render("admin/membros",{dado:info});


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