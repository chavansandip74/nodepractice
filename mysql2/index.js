var express=require('express');
var bodyparser=require('body-parser');
var mysql=require('mysql');
var app=express();
app.use(bodyparser.urlencoded({extended:true}))
var conn=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"node"
});
app.get("/" , function(req,res){
    
    res.render("home.ejs")
});
app.post("/save", function(req,res){
    console.log(req.body);
    conn.query(`INSERT INTO teacher(teacher_name,teacher_mobile,teacher_email) VALUES 
    ('${req.body.teacher_name}','${req.body.teacher_mobile}','${req.body.teacher_email}')`, function(err,data){
        console.log(err)
    })
 
    res.send("reg successfully submit")

})
app.listen(1000);