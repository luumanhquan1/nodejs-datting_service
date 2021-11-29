const db = require('../config/dbConfig');
const util = require('util');
const query = util.promisify(db.query).bind(db);
class SoThichService {
    async getAllSoThich() {
        try {
            const result = await query('SELECT * from sothich');
            var json = [];
            for (var vl of result) {
                json.push({
                    id: vl.id,
                    name: vl.name,
                    url: vl.url
                });
            }
            return json;
        } catch (err) {
            return false;
        }
    }
    async deleteAllSoThichUser(id) {
        try {
            const result = await query('DELETE FROM usersothich WHERE id=?', [id]);
            return true;
        } catch (err) {
            return false;
        }
    }
    async insertSoThichUser(id, idSoThichs) {
        try {
            for (const idSoThich of idSoThichs) {
                var vl = await query('INSERT INTO usersothich(id,idSoThich) VALUES (?,?)', [id, idSoThich]);
            }

            return true;

        } catch (err) {
            return false;
        }
    }
    async getSoThichUser(id) {
     try{
         var listSoThich=[];
        const rows = await query('SELECT usersothich.id,usersothich.idSoThich,sothich.name,sothich.url FROM usersothich JOIN sothich on usersothich.idSoThich=sothich.id WHERE usersothich.id=?', [id]);
          for(let vl of rows){
              listSoThich.push({
                  id:vl.id,
                  idSoThich:vl.idSoThich,
                  name:vl.name,
                  url:vl.url
              });
          }
          return listSoThich;
     }catch(err){
         throw err;
     }
        console.log(rows);
    }

}
module.exports = new SoThichService();