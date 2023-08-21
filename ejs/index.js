var express=require('express');
var app=express();
var list=[
    {"name":"ajay","mno":"7499743836"},
    {"name":"amit","mno":"7499787545"}, 
    {"name":"ram","mno":"9876451234"},
     {"name":"amar","mno":"8965443836"}
];
app.get("/",function(req,res){
    var obj={"data":list}
    res.render("home.ejs",obj);
});
app.listen(1000);