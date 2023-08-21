var mongoose=require("mongoose");
studentSchema=new mongoose.Schema({
    "stuent_name":String,
    "student_mobile":String,
    "student_email":String,
    "student_age":Number
});
var studentModel=new mongoose.model("student_model",studentSchema);
module.exports=studentModel;