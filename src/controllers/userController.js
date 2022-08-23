// ****************************** USUARIO - CONTROLLER *************************************************
//***************** Importación *******************************
  //Base de datos
  const path = require('path');
  const fs=require('fs');
  const db = require('../database/models'); //Modelos y relaciones
  const userImagePath=path.resolve('./public/users/images') //Carpeta imagenes de usuario

  //ValidationsResults
  const {validationResult}=require('express-validator');

  //Multer Upload
  const upload = require('../middlewares/uploadMulter/userUploadMulter');

  //bcrypt
  const bcrypt=require('bcryptjs');

// ************************ Funciones Adicionales. **********************************
  //Renombrado de imagen con id del registro.
  function imgId(id,image,img=null) {
    if(image){ //si imagen es distinto de false entonces
      let userImageName=image;  //nombre de imagen actual
      let imagePath=`${userImagePath}/${userImageName}`;  //direccion de imagen actual
      let newFilename=`${id}-img${path.extname(userImageName)}`; //nuevo nombre de imagen con id
      let newImagePath=`${userImagePath}/${newFilename}`;  //direccion de nuevo nombre de imagen
      fs.renameSync(imagePath,newImagePath);  // Se renombra imagen de actual por imagen con id.
      img=newFilename;  //guarda nuevo nombre de imagen con id en img
    }else if(img){
      fs.unlinkSync(`${userImagePath}/${img}`)
      img=null;
    }
    return img;
  };
  // Crea Usuario a partir del body. Muestra equivalencia entre campos del form y la tabla de users.
  function bodyUser(body,img=null) {
    user={
      name:body.name,
      surname:body.surname,
      dni:body.dni,
      birth:body.birth,
      email:body.email,
      location_id:body.location,
      address:body.address,
      phone:body.phone,
      pass:bcrypt.hashSync(body.pass,10),
      img:img
    };
    return user;
  };
  
  
    
