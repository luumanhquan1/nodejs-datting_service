
const { baseJson, loiBatDinh } = require('../config/helper/base_json');
const { jwtToken } = require('../routers/export_router_controller');
const ep = require('./export_controller');
class SoThichController {
    async getAllSoThich(req, res) {
        const reuslt = await ep.soThichService.getAllSoThich();
        if (reuslt == false) {
            res.json(loiBatDinh);
        } else {
            var json = baseJson({ data: reuslt });
            res.json(json);
        }
    }
    async updateSoThichController(req, res) {
        const id = jwtToken.decode(req.headers.token).id;

        const listIdSoThich = req.body.soThichIds;
        const  del=await ep.soThichService.deleteAllSoThichUser(id);
        if(!del){
            res.json(loiBatDinh);
        }
        const result = await ep.soThichService.insertSoThichUser(id, listIdSoThich);
        if (result===false) res.json(loiBatDinh);
        res.json(baseJson({ data: null, mess: ['Thêm thành công'], isSucc: true }));
    }
   async getSoThichUser(req,res){
        const id = jwtToken.decode(req.headers.token).id;
     try{
       let vl= await  ep.soThichService.getSoThichUser(id);
       res.json(baseJson({data:vl,isSucc:true}));
     }catch(err){
         res.json(loiBatDinh);
     }
    }
}
module.exports = new SoThichController();
