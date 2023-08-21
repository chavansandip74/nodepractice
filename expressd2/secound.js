var express=require('express');
var app=express();

app.get("/",function(req,res){
    obj={"name":"abcd","mno":"7499743836","email":"abcd@gmail.com"}
    res.send(obj)
});
app.listen(1000);