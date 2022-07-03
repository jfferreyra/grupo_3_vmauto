const express = require('express');
const router = express.Router();

//Importación de controlador
  const productsController=require('../controllers/productsController')

//Administración de Productos
  router.get('/',productsController.main);

//Detalle de Producto
  router.get('/detail/:id', productsController.detail);

//Edición de Producto
  router.get('/edit/:id',productsController.edit);
  router.put('/edit/:id',productsController.upload,productsController.edited);

//Creación de Producto
  router.get('/create/',productsController.create);
  router.post('/create/',productsController.newId,productsController.upload,productsController.created);

//Eliminación de Producto
  router.delete('/del/:id',productsController.deleted);

module.exports = router;

//Upload de multer se implementó como middleware en el método productsController.upload del controlador. 
//productsController.newId es un método del controlador que da un id nuevo cuando se crea un producto nuevo.
//este id es autoincremental y sólo se incrementa si no existe diponible uno anterior resultado de eliminar
//un producto. Está implementado como middleware pero desde un método del modelo productModel que se llama
//en el metodo del controlador.
//Cada vez que se elimina un producto su id se guarda en idsVacants.json y cada vez que se crea uno nuevo
//se consulta este archivo y se le otorga el último disponible, si ya no hay, se crea uno nuevo.
//Las dos funciones que hacen esto son newId y delId, newId debe ser un middleware pues es la unica forma
//de pasarle a upload de multer informacion para que la use en la misma tanda de imagenes:
//id-img1.jpg ,id-img2.jpg ,id-img3.jpg ,id-img4.jpg... el id debe ser el mismo lo cual se crea en storage
//en el método filename. newId crea id y lo inyecta en req.params.id que no existe ya que el metodo create
//no posee id. Luego con next() se pasa a upload de multer.
// La funcion newId proviene del metodo de productModel y se pasa al metodo del controlador.
