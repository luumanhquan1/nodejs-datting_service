
const mySql=require('mysql');
let connect;
connect= mySql.createConnection({
    host:'us-cdbr-east-04.cleardb.com',
    user:'b3ce2acda04ae7',
    password:'76536e54',
    database:'heroku_e712c9993ee96b6',
});
// connect.connect(function (err) {
//     if(!!err){
//       console.log(err);
//     }else{
//         console.log('connect');
//     }
// })

module.exports=connect;