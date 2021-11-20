const express=require('express');
const apiRoute=express();
apiRoute.use("/get-all-so-thich",require('./get_so_thich'));
module.exports=apiRoute;