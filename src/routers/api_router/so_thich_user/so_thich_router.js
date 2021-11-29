const express=require('express');
const apiRoute=express();
apiRoute.use("/get-all-so-thich",require('./get_so_thich'));
apiRoute.use("/update-so-thich",require('./update_so_thich_user'));
apiRoute.use("/get-so-thich-user",require('./get_so_thich_user'))
module.exports=apiRoute;