const { loiBatDinh, baseJson } = require('../config/helper/base_json');
const service=require('../service/user_info_service');
class UserInfoController{
  async  getUserInfor(req,res){
        try{
            const id=req.body.id;
      const json= await service.getInforUser(id);
      res.json(baseJson({data:json}));
        }catch(err){
            res.json(loiBatDinh);
        }
    }
  async getListUser(req,res){
    try{
        const result=await service.getListUser();
        res.json(baseJson({data:result}));
    }catch(err){
        res.json(loiBatDinh);
    }
     
  }
}
module.exports=new UserInfoController();
