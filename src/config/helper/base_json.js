exports.baseJson = function ({ data = null, isSucc = true, mess = [] }) {
    return {
        Messages: mess,
        Data: data,
        isSuccess: isSucc
    };
}
exports.loiBatDinh = {
    Messages: ['Lỗi bất định'],
    Data: null,
    isSuccess: false
}