// ****************************** USUARIO - RUTAS *************************************************
//******************************* Importación *****************************************
const express = require('express');
const router = express.Router();

//Middlewares
const userMware=require('../middlewares/user/userMware'); //Middlewares de auth y guest, autorizado e invitado

//Controladores
  const  cartController=require('../controllers/cartController')

//********************************   RUTAS    ********************************************/

//Administración de Carrito
  router.get('/:id', userMware.cart, cartController.cart);
  router.post('/add', userMware.addCar, cartController.addCar);
  router.post('/delete', userMware.addCar, cartController.delCar);

module.exports = router;