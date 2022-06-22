//Importación 
  const path = require('path');
  //Base de datos de coches en el futuro será solo una consulta a DB.
  const productsQuery= require('../models/data/products/carsDB.json'); 
  
  //Modelo de Producto
  const productModel=require('../models/productModel');
  
  //Multer Upload
  const upload = require('../middlewares/uploadMulter/uploadMulter');
  
  //Placeholder para el formulario de Creacion de nuevo registro.
  const placeholderProduct=require('../models/data/products/placeholderProduct.json');
  
  //Array con las categorias de cada campo del formulario de creación de producto.
  const categories=require('../models/data/products/categories.json');


//Controlador

  const productsController={
    //Muestra panel de administración de productos consulta solo para el administrador. 
    main:function(req, res) {
      res.render('products/products', {'tlistProducs':productsQuery});
    },
    //Muestra detalle de producto hecha por el administrador o el usuario.
    detail: function(req, res) {
      let product=productModel.find('id',+req.params.id);
      res.render('products/detailProducts', {product}); 
    },
    //Muestra formulario de edicion solo para el administrador
    edit:function(req, res) {
      let product=productModel.find('id',+req.params.id);
      res.render('products/editProducts', {product,categories});
    },
    //Edita y actualiza producto. Luego redirige a detail/id
    edited:function (req,res) {
      let edited=productModel.edit(req);
      productModel.updateDB('edit',edited);
      res.redirect('/products/detail/'+edited.id);
    },
    //Middleware de multer que sube archivos en este caso fotos.
    upload:upload.fields([
      {name:"img1",maxCount:1},
      {name:"img2",maxCount:1},
      {name:"img3",maxCount:1},
      {name:"img4",maxCount:1},
      {name:"img5",maxCount:1},
      {name:"img6",maxCount:1},
      {name:"img7",maxCount:1}
    ]),
    //Muestra Formulario de Creación de producto solo administrador.
    create: (req, res) => {
      res.render('products/createProducts',{product:placeholderProduct[0],categories});
    },
    //Crea y actualiza producto. Luego redirige a detail/id
    created:(req,res) => {
      let created=productModel.create(req);
      productModel.updateDB('create',created);
      res.redirect(`/products/detail/${created.id}`);
    },
    //Elimina y actualiza producto. Luego redirige a /products/
    deleted:(req, res) => {
      productModel.updateDB('delete',+req.params.id)
      res.redirect('/products');
    },
    //Middleware de modelo que otorga id a nuevo producto.
    newId:productModel.newId
  }

module.exports = productsController;