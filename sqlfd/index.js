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
    conn.query(`SELECT * FROM student `,function(err,data){
        var obj={"list":data}
        res.render("home.ejs",obj);
    });
   
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
    res.redirect("/");

});
app.get("/delete/:student_id", function(req,res){

    var id=req.params.student_id;
    conn.query(`DELETE FROM student WHERE student_id= '${id}'`,function(err,data){ 
     console.log(err);
    }
    );
    res.redirect("/");
});
app.listen(1000);