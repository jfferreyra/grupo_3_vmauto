//***************** Importación *******************************
  //Base de datos
  const db = require('../../database/models'); //Modelos y relaciones

const userMware={
  admin:function(req,res,next){
    let user=req.session.user??false;  //Usuario de session toma por defecto false
    if(!user){  //Sino existe sesion redirije a login
      return res.redirect('/user/login');
    }
    if(user.user_type_id!==2 && user.user_type_id!==4){ //verifica que sea administrador general o de usuario
      return res.redirect('/'); //si es asi pasa sino redirije al inicio
    }
    next()
  },
  productAdmin:function(req,res,next){
    let user=req.session.user??false;  //Usuario de session toma por defecto false
    if(!user){
      return res.redirect('/user/login');
    }
    if(user.user_type_id!==2 && user.user_type_id!==3){
      return res.redirect('/');
    }
    next()
  },
  register:function(req,res,next){
    let user=req.session.user ?? false;  //Usuario de session toma por defecto false
    if(user.user_type_id!==2 && user.user_type_id!==4 && user!==false){
      return res.redirect('/');
    }
    next()
  },
  edit:function(req,res,next){
    let user=req.session.user??false;  //Usuario de session toma por defecto false
    if(!user){  //si no existe usuario va al inicio
      return res.redirect('/');
    }
    if(user.user_type_id!==2&&user.user_type_id!==4){ //Si usuario no es administrador de usuarios
      if(user.id!==+req.params.id){ //o su id no es igual al que quiere modificar entonces se redirige al inicio
        return res.redirect('/');
      }
    }
    next()
  },
  cart:function(req,res,next){
    let user = req.session.user ?? false;  //Usuario de session toma por defecto false
    if(!user){  //si no existe usuario va al inicio
      return res.redirect('/');
    }
    if(user.user_type_id===2||user.user_type_id===3||user.user_type_id===4||user.id!==+req.params.id){ //Si usuario es administrador no tiene carrito
      return res.redirect('/');
    }
    next()
  },
  addCar:function(req,res,next){
    let user=req.session.user??false;  //Usuario de session toma por defecto false
    if(!user){  //si no existe usuario va al inicio
      return res.redirect('/user/login');
    }
    if(user.user_type_id===2||user.user_type_id===3||user.user_type_id===4){ //Si usuario es administrador no tiene carrito
      return res.redirect('/');
    }
    next()
  },
  productRegister:function(req,res,next){
    let user=req.session.user??false;  //Usuario de session toma por defecto false
    if(user.user_type_id!==2&&user.user_type_id!==3){
      return res.redirect('/');
    }
    next()
  },
  auth:function(req,res,next){
    if(!req.session.user){
      return res.redirect('/user/login');
    }
    next()
  },
  guest:function(req,res,next){
    if(req.session.user){
      return res.redirect('/');
    }
    next()
  },
  logued:function(req,res,next){
    let userId=req.cookies.userId; //Obtiene la id de la cookie si es que existe
    if(userId&&!req.session.user){//Si existe userId, busca en base de datos al usuario con id
      db.User.findByPk(userId,{include:['userType']})
        .then( user=> {
          req.session.user={}; //se crea la propiedad user en req.session
          req.session.user.id=user.id;//coloca en session id,img,y tipo de usuario
          req.session.user.img=user.img;
          req.session.user.user_type_id=user.user_type_id;
          res.locals.userlog=req.session.user;
        });
      }else{
      res.locals.userlog=req.session.user;
      }
    next();
  }
}

module.exports=userMware;