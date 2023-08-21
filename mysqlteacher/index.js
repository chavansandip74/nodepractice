var express=require('express');
var bodyparser=require('body-parser');
var mysql=require('mysql');
var util=require('util');
var url=require('url');
var app=express();
app.use(bodyparser.urlencoded({extended:true}));
var conn=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'node'

});
 var exe=util.promisify(conn.query).bind(conn);
app.get("/", function(req,res){
    res.render("home.ejs");
});
app.get("/add",function(req,res){
res.render("add.ejs");
});
app.post("/save",async function(req,res){
    var d=req.body;
  var data=await exe(`INSERT INTO teacher(teacher_name,teacher_mobile,teacher_email,teacher_bod,teacher_addr) VALUES
  ('${d.teacher_name}','${d.teacher_mobile}','${d.teacher_email}','${d.teacher_bod}','${d.teacher_addr}')`)
    // res.send(data);
    res.redirect("/")
});
app.get("/list", async function(req,res){
    var data=await exe(`SELECT * FROM teacher`);
    var obj={"list":data};
    res.render("tlist.ejs",obj);
});
app.get("/search",async function(req,res){
    var urldata=url.parse(req.url,true).query;

    var name=urldata.search;
    var data=await exe(`SELECT * FROM teacher WHERE teacher_name LIKE '${name}%' `);
    var obj={'list':data};
    res.render("search.ejs",obj);
});
app.get("/delete/:teacher_name",async function(req,res){
    var id=req.params.teacher_name;
    res.send(id)
    var data=await exe(`DELETE FROM teacher WHERE teacher_name= '${id}'` );
    var obj={'list':data};
    res.render("search.ejs",obj);
});
app.listen(1000);