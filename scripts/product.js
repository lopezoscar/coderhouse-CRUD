var mongojs = require("mongojs");
var db = mongojs("mongodb://localhost:27017/crud",["products"]);

function crearProducto(marca){
    var producto = {
        marca:marca,
        modelo:"600",
        precio:"10000",
        descripcion:"Alto auto",
        imagen:"",
        categoria:"Autos"
    };

    db.products.insert(producto,function(err,result){
        console.log(err,result);
    });
//5675747490af53ab19e527a7
}

crearProducto("Renault");
crearProducto("Chevrolet");
crearProducto("Ferrari");

