const db = require('../config/dbConfig');
const util = require('util');
const { soThichService } = require('../controllers/export_controller');
const query = util.promisify(db.query).bind(db);
class UserInforSerivce {
    async getInforUser(id) {
        try {
            var json = {};
            const infor = await query('SELECT * FROM userinfor WHERE id=?', [id]);
            for (var vl of infor) {
                json['id'] = vl.id;
                json['msv'] = vl.username;
                json['hoTen'] = vl.hoTen;
                json['gender'] = vl.gender;
                json['ngaySinh'] = vl.ngaySinh;
                json['age'] = this.#getAge(vl.ngaySinh);
            }
            var listAnhJs = [];
            const listAnh = await query('SELECT * FROM listanh WHERE id =?', [id]);
            for (var vl of listAnh) {
                listAnhJs.push({ idImg: vl.idImg, url: vl.url });
            }
            json['listImg'] = listAnhJs;
            const listSoThich = await soThichService.getSoThichUser(id);
            json['listSoThich'] = listSoThich;
            json['anhDaiDien'] = listAnhJs[0];
            return json;
        } catch (err) {
            throw err;
        }
    }
    async getListUser(id) {
        try {
            var listUser = [];
            const rows = await query('SELECT * from userinfor  WHERE id in (SELECT id FROM listanh) AND id !=? ORDER BY RAND() LIMIT 10', [id]);
            for (var vl of rows) {
                var json = {};
                json['id'] = vl.id;
                json['msv'] = vl.username;
                json['hoTen'] = vl.hoTen;

                json['gender'] = vl.gender;
                json['ngaySinh'] = vl.ngaySinh;
                json['age'] = this.#getAge(vl.ngaySinh);
                var listAnhJs = [];
                const listAnh = await query('SELECT idImg,url  FROM listanh WHERE id =? LIMIT 6', [vl.id]);
                for (var vl of listAnh) {
                    listAnhJs.push({ idImg: vl.idImg, url: vl.url });
                }
                json['listImg'] = listAnhJs;
                listUser.push(json);
            }
            return listUser;
        } catch (err) {
            throw err;
        }
    }
    async thichUser(id, idNguoiThich) {
        try {
            const length=await query('SELECT * FROM userlike');
            const likeTonTai = await query('SELECT * FROM userlike WHERE id=? AND idNguoiThich=?', [id, idNguoiThich]);
            console.log(likeTonTai);
            if (likeTonTai.length == 0 || length==0) {
                await query("INSERT INTO userlike(id,idNguoiThich) VALUES (?,?)", [id, idNguoiThich]);
                return true;
            } else {
                return false
            }
        } catch (err) {
            return false;
        }
    }
   async getTopLike(){
    try{
        var listTop=[];
        const rows=await query("SELECT * FROM userinfor JOIN(SELECT id,COUNT(id) as 'SoLuong' FROM `userlike` GROUP BY(id)  ORDER BY SoLuong DESC)a on userinfor.id=a.id");
    
        for(var vl of rows){
            const anhDaiDien=await query("SELECT url FROM listanh WHERE id=? LIMIT 1",[vl.id]);
           listTop.push({
               id:vl.id,
               username:vl.username,
               hoTen:vl.hoTen,
               gender:vl.gender,
               ngaySinh:vl.ngaySinh,
               age : this.#getAge(vl.ngaySinh),
               imgUrl:anhDaiDien.length==0?'':anhDaiDien[0].url
           });
        }
       return listTop;
    }catch(err){
       throw err;
    }
    }
    #getAge(ngaySinh) {
        var namSinh = ngaySinh.split('/')[2];
        var now = Date.now();
        var nowYear = new Date(now).getFullYear();
        return nowYear - namSinh;
    }
}
module.exports = new UserInforSerivce();