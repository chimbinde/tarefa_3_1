const express = require("express");
const router = express.Router();
const dados = require('./../model/Data'); 
//const {eAdmin} = require("../helpers/eAdmin");

router.get('/',(req,res)=>{
     //res.send("Pagina principal do admin");
     //res.render("admin/index");
     res.render("admin/dashboard");
 });
 router.get('/speakers',(req,res)=>{;
    res.render("admin/speakers");
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