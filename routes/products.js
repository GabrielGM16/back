var express = require('express');
var router = express.Router();
var productModel = require('../models/product');


//Modificar un producto por ID
router.put("/:id", async function (req, res, next) {

  //Buscar un producto por ID y actualizar sus campos
if(!productModel.findOne({id: req.params.id}).count()) return res.json({error: "No se encontró el producto con Id " + req.params.id});

  await productModel.updateOne({id: req.params.id}, {$set: {
    description: req.body.description,
    price: req.body.price,
    images: req.body.images
  }}).exec();


  return res.json("Producto " + req.params.id + " modificado exitosamente");
});


//Eliminar un producto por ID
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


//Agregar un nuevo producto
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

