
const mySql=require('mysql');
const connect= mySql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'dattingapp',
    port:"3306"
});
connect.connect(function (err) {
    if(!!err){
        console.log(err);
    }else{
        console.log('connect');
    }
})

module.exports=connect;