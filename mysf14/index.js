var express=require('express');
var bodyparser=require('body-parser');
var upload=require('express-fileupload');
var util=require('util');
var mysql=require('mysql');
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
app.use(express.static('public/'))
app.get("/", async function(req,res){
    var data=await exe(`SELECT * FROM slider`);
    var obj={'list':data};
    res.render("home.ejs",obj);
});
app.get("/slider",async function(req,res){
    var data=await exe(`SELECT * FROM slider`);
    var obj={'list':data};
    res.render("slider.ejs",obj);
});
app.post("/save", async function(req,res){
    console.log(req.body);
    console.log(req.files);
    filename=req.files.simg.name;
   req.files.simg.mv('public/uplods/'+filename);
//    var data=await exe(`CREATE TABLE slider(sid INT PRIMARY KEY AUTO_INCREMENT,
//     simg TEXT,scaption TEXT,slink TEXT,stext VARCHAR(200))`);
var data=await exe(`INSERT INTO slider(simg,scaption,slink,stext)VALUES
('${filename}','${req.body.scaption}','${req.body.slink}','${req.body.stext}')`);
    // res.send("slider save");
    res.redirect('/slider');
});
app.get("/edit/:sid",async function(req,res){
var id=req.params.sid;
var data=await exe(`SELECT * FROM slider where sid='${id}'`);
var obj={'list':data[0]};
res.render("editslider.ejs",obj);
});
app.post("/update",async function(req,res){
    var d=req.body;
    if(req.files!=null)
    {
        var filename=req.files.simg.name;
        req.files.simg.mv('public/uplods/'+filename);
        await exe(`UPDATE slider SET simg='${filename}' WHERE sid='${d.sid}'`);
    }
    var sql=await exe(`UPDATE slider SET scaption='${d.scaption}',slink='${d.slink}',stext='${d.stext}' WHERE 
    sid='${d.sid}'`);
    console.log(req.files);
    console.log(req.body);
    res.redirect("/slider");
    });
    app.get("/delete/:sid",async function(req,res){
        var id=req.params.sid;
        var data=await exe(`DELETE FROM slider where sid='${id}'`);
   
        res.redirect("/slider");
        });
app.listen(1000);