const express=require('express');
const apiRoute=express();
apiRoute.use("/get-user",require('./get_info_user'));
apiRoute.use('/get-list-user',require('./get_list_user'));
apiRoute.use('/thich-user',require('./thich_user'));
apiRoute.use('/get-top-like',require('./get_top_like'));
module.exports=apiRoute;