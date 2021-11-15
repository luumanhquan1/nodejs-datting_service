
const mySql=require('mysql');
const connect= mySql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    password:'',
    database:'dattingapp'
});
connect.connect(function (err) {
    if(!!err){
        console.log('error');
    }else{
        console.log('connect');
    }
})

module.exports=connect;