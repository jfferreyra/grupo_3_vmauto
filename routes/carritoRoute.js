const express = require('express');
const router = express.Router();

const  carritoController=require('../controllers/carritoController')

router.get('/:id', carritoController.carrito);

module.exports = router;