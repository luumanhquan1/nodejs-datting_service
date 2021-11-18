module.exports = class User {
    id = '';
    gioiTinh = '';
    ngaySinh = '';
    username = ''
    hoTen = '';
    constructor({ id, gioiTinh, ngaySinh, username, hoTen }) {
        this.id = id;
        this.gioiTinh = gioiTinh;
        this.ngaySinh = ngaySinh;
        this.username = username;
        this.hoTen = hoTen;
    }
    toJson() {
        return {
            id: this.id,
            gioiTinh: this.gioiTinh,
            ngaySinh: this.ngaySinh,
            msv:this.username,
            hoTen: this.hoTen
        };
    }
}
