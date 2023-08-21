var mongoose=require("mongoose");
var productSchema= new mongoose.Schema({
    "product_name":String,
    "product_price":Number,
    "product_details":String
});

var productModel=new mongoose.model("product_model",productSchema);

module.exports=productModel;