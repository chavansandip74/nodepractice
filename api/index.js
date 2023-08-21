var express=require("express");
var app=express();
var url=require("url");
var bodyparser=require("body-parser");
require("./connection.js")
var studentModel=require("./models/studentmodel.js")
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());

app.get("/student_list", async function(req,res){
    var data=await studentModel.find();
    res.send(data);
});
app.post("/add_student",async function(req,res){
    var newdata=new studentModel(req.body);
    newdata.save();
    res.send("data");
});
app.put("/update_student",async function(req,res){
    var _id=req.body._id;
    delete req.body._id;
    var data=await studentModel.findOneAndUpdate({"_id":_id},req.body);
    res.send(data);
});
app.patch("/update_student/:id",async function(req,res){

    var data=await studentModel.findOneAndUpdate({"_id":req.params.id},req.body);
    res.send(data);
});
app.delete("/delete_student/:id",async function(req,res){

    var data=await studentModel.findOneAndDelete({"_id":req.params.id},req.body);
    res.send(data);
});


// app.get("/",async function(req,res){
//     var urldata=url.parse(req.url,true).query;
//     var sum=Number(urldata.num1)+Number(urldata.num2);
//     console.log(urldata);
//     res.send("sum="+sum);
// });
// app.post("/multiplication",async function(req,res){
//     console.log(req.body);
//     var mult=Number(req.body.num1)*Number(req.body.num2);
//     res.send("hello post multiplication="+mult);
// });
app.listen(1000);