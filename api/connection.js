var mongoose=require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/api").then(function(data){
    console.log("connected");
}).catch(function(err){
    console.log(" Not connected");  
});
