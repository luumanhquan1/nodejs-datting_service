const express=require('express');
const apiRoute=express();

const loginRoute=require("./login_router");
apiRoute.use("/login",loginRoute);



module.exports=apiRoute;