const export_controller = require('./export_controller');
const uuid = require('uuid');
export_controller.dotenv.config();
class LoginController {
    async login(req, res) {
        try {
            export_controller.loginService.getUserInfoKMA(req.body.username, req.body.password).then(async (value) => {

                if (value.status === 302) {
                    let result = await export_controller.loginService.isLogin(req.body.username, req.body.password);
                    if (result.length == 0) {
                        var user = new export_controller.User({ id: uuid.v1(), username: value.response.studentCode, hoTen: value.response.name, gioiTinh: value.response.gender, ngaySinh: value.response.birthDay });
                        const accestToken = export_controller.jwt.sign({ isSuccess: true,id:user.id }, process.env.ACCESS_TOKEN_SECRET);
                        let result = await export_controller.loginService.insertInfoUser(user);
                        res.json({
                            Message: [],
                            isSuccess: true,
                            Data: user.toJson(),
                            token: accestToken,
                            isActive: false
                        });
                    } else {
                        var user = new export_controller.User({ id: result[0].id, username: result[0].username, hoTen: result[0].hoTen, gioiTinh: result[0].gender, ngaySinh: result[0].ngaySinh });
                        const accestToken = export_controller.jwt.sign({ isSuccess: true ,id:user.id}, process.env.ACCESS_TOKEN_SECRET);
                        console.log(result.id);
                        res.json({
                            Message: [],
                            isSuccess: true,
                            Data: user.toJson(),
                            token: accestToken
                        })
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