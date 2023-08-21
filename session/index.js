var express=require('express');
var session=require('express-session');
var app=express();
app.use(session({
    secret:'abc',
    resave:true,
    saveUninitialized:true
}));
// app.get("/",function(req,res){
//     // console.log(req.session);
//     req.session.name='chavan';
//         console.log(req.session);
//     res.send("hello welcome to this page:");
// });
app.get("/about",function(req,res){
  console.log|(req.session);
  res.send(req.session);
});
app.get("/",function(req,res){
    if( req.session.page_refresh_count == undefined)
    {
    req.session.page_refresh_count=1;
  
    }
    else{
        
           req.session.page_refresh_count++;
    }
    console.log( req.session.page_refresh_count);
    res.send("refresh="+ req.session.page_refresh_count);
});
app.listen(1000);
