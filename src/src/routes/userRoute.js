// ****************************** USUARIO - RUTAS *************************************************
//******************************* Importación *****************************************
  const express = require('express');
  const router = express.Router();

  //Middlewares
  const userMware=require('../middlewares/user/userMware'); //Middlewares de auth y guest, autorizado e invitado
  const loginValidations=require('../middlewares/validator/loginValidations'); //Validaciones del Login.
  const registerValidations=require('../middlewares/validator/registerValidations');//Validaciones del Registro.
  
  //Controladores
  const userController=require('../controllers/userController')
  
  //********************************   RUTAS    ********************************************/

  // VISTA LOGIN. Muestra Formulario de login. Sólo lo puede ver el NO logueado.
    router.get('/login',userMware.guest,userController.login);
  
  // LOGIN. Logueo de Usuario.
    router.post('/login',loginValidations,userController.logued);
  
  // LOGOUT. Deslogueo de usuario.
    router.get('/logout',userController.logout);

  //Registro Vista. Solo puede verlo el que todavía no es usuario o el administrador general o de usaurio.
    router.get('/register',userMware.register,userController.register);

  //Registro y alta de Usuario
    router.post('/register',userController.upload,registerValidations,userController.registered);

  //Administrador de Usuarios. Sólo puede verlo el administrador. Por ahora chuck@chuck chuck22.
  router.get('/admin',userMware.admin,userController.admin);

  // Eliminar Usuario.
  router.delete('/delete/:id',userMware.admin,userController.delete);
  
  // Perfil de Usuario sólo pueden verlo los usuarios registrados, faltaria evitar que otros loqueados vean el que no es suyo.
  router.get('/profile/:id',userMware.auth,userController.profile);

  //Edición de Usuario.
  router.get('/edit/:id',userMware.edit,userController.edit);
  router.put('/edit/:id',userController.upload,registerValidations,userController.edited);

module.exports = router;