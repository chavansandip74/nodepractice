 var express=require("express");
var bodyparser=require('body-parser');
var mysql=require('mysql');
var app=express();
var util=require('util');
var conn=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'node'
});
var exe=util.promisify(conn.query).bind(conn);
app.use(bodyparser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.render("home.ejs");
});
app.get("/add",function(req,res){
    res.render("addemp.ejs");
});
app.get("/liste", async function(req,res){
    var data=await exe(`SELECT * FROM employee `);
    var obj={"list":data};
    res.render("emplist.ejs",obj);
});
app.post("/save",async function(req,res){
//  await exe(`CREATE TABLE employee(eid INT PRIMARY KEY AUTO_INCREMENT,ename VARCHAR(200),
//  emobile VARCHAR(200),emarried VARCHAR(10),egender VARCHAR(10))`);
await exe(`INSERT INTO employee(ename,
emobile,emarried,egender) VALUES ('${req.body.ename}','${req.body.emobile}',
'${req.body.emarried}','${req.body.egender}')`);
    res.redirect("/");
});
app.get("/edite/:eid", async function(req,res){
    var id=req.params.eid;
    var data=await exe(`SELECT * FROM employee WHERE eid='${id}'`);
    res.render("edit.ejs",data[0]);
});
app.post("/edite",async function(req,res){
    await exe(`UPDATE employee SET ename='${req.body.ename}',emobile='${req.body.emobile}',emarried='${req.body.emarried}',
    egender='${req.body.egender}' WHERE eid='${req.body.eid}'`);
    res.redirect("/liste");
});
app.get("/delete/:eid",async function(req,res){
    var id=req.params.eid;
    var data=await exe(`DELETE FROM employee WHERE eid='${id}'`);
    res.redirect("/liste");
});
app.listen(1000);