// ***************************** CONTROLADOR ****************************************
const userController={
  //************* VISTA LOGIN DE USUARIO ******************* 
  login: function(req, res) {
    res.render('users/login');
  },
  //************* LOGIN DE USUARIO *************************
  logued: function(req,res){
    const errors=validationResult(req);   //Errores de validacion
    if(!errors.isEmpty()){    //Si hay errores regresa a login con errores y persistencia de email
      return res.render('users/login',{errors:errors.mapped(),old:req.body}); 
    } //Sino continua con la busqueda del usuario
    db.User.findOne({where:{email:req.body.email}},{include:['userType']}) 
      .then( user=> { //Incluye el tipo de usuario. (Usuario,administrador general, administrador usuarios, administrador productos.)
        if(user){
          let passOk=bcrypt.compareSync(req.body.pass,user.pass); //Compara password con la de la bd.
          if(passOk){ //Si la comparación dió ok coloca id, img y user_type_id en session
            req.session.user={}; //se crea la variable user en req.session
            req.session.user.id=user.id;
            req.session.user.img=user.img; 
            req.session.user.user_type_id=user.user_type_id; 
            if(req.body.rememberUser){      //Si el usuario tildo "recordar usuario"
              res.cookie('userId',user.id,{maxAge:1000*60*30}); //Coloca en cookie al usuario durante media hora 
            } 
            return res.redirect('/'); //Lo redirige al inicio.
          } //Regresa a login si las contraseña es incorrecta.
          return res.render('users/login',{errors:{pass:{msg:'Contraseña Incorrecta.'}},old:{email:req.body.email}}); 
        } //Regresa a login si usuario no existe.(email no existe en bd)
        return res.render('users/login',{errors:{email:{msg:'El usuario no existe.'}}}); 
      });
  },
  //************* VISTA REGISTRO USUARIO ******************
  register: function(req, res) {
    let states=db.State.findAll();
    let locations=db.Location.findAll();
    Promise.all([states,locations])
    .then(([states,locations])=> {
      res.render('users/register',{states,locations,userLocations:[{id:0,name:'Elija primero la provincia'}]});
    });
  },
  //************* REGISTRO USUARIO *************************
  registered:function(req,res) {
    let oldImg=req.file?.filename ?? req.body?.oldImg ?? null;
    let user=bodyUser(req.body,oldImg);
    const errors=validationResult(req);
    if(!errors.isEmpty()){               //Si hay errores vuelve al formulario y persiste campos correctos y devuelve errores.
      user.stateId=+req.body.state;
      user.locationId=+req.body.location;
      let states=db.State.findAll();
      let locations=db.Location.findAll();
      Promise.all([states,locations])
      .then(([states,locations])=> {
        let userLocations=locations.filter(location=>location.state_id===user.stateId);  //Obtiene las localidades de la provincia del usuario en un array
        return res.render('users/register',{errors:errors.mapped(),old:user,oldImg,states,locations,userLocations});
      });
    }else{//Sino sigue con el proceso de creacion de usuario.
      db.User.findOrCreate({    //Pregunta si existe usuario con email, sino lo crea.
        where:{email:req.body.email},
        defaults:user
      })
        .then(([user, created])=> { //user es el registro creado o existente.
          if(created){    //si "created" es true entonces significa que no existía y fue creado.
            let id=user.id; //Obtiene el id del usuario recién creado.
            let img=imgId(id,user.img); //Renombra img con el id del usuario.
            db.User.update(             //Actualiza el registro de usuario con el nuevo nombre de img.
              {img:img},
              {where:{id:id}}
            )
              .then(() => {
                return res.redirect('/user/login'); //Redirige al login.
              });
          }else{
            let states=db.State.findAll();
            let locations=db.Location.findAll();
            Promise.all([states,locations])
              .then(([states,locations])=> {
              return res.render('users/register',{states,locations,userLocations:[{id:0,name:'Elija primero la provincia'}],emailerr:1});
              }); // Si el usuario no existe, regresa al formulario de registro.
          }
        });
      }
  },
  //************* VISTA EDICION USUARIO ********************
  edit: function(req, res) {
    let id=+req.params.id;      //Obtiene id de la url
    let user=db.User.findByPk(id,{include:['location']}); //Busca usuario e incluye localidad.
    let states=db.State.findAll();    //Busca todas las provincias en un array.
    let locations=db.Location.findAll();  // Busca todas las localidades de todas las provincias
    Promise.all([user,states,locations])    
    .then(([user,states,locations])=> {
      user.stateId=user.location.state_id;  //Obtiene el id de la provincia del usuario.
      user.locationId=user.location.id;
      let userLocations=locations.filter(location=>location.state_id===user.stateId);  //Obtiene las localidades de la provincia del usuario en un array
      res.render('users/edit',{old:user,oldImg:user.img,states,locations,userLocations}); //Muestra edit.
    });
  },
  //************* EDICION USUARIO **************************
  edited:function(req,res) {
    let id=+req.params.id;    //Obtiene el id de la url.
    let oldImg=req.file?.filename ?? req.body?.oldImg ?? null;
    let user=bodyUser(req.body,oldImg);
    const errors=validationResult(req);
    if(!errors.isEmpty()){               //Si hay errores vuelve al formulario y persiste campos correctos y devuelve errores.
      user.stateId=+req.body.state;
      user.locationId=+req.body.location;
      let states=db.State.findAll();
      let locations=db.Location.findAll();
      Promise.all([states,locations])
      .then(([states,locations])=> {
        let userLocations=locations.filter(location=>location.state_id===user.stateId);  //Obtiene las localidades de la provincia del usuario en un array
        user.id=id;
        return res.render('users/edit',{errors:errors.mapped(),old:user,oldImg,states,locations,userLocations});
      });
    } else{//Sino sigue con el proceso de edición de usuario.
      user.img=imgId(id,user.img,req.session.user.img); //Renombra img con el id del usuario.
      db.User.update(
        {...user},
        {where:{id:id}}
      )
        .then(() => {
          res.clearCookie('userId'); //borra cookies
          req.session.destroy();        //borra sesion de usuario.
          return res.redirect('/user/login'); //Redirecciona a vista profile con usuario logueado.
        });
      }
  },
  upload:upload.single('img'),
  //************* LOGOUT DE USUARIO ************************
  logout:function(req,res){
    res.clearCookie('userId'); //borra cookies
    req.session.destroy();        //borra sesion de usuario.
    return res.redirect('/');     //Redirige al inicio.
  },
  //************* ADMINISTRADOR DE USUARIOS ****************
  admin:function(req,res){
    db.User.findAll({
      include:[
        {association:'location',
          include:[{association:'state'}]
        },
        {association:'userType'}
      ]
    })
      .then( users=> {
        return res.render('users/users',{users});
      });
  },
  //************* ELIMINA USUARIO **************************
  delete:function(req,res){
    let id=+req.params.id;  //Obtiene id de req.params de usuario
    db.User.findByPk(id)     //Busca el usuario con id. 
      .then( user=> {
        let image=user.img;  //Del usuario obtiene el nombre de imagen de avatar.
        if(image){
          fs.unlinkSync(`${userImagePath}/${image}`)  //Elimina imagen de avatar de la carpeta users/images
        };
        db.User.destroy({    //Una vez eliminada la imagen, elimina el registro.
          where:{id:id}
        })
          .then( result=> {
            return res.redirect('/user/admin'); //Redirige al administrador de usuarios.
          });
      });
  },
  //************* PERFIL DE USUARIO ************************
  profile:function(req,res){
    let id=+req.session.user.id; //Obtiene id de req.session de usuario logueado.
    db.User.findByPk(id,{include:['location']})    //Busca el usuario en la bd.
      .then( user=> {
        delete user.dataValues.pass    //Saca pass del usuario.
        db.State.findByPk(user.location.state_id) 
          .then( state=> { //busca en la tabla states, el state con id igual a state_id de la location del usuario.
            user.stateName=state.name;//coloca el nombre del state en una propiedad nueva de user stateName
            return res.render('users/profile',{user}); //Renderiza vista profile con usuario logueado.
          });
      });
  },
}

module.exports = userController;