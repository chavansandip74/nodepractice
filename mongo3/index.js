var express=require("express");
var bodyparser=require("body-parser");

require("./connection");
//var productModel=require("./models/productModel.js");
var empModel=require("./models/empModel.js");
var app=express();
app.use(bodyparser.urlencoded({extended:true}));


app.get("/" ,async function(req,res){
    // var data=new productModel({
    //     "product_name":"book",
    //     "product_price":1800,
    //     "product_details":"writer red"
    // });
    // data.save();
    // res.send("hello");
    // var data=new empModel({
    //     "emp_name":"amit",
    //     "emp_number":5645,
    //     "emp_email":"amit@gmail.com",
    //     "emp_address":"mirajgoan"
    // });
    // data.save();
    // res.send("hello");
   // var data=await empModel.find();
    res.render("empform.ejs");
});
app.post("/save_emp",async function(req,res){
    
var data=new empModel(req.body);
     data.save();
    res.send(req.body);
});
app.get("/emp_list", async function(req,res){

    var data=await empModel.find();
 var obj={"emplist":data};
   res.render("emp_list.ejs",obj);
});
app.get("/edit/:id", async function(req,res){
    var id=req.params.id;
    var data=await empModel.findById
 var obj={"emplist":data[0]};
   res.render("emp_edit.ejs",obj);
});
app.post("/edit_emp",async function(req,res){
    var id=req.body.teacher_id;
    delete req.body.teacher_id;
   
    var data=await db.collection("teacher").updateOne({"_id":new objectid(id)},{$set:req.body});
    res.redirect("/teacher_list");
});
app.get("/delet/:id", async function(req,res){
    var id=req.params.id;
    var data=await empModel.remove({"_id":id});
    res.redirect("/emp_list");
});
app.listen(1000);