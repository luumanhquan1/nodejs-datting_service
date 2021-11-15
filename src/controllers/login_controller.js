const export_controller = require('./export_controller');
const apiConst = require('../config/helper/api_constance');
export_controller.dotenv.config();
class LoginController {
    async login(req, res) {
        try {
            export_controller.loginService.getUserInfoKMA("1","2");
            let result = await export_controller.loginService.isLogin(req.body.username, req.body.password);
            if (result.length == 0) {
                res.json({
                    Message: ['Tên tài khoản hoặc mật khẩu sai'],
                    isSuccess: false,
                    Data: null,
                    token: ''
                });
            } else {
                var data = result.at(0);
                var user = new export_controller.User({ id: "12312", gioiTinh: "Nam", ngaySinh: "04/04/2001", lop: "AT160543" });
                const accestToken = export_controller.jwt.sign(user.toJson(), process.env.ACCESS_TOKEN_SECRET);

                res.json({
                    Message: [],
                    isSuccess: true,
                    Data: user.toJson(),
                    token: accestToken
                })
            }
        } catch (err) {
            console.log(err);
            res.send(err);
        }


    }
}
module.exports = new LoginController();