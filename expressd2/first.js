var express=require('express');
var app=express();
var menu=`
        <a href="/">home</a>&nbsp;&nbsp;
        <a href="/about">about</a>
        <a href="/contact">contact</a>
        <br>
    `;
app.get("/",function(req,res){
    res.send(menu+"<input>hello")
    // res.writeHead(200,{'content-type':'text/html'});
    // res.write("<input>hellp");
    // res.end(); 
});
app.get("/about",function(req,res){
    res.send(menu+"<input>hello abouts")
    // res.writeHead(200,{'content-type':'text/html'});
    // res.write("<input>hellp");
    // res.end();
});
app.get("/contact",function(req,res){
    res.send(menu+"<input>hello contact")
});
app.listen(1000);