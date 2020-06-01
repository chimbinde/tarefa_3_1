class Membro{
    constructor (){
    }  
    getAll(){
        var fs = require('fs');
        let rawdata = fs.readFileSync('data/membros.json');
        let dado = JSON.parse(rawdata);
        return dado;
    }
    
    findEmail(id){
        let obj=this.getAll();
        for (let index = 0; index < obj.length; index++) {
            if(obj[index].email==id) return obj[index];   
        }
        return -1;   
    } 
    getMembrosHtml(){
        let obj=this.getAll();
        let html="";
        for (let index = 0; index < obj.length; index++) {
            html+=`<tr>
                    <td>`+obj[index].key+`</td>
                    <td>`+obj[index].nome+`</td>
                    <td>`+obj[index].apelido+`</td> 
                    <td>`+obj[index].anoInicio+`</td>             
                    <td>`+obj[index].email+`</td>              
                </tr>`;
        }
        return html;
    }
    findId(id){
        let obj=this.getAll();
        for (let index = 0; index < obj.length; index++) {
            if(obj[index].key==id) return obj[index];   
        }
        return 0;
    } 
    /*
    delete(id){
        var fs = require('fs');
        let obj =  this.getAll();

        let obj1=[];
        obj.forEach(item => {
            if(item.key!=id) obj1.push(item);
        });
        var data =JSON.stringify(obj1,null,2);
        let u=fs.writeFileSync('data/db.json', data);
        return 1;

    }
    editar(id,categoria,slug){
        let obj=this.getAll();
        let editado=0;
        for (let index = 0; index < obj.length; index++) {
          //  console.log(obj[index].key+'#'+id);
            if(obj[index].key ==id){
                obj[index].categoria =categoria; 
                obj[index].slug =slug; 
                editado=1;
            }  
        }
    //    console.log(obj);
        var json_1 =JSON.stringify(obj,null,2);
        var fs = require('fs');
        fs.writeFile('data/db.json',json_1,function(){
            console.log('Inserido com sucesso..');
        }); 
        return 1;
    }
    */
    save(nome,apelido, email, senha, tipoConta,anoInicio){

        let obj=this.getAll();
        let key =obj.length-1;
        if(key<0) 
            key =0; 
        else 
            key = obj[key].key+1;
        //console.log(key);
        var json_ ='{"key":'+key+',"nome":"'+nome+'","apelido":"'+apelido+'","email":"'+email+'","anoInicio":"'+anoInicio+'" ,"senha":"'+senha+'", "tipoConta":'+tipoConta+'}';
        let elem = JSON.parse(json_);
        obj.push(elem);
       // console.log(obj);
        var json_1 =JSON.stringify(obj,null,2);
        var fs = require('fs');
        fs.writeFile('data/membros.json',json_1,function(){
            console.log('Inserido com sucesso..');
        });
    }

}
const membro= new  Membro();
module.exports=membro;