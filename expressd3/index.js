var express=require('express');
var app=express();
app.get("/",function(req,res){
    app.use(express.static('public/'))
    res.render("home.ejs");
});
app.listen(1000);