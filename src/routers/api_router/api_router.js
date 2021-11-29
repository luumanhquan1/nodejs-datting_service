const express=require('express');
const apiRoute=express();
const epController=require('../export_router_controller');
apiRoute.use(function(req,res,next){
   try{
    const result= epController.jwtToken.decode(req.headers.token);
    if(result.isSuccess){
        next();
    }else{
        res.json({isSuccess:false,isLogin:fasle});
    }
   }catch(err){
    res.json({isSuccess:false,isLogin:fasle});
   }
  
});
apiRoute.use("/so-thich",require("./so_thich_user/so_thich_router"));

apiRoute.use('/user',require("./user_infor/user_router"));


module.exports=apiRoute;