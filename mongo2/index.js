var express=require('express');
var mongodb=require('mongodb');
var bodyparser=require("body-parser");
var mongoClient=mongodb.MongoClient;
var objectid=mongodb.ObjectId;
var client=new mongoClient("mongodb://127.0.0.1:27017");
var db=client.db("nodejs");
var app=express();
app.use(bodyparser.urlencoded({extended:true}));
// app.get("/", async function(req,res){
//     var data=await db.collection("student").find().toArray();
//     var obj={"student_list":data};

//     res.render("studentlist.ejs",obj);
// });
app.get("/", async function(req,res){


    res.render("techer_form.ejs");
});
app.post("/save_teacher",async function(req,res){
    var data=await db.collection("teacher").insertOne(req.body);
    res.send(data);
});
app.get("/teacher_list", async function(req,res){

     var data=await db.collection("teacher").find().toArray();
  var obj={"tlist":data};
    res.render("teachet_liat.ejs",obj);
});
app.get("/edit/:id", async function(req,res){
    var id=req.params.id;
    var data=await db.collection("teacher").find({"_id":new objectid(id)}).toArray();
 var obj={"tlist":data[0]};
   res.render("teacher_edit.ejs",obj);
});
app.post("/edit_teacher",async function(req,res){
    var id=req.body.teacher_id;
    delete req.body.teacher_id;
   
    var data=await db.collection("teacher").updateOne({"_id":new objectid(id)},{$set:req.body});
    res.redirect("/teacher_list");
});
app.get("/delet/:id", async function(req,res){
    var id=req.params.id;
    var data=await db.collection("teacher").deleteOne({"_id":new objectid(id)});
    res.redirect("/teacher_list");
});
app.listen(1000);