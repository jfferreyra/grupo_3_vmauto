const path = require('path');
const fs=require('fs');
const userImagePath=path.resolve('./public/users/images') //Carpeta imagenes de usuario
let db = require('../../database/models')

const apiUserController = {
  //*******   Api Users -----  api/users?page=n    *********
  list: function(req,res){
    let page=0; //Establece primera página del paginado, por defecto.
    if (req.query.page) {
      page=+req.query.page; // Si existe query establece page con el valor req.query.page
    }// Sino sigue con page=0
  
    // Busqueda de 8 registros correspondientes a la página establecida en page.
    db.User.findAndCountAll({//Además cuenta el total de los registros.
      limit:8,
      offset:8*page,
      attributes:['id','name','surname','dni','email','phone'],
    })
    .then( data  => {  //users
      let response = {  //Se arma la respuesta de api
        count: data.count, //Cantidad de usuarios
        users: data.rows   //Usuarios
      }
      return  res.json(response) ; //Respuesta de api
    })
    .catch( err => {
      return res.send(err);
    });
  },

  /******** Detalle de Usuario ----- api/users/id  ***********/
  detail: function(req,res){
        
    let id = +req.params.id //Se obtiene el id solicitado.

    // Se busca el usuario.
    db.User.findByPk(id,{ // Se busca por id el usuario solicitado.
      include: [{association:'location',include:[{association:'state'}]},'userType'],
      attributes: { exclude: ['pass','created_at','updated_at'] }
    })
    .then(data => {
      if(!data){
        res.json(`ERROR: no se encontro ningun usuario con el id: ${id}`)
      } else {
        let user = { //Armado de usuario para respuesta.
          id: data.id,
          name: data.name,
          surname: data.surname,
          dni: data.dni,
          birth: data.birth,
          email: data.email,
          address: data.address,
          type: data.userType.name,
          phone: data.phone,
          location: data.location.name,
          state:data.location.state.name,
          image_url: `http://localhost:5001/users/images/${data.img}`
        }
        res.json(user)
      }
    })
  },

    /********* BORRAR USUARIO *********/
    delete: function(req,res){

        let id = +req.params.id;                //Obtiene id de req.params

        db.User.findByPk(id)                     //Busca user con id. 
          .then( user => {

            if(!user){                           // SI NO ENCUENTRA NINGUN AUTO TIRA EL ERROR
              return  res.json(`ERROR: no hay ningun usuario con el id: ${id}`)
            }

            let image=user.img;  //Del usuario obtiene el nombre de imagen de avatar.
            if(image){
              fs.unlinkSync(`${userImagePath}/${image}`)  //Elimina imagen de avatar de la carpeta users/images
            };
           
            db.User.destroy({                    //Una vez eliminadas las imagenes, elimina el registro.
              where:{id:id}
            })
              .then( result => {

                res.json('ELIMINADO CON EXITO');  //MANDA EL MENSAJE, CUANDO SE DESARROLLE EL FRON HABRIA QUE CAMBIAR A UNA REDIRECCION
              });
            }
          )      
    }
}

module.exports = apiUserController