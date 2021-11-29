const db = require('../config/dbConfig');
const ApiClient = require('../BusinessLayer/api_client');
const util = require('util');
const cheerio = require('cheerio');

const query = util.promisify(db.query).bind(db);
class LoginService {
    async isLogin(username, password) {
      try{
        var data = [];
        let rows = await query('SELECT * from userinfor WHERE username=?', [username]);
        for(var vl of rows){
           data.push(vl);
        } 
        return data;
      }catch(err){
          throw err;
      }
    }
    async insertInfoUser(user) {
     try{
        let rows = await query('INSERT INTO userinfor(id, username, hoTen, gender, ngaySinh) VALUES (?,?,?,?,?)', [user.id, user.username,user.hoTen,user.gioiTinh,user.ngaySinh]);
        return true;
     }catch(err){
         return false;
     }
        
    }
    getUserInfoKMA(username, password) {

        return this.#_getCookie(this.getInfo, username, password);
    }
    getInfo(cookie) {
        return new Promise((resolve, reject) => {
            ApiClient.get({}, 'http://qldt.actvn.edu.vn/CMCSoft.IU.Web.Info/StudentProfileNew/HoSoSinhVien.aspx', cookie).then((value) => {
                var $ = cheerio.load(value.response.body);
                const hoTenAndMsv = $('#PageHeader1_lblUserFullName').text();
                const hoTen = hoTenAndMsv.split('(')[0];
                const msv = hoTenAndMsv.split('(')[1].replace(')', '');
                let gioiTInh = '';
                let NgaySinh = '';
                $('#sinhvien').each((i, e) => {
                    NgaySinh = $(e).find('input#txtNgaySinh.input_text').val();
                    gioiTInh = $(e).find('span#gioitinh').text();

                });
                return resolve({ gender: gioiTInh, birthDay: NgaySinh, name: hoTen, studentCode: msv });
            }).catch((err) => {
                {
                    return reject({ error: err });
                }
            })
        });
    }
    #_getCookie(getInfo, username, password) {

