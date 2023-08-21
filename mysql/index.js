var express=require('express');
var mysql=require('mysql');
var app=express();
var conn=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'node'
});
app.get("/", function(req,res){
 
    conn.query(`SELECT * FROM student`, function(err,data){
        console.log(err);
        console.log(data);
    });
    res.send("hi");
});
app.listen(1000);