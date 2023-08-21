var express=require('express');
var session=require('express-session');
var bodyparser= require('body-parser');
var mysql=require('mysql');
var util=require('util');
var app=express();
var conn=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'node'
});
var exe=util.promisify(conn.query).bind(conn);
app.use(bodyparser.urlencoded({extended:true}));
app.use(session({
    secret:'abc',
    resave:true,
    saveUninitialized:true
}));
app.get("/",async function(req,res){
    res.render("home.ejs");
});
app.post("/save",async function(req,res){
    // await exe(`CREATE TABLE USERLOGIN(user_id INT PRIMARY KEY AUTO_INCREMENT,user_name VARCHAR(200),password TEXT)`);
    await exe(`insert into userlogin(user_name,password) values
    ('${req.body.username}','${req.body.password}')`);
    res.render( "home.ejs" );
}); 
app.post("/login",async function(req,res){
    var data=await exe(`select 8 from userlogin where user_name='${req.body.username}' and password='${req.body.password}'`);
    if(data.length>0){
        res.send("login succesfully");
    }
    else{
        res.send("login faild");
    }
});
app.get("/register",async function(req,res){
    res.render("register.ejs");
});
app.get("/admin",async function(req,res){
    var data=await exe(`select * from userlogin`);
    var obj={'list':data};
    res.render('list.ejs',obj);
})
app.listen(1000);
