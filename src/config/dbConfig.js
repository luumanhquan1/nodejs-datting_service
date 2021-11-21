
const mySql=require('mysql');
let connect;
if(process.env.CLEARDB_DATABASE_URL){
    connect= mySql.createConnection(process.env.CLEARDB_DATABASE_URL);
}else{
 connect= mySql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'dattingapp',
});
}
connect.connect(function (err) {
    if(!!err){
      console.log(err);
    }else{
        console.log('connect');
    }
})

module.exports=connect;