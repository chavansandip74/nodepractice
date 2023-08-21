var express=require('express');
var app=express();
var url=require('url');

app.get("/", function(req,res){
    res.render("home.ejs");
});
app.get("/home", function(req,res){
  var urldata=url.parse(req.url,true).query;
  var sum=Number(urldata.num1)+Number(urldata.num2);
  res.send("addition="+sum)
});
app.listen(1000);