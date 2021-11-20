const db = require('../config/dbConfig');
const util = require('util');
const query = util.promisify(db.query).bind(db);
class SoThichService {
    async getAllSoThich() {
        try{
            const result = await query('SELECT * from sothich');
        var json=[];
        for (var vl of result) {
           json.push({
             id:vl.id,
            name:vl.name,
            url:vl.url
           });
        }
        return json;
        }catch(err){
            return false;
        }
    }
}
module.exports = new SoThichService();