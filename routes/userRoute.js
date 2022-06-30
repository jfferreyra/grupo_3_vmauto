const express = require('express');
const router = express.Router();

//Importación de middlewares
const userMware=require('../middlewares/user/userMware'); //Middlewares de auth y guest, autorizado e invitado
const loginValidations=require('../middlewares/validator/loginValidations'); //Validaciones del Login.
const registerValidations=require('../middlewares/validator/registerValidations');//Validaciones del Registro.

//Importación del Controladores
const userController=require('../controllers/userController')

//Registro Vista. Solo puede verlo el guest.
  router.get('/register',userMware.guest,userController.register);

//Registro y alta de Usuario
  router.post('/register',userController.newId,userController.upload,registerValidations,userController.registered);

//Muestra Formulario de Login. Solo puede verlo el guest
  router.get('/login',userMware.guest,userController.login);

//Login de Usuario
  router.post('/login',loginValidations,userController.logued);

//Logout de usuario
  router.get('/logout',userController.logout);

//Administrador de Usuarios. Sólo puede verlo el auth admin. Por ahora cualquier registrado.
router.get('/admin',userMware.auth,userController.admin);
// Eliminar Usuario.
router.delete('/delete/:id',userController.delete);
// Perfil de Usuario sólo pueden verlo los usuarios registrados, faltaria evitar que otros loqueados vean el que no es suyo.
router.get('/profile/:id',userMware.auth,userController.profile);

//Edición de Usuario.
// router.get('/edit/:id',userController.edit);
// router.put('/edit/:id',userController.edited);

module.exports = router;