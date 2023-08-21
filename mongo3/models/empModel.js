var mongoose=require("mongoose");
var objectid=mongoose.ObjectId;
var empSchema= new mongoose.Schema({
    "emp_name":String,
    "emp_number":Number,
    "emp_email":String,
    "emp_address":String
});

var empModel=new mongoose.model("emp_model",empSchema);

module.exports=empModel;