const { loiBatDinh, baseJson } = require('../config/helper/base_json');
const { decode } = require('../config/helper/jwt_token');
const service = require('../service/user_info_service');
class UserInfoController {
  async getUserInfor(req, res) {
    try {
      const id = req.body.id;
      const json = await service.getInforUser(id);
      res.json(baseJson({ data: json }));
    } catch (err) {
      res.json(loiBatDinh);
    }
  }
  async getListUser(req, res) {
    try {
      const id = decode(req.headers.token).id;
      const result = await service.getListUser(id);
      res.json(baseJson({ data: result }));
    } catch (err) {
      res.json(loiBatDinh);
    }

  }
  async thichUser(req, res) {
    const idNguoiThich = decode(req.headers.token).id;
    const id = req.body.id;
    const trangThai=req.body.trangThai;
   if(trangThai==0){///tym
    const vl = await service.thichUser(id, idNguoiThich);
    if (vl) {
      res.json(baseJson({ mess: ['Thích thành công'] }));
    } else {
      res.json(baseJson({ isSucc: false, data: ['Thích không thành công'] }));
    }
   }else if(trangThai==1){///super like
     res.json(baseJson({isSucc:false,mess:['Tính năng đang phát triển']}));
   }else{
     res.json(loiBatDinh);
   }
  }
 async getTopLike(req,res){
     try{
      const data=await  service.getTopLike();
      res.json(baseJson({data:data}));
     }catch(err){
       res.json(loiBatDinh);
     }
   

  }
}
module.exports = new UserInfoController();
