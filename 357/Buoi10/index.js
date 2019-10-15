var express = require("express");
var app = express();
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));
app.listen(3000);

//body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

// Mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://khoapham:lugDHg8StmhjDMX5@cluster0-qah5q.mongodb.net/buoi1?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true}, function(err){
    if(err){
        console.log("Error mongodb " + err);
    }else{
        console.log("Mongodb connected successfully.");
    }
});

var SinhVien = require("./Models/SinhVien");

app.get("/sv", function(req, res){

    SinhVien.find(function(err, items){
        if(err){
            res.render("sinhvien", {thongbao:"Loi Find SV"});
        }else{
            res.render("sinhvien", {MangSV:items});
        }
    });

});

app.post("/sv", function(req, res){
    var sv = new SinhVien({
        HoTen: req.body.hoten,
        NamSinh : req.body.namsinh
    });
    
    sv.save(function(err){
        if(err){
            res.render("sinhvien", {thongbao:"Save loi!!!"});
        }else{
            SinhVien.find(function(err2, items){
                if(err2){
                    res.render("sinhvien", {thongbao:"Loi Find SV"});
                }else{
                    res.render("sinhvien", {MangSV:items});
                }
            });
            //res.render("sinhvien", {thongbao:"Save thanh cong!"});
        }
    });
    
    

});


app.get("/ds", function(req, res){
    
    SinhVien.find(function(err, items){
        if(err){
            res.send("Find SinhVien Error: " + err);
        }else{
            console.log(items);
            res.render("trangchu", {MangSV:items});
        }
    });
});

app.get("/", function(req, res){

    for(var i=1; i<=10; i++){
        var teo = new SinhVien({
            HoTen: "teo",
            NamSinh: 2000 + i
        });
    
        teo.save(function(err){
            if(err){
                console.log("Save error " + teo.NamSinh + " : " + err);
            }else{
                console.log("Save sucessfully " + teo.NamSinh);
            }
        });
    }
    
    
    res.render("trangchu");
});