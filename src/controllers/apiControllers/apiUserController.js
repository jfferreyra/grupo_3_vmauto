let db = require('../../database/models')

const apiUserController = {
    //*******   LISTAR    *********// lista todos los usuarios
    list: function(req,res){
      let page=+req.query.page;
      db.User.findAndCountAll({
        limit:8,
        offset:8*page,
        attributes:['id','name','surname','dni','email','phone'],
        // attributes: { exclude: ['pass','birth','dni','user_type_id','created_at','updated_at','phone','address','location_id']}
      })
      .then( data  => {  //users
          let response = {
              count: data.count, //users.length
              users: data.rows    //users
          }
        return  res.json(response) ; //res.json(users)
      })
      .catch( err => {
        return res.send(err);
      });
    },

    /******** DETALLE DE PRODUCTO  ***********/
    detail: function(req,res){
        let id = +req.params.id 
        db.User.findByPk(id,{
          include: [{association:'location',include:[{association:'state'}]},'userType'],
          attributes: { exclude: ['pass','created_at','updated_at'] }
        }
        )
        .then(data => {
            if(!data){
                res.json(`ERROR: no se encontro ningun usuario con el id: ${id}`)
            } else {
                let user = {
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
                    image_url: `//localhost:5001/users/images/${data.img}`
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

            // {user.imgs.length > 1 && (                   // SI ENCUENTRA UN PRODUCTO PROCEDE 
            //   JSON.parse(user.imgs).forEach( image =>   // Elimina las imagenes del directorio.
            //         image === "placeholder.svg" ? 0 : fs.unlinkSync(`${ userImagePath }/${ image }`)
            //   )
            // )}
           
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