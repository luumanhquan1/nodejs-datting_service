const express=require('express');
const apiRoute=express();
apiRoute.use("/get-user",require('./get_info_user'));

module.exports=apiRoute;