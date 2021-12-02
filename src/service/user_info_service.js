const db = require('../config/dbConfig');
const util = require('util');
const { soThichService } = require('../controllers/export_controller');
const query = util.promisify(db.query).bind(db);
class UserInforSerivce {
     async getInforUser(id){
        try{
            var json={};
            const  infor=await query('SELECT * FROM userinfor WHERE id=?',[id]);
            for(var vl of infor){
             json['id']=vl.id;
             json['msv']=vl.username;
             json['hoTen']=vl.hoTen;
             json['gender']=vl.gender;
             json['ngaySinh']=vl.ngaySinh;
             json['age']=this.#getAge(vl.ngaySinh);
            }
            var listAnhJs=[];
            const listAnh=await query('SELECT * FROM listanh WHERE id =?',[id]);
           for(var vl of listAnh){
               listAnhJs.push({idImg:vl.idImg,url:vl.url});
           }
           json['listImg']=listAnhJs;
            const listSoThich=await soThichService.getSoThichUser(id);
            json['listSoThich']=listSoThich;
            json['anhDaiDien']=listAnhJs[0];
         return json;
        }catch(err){
            throw err;
        }
      }
     async getListUser(){
      try{
        var listUser=[];
        const rows=await query('SELECT * from userinfor  WHERE id in (SELECT id FROM listanh) ORDER BY RAND() LIMIT 10');
        for(var vl of rows){
          var json={};
          json['id']=vl.id;
          json['msv']=vl.username;
          json['hoTen']=vl.hoTen;

          json['gender']=vl.gender;
          json['ngaySinh']=vl.ngaySinh;
          json['age']=this.#getAge(vl.ngaySinh);
          var listAnhJs=[];
          const listAnh=await query('SELECT idImg,url  FROM listanh WHERE id =? LIMIT 6',[vl.id]);
          for(var vl of listAnh){
              listAnhJs.push({idImg:vl.idImg,url:vl.url});
          }
          json['listImg']=listAnhJs;
         listUser.push(json);
        }
     return listUser;
      }catch(err){
          throw err;
      }
      }
      #getAge(ngaySinh){
          var namSinh=ngaySinh.split('/')[2];
          var now=Date.now();
          var nowYear=new Date(now).getFullYear();
             return nowYear-namSinh;
      }
}
module.exports=new UserInforSerivce();