class Data{
    constructor (){
        this.urlBase = "https://fcawebbook.herokuapp.com";
        this.path_partic='/conferences/1/participants';
        this.path_speak='/conferences/1/speakers';
        this.data="";
        //https://fcawebbook.herokuapp.com/conferences/1/participants
    }
    getSpeakers(){
        var strHtml="";
         let url = this.urlBase+''+this.path_speak;
         const request = require("request");
         request({
             url:url,
             json:true
         },(err, response,body)=>{
             let valores =body;// JSON.parse(body);
             for (let index = 0; index < valores.length; index++) {
              
               strHtml+= `<tr>
                                <td>`+index+`</td>
                                <td>`+valores[index].nome+`</td>
                                <td>`+valores[index].cargo+`</td>
                                <td>
                                    <i id='`+valores[index].idSpeaker+`' class='fas fa-edit edit'></i>
                                    <i id='`+valores[index].idSpeaker+`' class='fas fa-trash-alt remove'></i>
                                </td>
                            </tr>`; 
             }
             this.data=strHtml;
         });
         return this.data;

    }
    getAll(){
        var strHtml="";
       // var url = "https://fcawebbook.herokuapp.com/conferences/1/participants";
        let url = this.urlBase+''+this.path_partic;
        const request = require("request");
        request({
            url:url,
            json:true
        },(err, response,body)=>{
            let valores =body;// JSON.parse(body);
            for (let index = 0; index < valores.length; index++) {
              //  console.log(JSON.stringify(valores[index],undefined,4));
                strHtml+=`<tr>
                                <td>`+index+`</td>
                                <td>`+valores[index].idParticipant+`</td>
                                <td>`+valores[index].nomeParticipante+`</td>
                                <td><i id='gdhg' class='fas fa-trash-alt remove'></i></td>
                            </tr>`;
            }
            //console.log(strHtml+'*');
            this.data=strHtml;
           // console.log(JSON.stringify(body,undefined,4));
        });
        
      //  return;
        return this.data;
       
    }
}
const dados= new  Data();
module.exports=dados;