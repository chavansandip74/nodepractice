var mongoose=require("mongoose");
var objectid=mongoose.ObjectId;
var conn=mongoose.connect("mongodb://127.0.0.1:27017/nodejs").then(function(data){
   console.log("connected"); 
}).catch(function(err){
    console.log("error");
});
module.exports=conn;