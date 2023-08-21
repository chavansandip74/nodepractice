var express=require('express');
var router=express.Router();
router.get("/",function(req,res){
    res.send("hello admin");
});
router.get("/hi",function(req,res){
    res.send("hello in hi admin");
});
module.exports=router;