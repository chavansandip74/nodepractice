var express=require('express');
var bodyparser=require('body-parser');
var upload=require('express-fileupload');
var mysql=require('mysql');
var util=require('util');
var conn=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'node'
});
var exe=util.promisify(conn.query).bind(conn);
var app=express();
app.use(bodyparser.urlencoded({extended:true}));
app.use(upload());
app.use(express.static('public/'))
app.get("/",async function(req,res){
    var data= await exe(`SELECT * FROM user`);
    var obj={'list':data};
    res.render("home.ejs",obj);
});
app.post("/save", async function(req,res){
    var file_name=req.files.profile.name;
    req.files.profile.mv('public/upload/'+file_name);
    // await exe(`CREATE TABLE user(uid INT PRIMARY KEY AUTO_INCREMENT,profile VARCHAR(200),
    // uname VARCHAR(200),umobile VARCHAR(200)) `);
     console.log(req.files.profile);
    var data =await exe(`INSERT INTO user(profile,uname ,umobile) VALUES
    ('${file_name}','${req.body.uname}','${req.body.umobile}') `);
res.send(data);
});
app.listen(1000);