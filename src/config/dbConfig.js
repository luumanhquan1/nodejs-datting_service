
const mySql=require('mysql');
let connect;
 connect= mySql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'dattingapp',
});
connect.connect(function (err) {
    if(!!err){
      
    }else{
        console.log('connect');
    }
})

module.exports=connect;