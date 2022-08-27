const express = require('express');
const router = express.Router();

//Middlewares
const userMware=require('../middlewares/user/userMware'); //Middlewares autorizaciones de usuario

//Validación Formulario Producto
const productValidations = require('../middlewares/validator/productValidations')

//Importación de controlador
  const productsController=require('../controllers/productsController')

//Administración de Productos
  router.get('/',userMware.productAdmin,productsController.main);

//Detalle de Producto
  router.get('/detail/:id', productsController.detail);

//Edición de Producto
  router.get('/edit/:id',userMware.productRegister,productsController.edit);
  router.put('/edit/:id',productsController.upload,productsController.edited);

//Creación de Producto
  router.get('/create/',userMware.productRegister,productsController.create);
  router.post('/create/',productsController.upload, productValidations,productsController.created);
//, productValidations queda de hacer

//Eliminación de Producto
  router.delete('/del/:id',productsController.deleted);

module.exports = router;