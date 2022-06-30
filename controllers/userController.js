//Importación 
// const path=require('path');
// const fs=require('fs');
const userModel=require('../models/userModel');

//ValidationsResults
const {validationResult}=require('express-validator');

//Multer Upload
const upload = require('../middlewares/uploadMulter/userUploadMulter');

//bcrypt
const bcrypt=require('bcryptjs');

//Controlador
const userController={
  //Vista de Formulario de registro
  register: function(req, res) {
    res.render('users/register');
  },
  //Registro usuario
  registered:function(req,res){
    let oldImg=req.file?.filename ?? req.body?.oldImg ?? null;
    const errors=validationResult(req); //errores de validacion
    if(errors.isEmpty()){               //Si no hay errores (errors vacio)
      let userExist=userModel.findByField('email',req.body.email); //Verifica si existe el email.
      if(userExist){                    //Si ya existe vuelve a la vista del registro.
        return res.render('users/register');
      }else{
        let id=req.params.id;           //Encripta password y da de alta el nuevo usuario.
        req.body.pass=bcrypt.hashSync(req.body.pass,10);
        delete req.body.oldImg;         //Saca propiedad oldImg.
        let userNew={id:id,...req.body,image:oldImg}; //Arma nuevo usuario.
        let users=userModel.findAll();  //Trae todos los usuarios.
        users.push(userNew);    //Agrega nuevo usuario.
        userModel.updateDb(users);    //Actualiza la base de datos.
        return res.redirect('/user/login');         //Redirige al login.
      }
    };  //Si existen errores vuelve al formulario y persiste campos correctos y devuelve errores.
    return res.render('users/register',{errors:errors.mapped(),old:req.body,oldImg});
  },
  upload:upload.single('img'),
  newId:function(req,res,next){         //Autoincrementa id y pasa id a registered para nuevo usuario.
    let users=userModel.findAll();      //Lee todos los usuarios.
    req.params.id=users[users.length-1].id+1; //Toma el último id le suma 1 y se lo pasa a multer.
    next()
  },
  login: function(req, res) {           //Vista de Login
    res.render('users/login');
  },
  logued: function(req,res){
    const errors=validationResult(req);   //Errores de validacion
    if(errors.isEmpty()){                 //Si no hay errores (errors vacio)
      let userExist=userModel.findByField('email',req.body.email); //Verifica si existe el email.
      if(userExist){    //Si no existe vuelve a la vista del Login.
        let passOk=bcrypt.compareSync(req.body.pass,userExist.pass); //Si existe compara contraseña con la encriptada en la bd.
        if(passOk){ //Si la comparación dió ok 
          req.session.userlog=userExist;  //Coloca al usuario en session con sus propiedades.
          delete req.session.userlog.pass;  //Menos la contraseña que la borra por seguridad.
          if(req.body.rememberUser){      //Si el usuario tildo "recordar usuario"
            res.cookie('userEmail',req.body.email,{maxAge:1000*60*30});  //Coloca en cookie al usuario durante media hora
          };
          return res.redirect('/'); //Lo redirige al inicio.
        }
        return res.render('users/login',{errors:{pass:{msg:'Contraseña Incorrecta.'}}}); //Regresa a login si las contraseña es incorrecta.
      }
      return res.render('users/login',{errors:{email:{msg:'El usuario no existe.'}}}); //Regresa a login si usuario no existe.(email no existe en bd)
    };
    return res.render('users/login',{errors:errors.mapped(),old:req.body}); //Si errores no está vacio, regresa a login con errores y sólo persistencia de email.
  },
  logout:function(req,res){
    res.clearCookie('userEmail'); //borra cookies
    req.session.destroy();        //borra sesion de usuario.
    return res.redirect('/');     //Redirige al inicio.
  },
  admin:function(req,res){
    let productsQuery=userModel.findAll();
    return res.render('users/users',{'listProducts':productsQuery});
  },
  delete:function(req,res){
    userModel.destroy(+req.params.id);
    return res.redirect('/user/admin');
  },
  profile:function(req,res){
    let user=userModel.findByField('id',+req.params.id);
    return res.render('users/profile',{user});
  },
}

module.exports = userController;