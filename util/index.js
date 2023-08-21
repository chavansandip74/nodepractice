var express=require('express');
var mysql=require('mysql');
var bodyparser=require('body-parser');
var util=require("util")
var app=express();
app.use(bodyparser.urlencoded({extended:true}))
var conn=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"node"
});
var exe=util.promisify(conn.query).bind(conn);
app.get("/" ,async function(req,res){
        var data=await exe(`SELECT * FROM student`);
        var obj={"list":data};
        res.render("home.ejs",obj);
    });
app.post("/home",async function(req,res){

    var data=await exe(`INSERT INTO student (student_name,student_mobile,student_emial) VALUES
    ('${req.body.student_name}','${req.body.student_mobile}','${req.body.student_emial}')`
    );
    res.redirect("/");
});
app.get("/delete/:id" ,async function(req,res){
    var id=req.params.id;
    var data=await exe(`DELETE FROM student WHERE student_id= '${id}'`
    );
    res.redirect("/");
});
app.listen(1000);