var mongoose = require("mongoose");

const sinhvienSchema = new mongoose.Schema({
    HoTen: String,
    NamSinh: Number
});

module.exports =  mongoose.model("SinhVien",sinhvienSchema);
