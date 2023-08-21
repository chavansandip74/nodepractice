var express=require('express');
var adminroute=require("./routes/admin");
var userrouter=require("./routes/user");
var upload=require("express-fileupload");
var session=require("express-session");
var bodyparser=require("body-parser");
var app=express();
app.use(express.static("public/"));
app.use(bodyparser.urlencoded({extended:true}));
app.use(upload());
app.use(session({
    secret:'abc',
    resave:true,
    saveUninitialized:true
}));
app.use("/user",userrouter);
app.use("/",adminroute);
// app.get("/",function(req,res){
//     res.send("hello");
// });
// // app.get("/admin",function(req,res){
//     res.send("admin");
// })
app.listen(1000);