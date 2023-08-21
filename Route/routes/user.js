var express=require('express');
var exe=require("./connection");
var router=express.Router();
router.get("/",async function(req,res){
    var data=await exe(`select * from userlogin`);
    res.send(data);
});
router.get("/about",function(req,res){
    res.render("about.ejs");
});
module.exports=router;