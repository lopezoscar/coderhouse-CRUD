"use strict";

var express = require("express");
var app = express();
app.use(express.static('public'));

//motor de templates
var exphbs = require("express-handlebars");


var bodyParser = require("body-parser");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.set("view engine","handlebars");
app.engine("hbs",exphbs());

var mongojs = require("mongojs");
var db = mongojs("mongodb://localhost:27017/crud",["products"]);


var ProductsLib = require("./lib/Products");
var Products = new ProductsLib(db);


app.get('/',function(req,res){
   Products.getAllProducts(function(err,products){
       if(err){
           console.log("err",err);
           res.render("index.hbs",{layout:false,title:"ERROR"});
       }else{
           res.render("index.hbs",{layout:"layout.hbs",title:"CRUD PRODCUCS",products:products});
       }
   })
});

app.get('/detail/:product_id',function(req,res){
    Products.findById(req.params.product_id,function(err,product){
       if(err){
           console.log(err);
           res.render("detail.hbs",{layout:false,err:err});
       }else{
           res.render("detail.hbs",{layout:"layout.hbs",product:product});
       }
    });
});

app.get('/create',function(req,res){
    res.render('create.hbs',{layout:"layout.hbs"});
});

app.post('/create',function(req,res){
    var newProduct = req.body;
    Products.create(newProduct,function(err,result){
       if(err){
           console.log("err",err);
           res.json(err);
       }else{
           res.redirect('/detail/'+newProduct._id);
       }
    });
});

app.get('/update/:product_id',function(req,res){
   Products.findById(req.params.product_id,function(err,product){
        if(err){
            console.log("err",err);
            res.json(err);
        }else{
            res.render("update.hbs",{layout:"layout.hbs",product:product});
        }
   });
});

app.post('/update',function(req,res){
    console.log(req.body);
    var product = req.body;
    var id = product._id;
    delete product._id;
    Products.update({_id:require("mongojs").ObjectId(id)},product,function(err,result){
        if(err){
            console.log(err);
            res.send('err');
        }else{
            console.log(result);
            res.send('ok');
        }
    });
});

app.listen(3000,function(){
    console.log("SERVER UP");
});
