class Voluntario{
    constructor (){
    }  
    getAll(){
        var fs = require('fs');
        let rawdata = fs.readFileSync('data/voluntarios.json');
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
    delete(id){
        var fs = require('fs');
        let obj =  this.getAll();

        let obj1=[];
        obj.forEach(item => {
            if(item.key!=id) obj1.push(item);
        });
        var data =JSON.stringify(obj1,null,2);
        let u=fs.writeFileSync('data/voluntarios.json', data);
        return 1;

    }
    getVoluntariosHtml(){
        let obj=this.getAll();
        let html="";
        for (let index = 0; index < obj.length; index++) {
            html+=`<tr>
                    <td>`+obj[index].key+`</td>
                    <td>`+obj[index].nome+`</td>
                    <td>`+obj[index].apelido+`</td>              
                    <td>`+obj[index].email+`</td>
                    <td>
                        <a href="/admin/voluntarios/del/`+obj[index].key+`" style="color:black"><i class='fas fa-trash remove'></i></a>
                        <i class='fas fa-edit remove'></i>
                    </td>               
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
   save(nome,apelido, email, senha, tipoConta){

    let obj=this.getAll();
    let key =obj.length-1;
    if(key<0) 
        key =0; 
    else 
        key = obj[key].key+1;
    //console.log(key);
    var json_ ='{"key":'+key+',"nome":"'+nome+'","apelido":"'+apelido+'","email":"'+email+'" ,"senha":"'+senha+'", "tipoConta":'+tipoConta+'}';
    let elem = JSON.parse(json_);
    obj.push(elem);
   // console.log(obj);
    var json_1 =JSON.stringify(obj,null,2);
    var fs = require('fs');
    fs.writeFile('data/voluntarios.json',json_1,function(){
        console.log('Inserido com sucesso..');
    });
}

}
const voluntario= new  Voluntario();
module.exports=voluntario;