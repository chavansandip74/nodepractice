var express = require('express');
var bodyparser = require('body-parser');
var mysql = require('mysql');
var util = require('util');
var app = express();
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'node'
});
var exe = util.promisify(conn.query).bind(conn);
app.use(bodyparser.urlencoded({ extended: true }));
app.get("/", async function (req, res) {
    res.render("home.ejs");
});
app.post("/save", async function (req, res) {
    //await exe(`CREATE TABLE bill(bid INT PRIMARY KEY AUTO_INCREMENT,bill_date VARCHAR(20),cname VARCHAR(200))`);

    //  await exe(`CREATE TABLE bill_product(product_id INT PRIMARY KEY AUTO_INCREMENT,bid INT,product_name VARCHAR(200),
    //  product_price INT,product_qty INT,product_total INT)`);
    var d = req.body;
    var bill=await exe(`INSERT INTO bill(bill_date,cname)VALUES
    ('${d.bill_date}','${d.cname}')`);
    var bid = bill.insertId;
    for (var i=0;i<d.product_name.length;i++)
     {
        var sql=await exe(`INSERT INTO bill_product(bid,product_name,product_price,product_qty,product_total)VALUES
        ('${bid}','${d.product_name[i]}','${d.product_price[i]}','${d.product_qty[i]}','${d.product_total[i]}')`);

    }
    res.redirect("/bill_list");
});
app.get("/bill_list",async function(req,res){
    var data=await exe(`SELECT *,SUM(product_total) as ttl FROM bill,bill_product WHERE 
    bill.bid=bill_product.bid GROUP BY bill.bid`);
    var obj={'bills':data};
    res.render("bill_list.ejs",obj);
})
app.listen(1000);