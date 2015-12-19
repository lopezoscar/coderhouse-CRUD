"use strict";

function Products(db){

    return {
        create:function(product,callback){
            db.products.insert(product,callback);
        },
        getAllProducts:function(callback){
            db.products.find({},callback);
        },
        findById:function(id,callback){
            db.products.findOne({_id:require("mongojs").ObjectId(id)},function(err,product){
                if(err){
                    callback(err,null);
                }else{
                    product.ok = true;
                    callback(null,product);
                }
            })
        },
        update:function(query,update,callback){
            db.products.update(query,update,callback);
        },
        remove:function(query,callback){
            db.products.remove(query,callback);
        }
    }
}

module.exports = Products;