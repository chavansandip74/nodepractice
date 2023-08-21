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
    // conn.query(`CREATE TABLE student (student_id INT PRIMARY KEY AUTO_INCREMENT,
    // student_name VARCHAR(200),student_mobile VARCHAR(200),student_emial VARCHAR(200))`,function(err,data){
    //     console.log(err);
    // });
    conn.query(`INSERT INTO student (student_name,student_mobile,student_emial) VALUES
    ('${req.body.student_name}','${req.body.student_mobile}','${req.body.student_emial}')`,function(err,data){
        console.log(err);
    }
    );
    res.send("reg successfully submit")

})
app.listen(1000);