var express = require('express');
var router = express.Router();
var productModel = require('../models/product');


router.put("/:id", function (req, res, next) {
  res.json("Modificando producto " + req.params.id);
 });
 
 
 router.delete("/:id", async function (req, res, next) {


  //Buscar un producto por ID y regresa una lista
const resul = await productModel.find({id: req.params.id}).exec();


//Si se encontró lo elimina
if (resul.length > 0) {
  await productModel.deleteOne({id: req.params.id});
  res.json("Eliminando producto");
} else {
  res.json({error: "No se encontró el producto con Id " + req.params.id})
}
});
 
 router.post("/", async function (req, res, next) {


  const product = new productModel({
      id: req.body.id, //Extra el Id pasado por el body
      description: req.body.description,
      name: req.body.name,
      price: req.body.price,
      images: req.body.images
    });


    const result = await product.save(); // Lo guarda en Mongo
    res.json('Registro Agregado exitosamente');
});

//Listado de todos los productos
router.get("/", async function (req, res, next) {


  const resultado = await productModel.find();
  res.json(resultado);
});



module.exports = router;

