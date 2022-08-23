// ************ RUTAS DE API ************
// RUTAS DE USUARIO Y PRODUCTO JUNTAS
var express = require('express');
var router = express.Router();

let apiUserController = require('../../controllers/apiControllers/apiUserController')
let apiProductController = require('../../controllers/apiControllers/apiProductController')


// RUTAS USUARIOS - USER
router.get('/users', apiUserController.list)                       // lista total usuarios
router.get('/users/:id', apiUserController.detail)                  // detalle de 1 usuario en particular
router.post('/users/del/:id', apiUserController.delete)

// RUTAS PRODUCTOS - PRODUCTS
router.get('/products', apiProductController.list)                 // lista todos los productos
router.get('/products/:id', apiProductController.detail)            // detalle de producto
router.post('/products/del/:id', apiProductController.delete)       // eliminar un producto


module.exports = router