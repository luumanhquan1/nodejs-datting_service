const request = require('request');
class ApiClient {
    options = {};
    constructor() {
        this.options.headers = { 'Content-Type': 'application/x-www-form-urlencoded' };

        this.options.form = {};

    }
    post(form, url) {
        this.options.form = form;
        this.options.url = url;
        this.options.method = "POST";
        return new Promise((resolve, reject) => {
            try {
                request(this.options, (function (err, response) {
                    if (err) reject({ error: err });
                    resolve({ response: response });
                }));
            } catch (err) {
                reject({ error: err });
            }
        });
    }
    get(form, url, cookie) {
        this.options.form = form;
        this.options.url = url;
        this.options.method = "GET";
        this.options.headers['Cookie']=cookie;
    
        return new Promise((resolve, reject) => {
            try {
                request(this.options, (function (err, response,html) {
                    if (err) reject({ error: err });
                    resolve({ response: response });
                }));
            } catch (err) {
                reject({ error: err });
            }
        });
    }
}
module.exports = new ApiClient();