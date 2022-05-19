const express = require('express');
const router = express.Router();

const adminProductsController=require('../controllers/adminProductsController')

router.get('/addProduct/:id', adminProductsController.addProduct);
router.get('/:id', adminProductsController.adminProducts);

module.exports = router;