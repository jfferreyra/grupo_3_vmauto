// ************ RUTAS DE API ************
// RUTAS DE USUARIO Y PRODUCTO JUNTAS
var express = require('express');
var router = express.Router();

let apiUserController = require('../../controllers/apiControllers/apiUserController')
let apiProductController = require('../../controllers/apiControllers/apiProductController')
let apiMetricsController = require('../../controllers/apiControllers/apiMetricsController')


// RUTAS USUARIOS - USER
router.get('/users', apiUserController.list)                       // lista total usuarios
router.get('/users/:id', apiUserController.detail)                  // detalle de 1 usuario en particular
router.delete('/users/del/:id', apiUserController.delete)

// RUTAS PRODUCTOS - PRODUCTS
router.get('/cars', apiProductController.list)                 // lista todos los productos
router.get('/cars/:id', apiProductController.detail)            // detalle de producto
router.delete('/cars/del/:id', apiProductController.delete)       // eliminar un producto

router.get('/metrics', apiMetricsController.metrics)                 // lista todos los productos

module.exports = router