const express = require('express');
const router = express.Router();

//Importación de Controlador Carrito
  const  carritoController=require('../controllers/carritoController')

//Administración de Carrito
  router.get('/:id', carritoController.carrito);

module.exports = router;