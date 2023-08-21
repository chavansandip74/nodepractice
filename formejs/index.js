var express=require('express');
var app=express();
var url=require('url');
app.get("/",function(req,res){

    res.render("home.ejs");
});
app.get("/reg",function(req,res){
    var urldata=url.parse(req.url,true).query;
    console.log(urldata)
    console.log(urldata.sname)
    res.send("data resive");
});

app.listen(1000);