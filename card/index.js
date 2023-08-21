var express=require('express');
var bodyparser=require('body-parser');
var mysql=require('mysql');
var util=require('util');
var upload=require('express-fileupload');
var app=express();
var conn=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'node'
});
var exe=util.promisify(conn.query).bind(conn);
app.use(bodyparser.urlencoded({extended:true}));
app.use(upload());
app.use(express.static('public/'));
app.get("/",async function(req,res){
    var data=await exe(`SELECT * FROM card`);
    var obj={'list':data}
    res.render('home.ejs',obj);
});
app.get("/admin",function(req,res){
    res.render('admin/nav.ejs');
});
app.get("/card",function(req,res){
    res.render('admin/card.ejs');
});
app.post("/save", async function(req,res){
    var filename=req.files.cimg.name;
    req.files.cimg.mv('public/uploads/'+filename);
    // await exe(`CREATE TABLE card(cid INT PRIMARY KEY AUTO_INCREMENT,cimg TEXT,caption VARCHAR(200),cdes TEXT)`);
    // res.send("done");
    var data=await exe(`INSERT INTO card(cimg,caption,cdes)VALUES
    ('${filename}','${req.body.caption}','${req.body.cdes}')`);
    res.redirect('/');
    console.log(req.files);
    console.log(req.body);

});

app.listen(1000);