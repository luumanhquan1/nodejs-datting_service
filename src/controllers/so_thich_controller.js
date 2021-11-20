
const  {baseJson, loiBatDinh}  = require('../config/helper/base_json');
const ep=require('./export_controller');
class SoThichController{
   async getAllSoThich(req,res){
         const reuslt=await ep.soThichService.getAllSoThich(); 
        if(reuslt==false){
                res.json(loiBatDinh);
        }else{
            var json=baseJson({data:reuslt});
            res.json(json);
        }
    }
}
module.exports=new SoThichController();
