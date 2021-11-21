const export_controller = require('./export_controller');
const uuid = require('uuid');
const { baseJson } = require('../config/helper/base_json');

class LoginController {
    async login(req, res) {
        try {
            export_controller.loginService.getUserInfoKMA(req.body.username, req.body.password).then(async (value) => {
                if (value.status === 302) {
                    let result = await export_controller.loginService.isLogin(req.body.username, req.body.password);
                   
                    if (result.length == 0) {
                        var user = new export_controller.User({ id: uuid.v1(), username: value.response.studentCode, hoTen: value.response.name, gioiTinh: value.response.gender, ngaySinh: value.response.birthDay });
                        const accestToken = export_controller.jwtToken.encode({ isSuccess: true, id: user.id });
            
                        let result = await export_controller.loginService.insertInfoUser(user);
                        var json=baseJson({data:user.toJson()});
                        json['isActive']=false;
                        json['token']=accestToken;
                        if (result) {
                            res.json(json);
                        } else {
                            res.json(baseJson({mess:['Lỗi bất định'],isSucc:false}));
                        }

                    } else {
                        var user = new export_controller.User({ id: result[0].id, username: result[0].username, hoTen: result[0].hoTen, gioiTinh: result[0].gender, ngaySinh: result[0].ngaySinh });
                        const accestToken = export_controller.jwtToken.encode({ isSuccess: true, id: user.id });
                        var json = baseJson({ data: user.toJson() });
                        json['token'] = accestToken;
                        json['isActive'] = true;
                        res.json(json);
                    }
                } else {
                    res.json({
                        Message: ['Tên tài khoản hoặc mật khẩu sai'],
                        isSuccess: false,
                        Data: null,
                    });
                }
            }).catch((err) => {
                res.json(err);
            });
        } catch (err) {

            res.json(err);
        }


    }
}
module.exports = new LoginController();