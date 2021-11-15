module.exports = class User {
    id = '';
    gioiTinh = '';
    ngaySinh = '';
    lop = '';

    constructor({ id, gioiTinh, ngaySinh, lop }) {
        this.id = id;
        this.gioiTinh = gioiTinh;
        this.ngaySinh = ngaySinh;
        this.lop = lop;
    }
    toJson() {
        return {
            id: this.id,
            gioiTinh: this.gioiTinh,
            ngaySinh: this.ngaySinh,
            lop: this.lop
        };
    }
}