        var form = {
            '__EVENTTARGET': '',
            '__EVENTARGUMENT': '',
            '__LASTFOCUS': '',
            '__VIEWSTATE': 'pH8AV/s1rNQXnRIswNxQ31Cdb18QyBsr4rb55dm5P65rW2EVAEDOwEBUAfRlzb/QvmRgt2ZTQBBqkJJxOIe3OyDtTJDan/AH8aMWMifLlP/BCVMu7zEPOZjy44IUvZJokXWR8q5grtmHIe3tEMsWEzPGL9m7FlVQF6O/1kQGdMoEZz7WBUuA3ZmtojdnnchlCTRlfuOVQMMjRfWHyaJbH3IbofRS5OaTnEi4h3tSjNB572MwCGUpQ/QR11LbdnruxbJfG6ygHJW5L9alNAxQSLIq500gsY2OG/eGxr0XcSJ/ZPdbaRxhOtQBBffe7qenRBHJYzZciAxNI9mHtyl1WWzewS0ym/12wDZvup8Y7o3MvcqJxnoCd4/8Vwf5xBBynL9bF0lkeUnPSdllozT4G0I7OHA6sLttBHmMpki4H8np9K5+YYSmGlBmn8rguIdz703gH/HfH/1ZrQEL8MybzZbe0GKMvZyUKliInTQWqnnsShfMVszfzAvjX0F5P5ZA7X9vQkKsUVv77bKsnqnRxt1nbl1W9bKa9LOjeEUAMNDWV9Pb5lLbQ5HhKkVt0ZK9hAdGNKrxsQbx6yL+GUyPxbcuFxHG8ZMAVzuDSG0uprNnHQ5GSbIGhPqHZuO/31i32Skinut47rj7O41dD72bFQdndNCO0trFYWkXBqTRHmdksGs2on6ApMdmo15H9N8+8C2EDufBtJYbYoY7joOI0z+et1gXJa7mBr4nWqqSJPw/UsT7D0OQDzh4ZAjiPzLqkazgMbEZqwp2x6yD3+h46cZxzDQbxqy2lyAM+c4XPzTiOjOBBotBqTVurjqItguCgSMzVpZ40Cu7ovrz2l3zHtw4ZCHX0y3w9VvbuKYbF3g3J29y3FqGccRmiVs+fFnPVZXBgtN7B1H5rzl3zR06fPbxcaCxI3OzssQoGAKXxDSh4BVHdkoSIdcPNJRlnySMBTu9ya0BBywSN4xwRtNFalMeOQ7oLw9+BLlLfj9DS6IFZ0as8HzxbtaQnpPXFtILjDnmE+9JN4kpYowHiCHxCKiXHhy+rKJgJRqmlZHQDJWYh8k0Z5ROs9muhb6nc40o7+E/IV08F4nQ2BSeSyXcZkMDn0Tw/27OP+u5sclhW5XEM1LPlplFfbkT5SK/qnr9Ij8D8NIJIm0pJkgWfV9OBiACTg/1r4gYikqvmqRoQUsr9Al4ALW4rGLqD3JWGx/EGQSeIZ3AkF9XQMbpf5pTrSa9qR77ITV67FcYC9KMHmVPWUenMMMSzxH9tL03dzTVnXiQCg1+vwBU3ug5HQ/DwH6ZINEbCE3BAjtChssbfWrGBblOG34p2k23xAF9VWkXPZRFJpbpcL2iSx+LciYAEOyuOLYaJO2ERYk7/GjCcuRs+4yH3ALL+4ypSlz3hNCCRVf4zo9TvdC71ShkBCFeeXO6eoAeAcVjVCOtIyjKho8VwIbLfkWW2IUKpKuBbH4EDddzzmLD/psyqlGNkACR8235lJftAM379doZpDGNMdzi5ZoGkEVIj9g1qHaaQvUvfs4m1XenmfZcyux7t6r8fzCTnLi2Qm+FhbE5WIIO7owUr/w36bheeNR7nTcFEDkdJtCiYzQ8V47fhul9mYw0kczAfEdmU40jZi0Dqo1x+lt18ykT2zmxlw8CqDmd8F3k0vFiOeex4L//ZP4lpTv0eU6h00QQqVQm/bsxJu9uhIwy8VFNf0CtTJzglGnPygv7uusCCPgSYSTPtvlxhn4hQZB7wBAJR+No+69kHCf2EHK3Ex3bV2QZcAaPpcnH2+TjAVvk3sybH3Xkia6Gq53tyw==',
            '__VIEWSTATEGENERATOR': 'D620498B',
            'PageHeader1$drpNgonNgu': 'E43296C6F24C4410A894F46D57D2D3AB',
            'PageHeader1$hidisNotify': '0',
            'PageHeader1$hidValueNotify': '.',
            'txtUserName': username,
            'txtPassword': password,
            'btnSubmit': 'Đăng nhập',
            'hidUserId': '',
            'hidUserFullName': '',
            'hidTrainingSystemId': ''
        };
        return new Promise((resolve, reject) => {
            try {
                ApiClient.post(form, 'http://qldt.actvn.edu.vn/CMCSoft.IU.Web.info/Login.aspx').then(function (value) {

                    var statusEnv = value.response.statusCode;
                    if (value.response.statusCode === 302) {
                        const setCookie = value.response.headers['set-cookie'];
                       
                        var cookie = ['_ga=_ga=GA1.3.1086252872.1635697678', '_gid=GA1.3.1371520451.1636995492',];
                        if(setCookie.length==1){
                            cookie.push(setCookie[0].split(';')[0]);
                        }else{
                            cookie.push(setCookie[0].split(';')[0]);
                        cookie.push(setCookie[1].split(';')[0]);
                        }
                        return { cookie: cookie.join('; '), status: statusEnv };
                    } else {
                        return { status: statusEnv };
                    }
                  
                }).then((value) => {
                    const statusEnv = value.status;

                    if (statusEnv === 302) {

                        getInfo(value.cookie).then((value) => {
                            if (value)
                                if (value.error) reject({ error: err });
                            return resolve({ response: value, status: statusEnv });
                        });
                    } else {

                        resolve({ status: statusEnv });
                    }
                });
            } catch (err) {
                reject({ error: err });
            }

        });
    }


}
module.exports = new LoginService();