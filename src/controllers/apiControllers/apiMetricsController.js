// ******************* API METRICS CONTROLLER ******************
// Modelos de base de datos
let db = require('../../database/models')
let sequelize = require('sequelize')

const apiMetricsController = {
    /******** Métricas de Coches ************/
    metrics: function(req,res){
        // contador de categorias
        let lastUser=db.User.findOne({
          order: [ [ 'id', 'DESC' ]],
          include: [{association:'userType',attributes:['name']},
                    {association:'location',include:[{association:'state'}]}
                   ],
          attributes: { exclude: ['pass','created_at','updated_at'] }
        });
        let lastCar=db.Car.findOne({
          order: [ [ 'id', 'DESC' ]],
          include: ['brand','condition','fuel','transmission','color','category','currency']
        });
        let totalUser = db.User.count();
        let totalCar = db.Car.count();
        let countByCategory = db.Car.findAll({                            
                                include: [{association:'category',attributes:['name']}],
                                attributes: [[sequelize.fn('COUNT','id'),'count']],
                                group:'category.name'
                              });
        let countByCondition= db.Car.findAll({                            
                                include: [{association:'condition',attributes:['name']}],
                                attributes: [[sequelize.fn('COUNT','id'),'count']],
                                group:'condition.name'
                              });
        let countByFuel = db.Car.findAll({                            
                                include: [{association:'fuel',attributes:['name']}],
                                attributes: [[sequelize.fn('COUNT','id'),'count']],
                                group:'fuel.name'
                              });
        let countByTransmission = db.Car.findAll({                            
                                include: [{association:'transmission',attributes:['name']}],
                                attributes: [[sequelize.fn('COUNT','id'),'count']],
                                group:'transmission.name'
                              });
        
        // Promesas que espera todos los findAll anteriores
        Promise.all([ totalUser,totalCar,countByCategory,countByCondition,countByFuel,countByTransmission,lastUser,lastCar])
        .then( data => {

            let totalResponse = {            // respuesta con todos los datos
              totalUser: data[0],
              totalCar: data[1],
              category: data[2],
              condition: data[3],
              fuel: data[4],
              transmission: data[5],
              lastUser:data[6],
              lastCar:data[7],
            }
            return  res.json(totalResponse) ; // envia todos los datos
        })
    },

    /************ API DETALLE DE PRODUCTO *********/
    detail: function(req,res){
      let id = +req.params.id 
      db.Car.findByPk(id,{ 
        include:['brand','category','color','condition','currency','fuel','status','transmission']
        }
      ).then(data => {
    
    if(!data){
      res.json(`ERROR: no tenemos ningun producto con el id: ${ id }`)
    } else {
        
          let imgs = JSON.parse(data.imgs);
      
          let car = {   
              id: id,
              model: data.model,
              description: data.description,
              image_url: `//localhost:5001/products/carsImages/${imgs[0]}`,
              status:data.status.name,
              brand:data.brand.name,
              condition:data.condition.name,
              year:data.year,
              km:data.km,
              engine:data.engine,
              fuel:data.fuel.name,
              transmission:data.transmission.name,
              color:data.color.name,
              doors:data.doors,
              airbags:data.airbags,
              category:data.category.name,
              price:data.price,
              currency:data.currency.name,
              currencySymbol:data.currency.symbol,
          }
          res.json(car)
      }
      })
    },
    
    /************ API BORRADO DE PRODUCTOS/AUTOS ***********/
    delete: function(req,res){
      
      let id = +req.params.id;                        //Obtiene id de req.params

        db.Car.findByPk(id, 
          {include:
            ['brand','category','color','condition','currency','fuel','status','transmission'],
            raw:true,
            nest:true
        })                                            //Busca car con id. 
          .then( car => {
            if(!car){                                 // SI NO ENCUENTRA NINGUN AUTO TIRA EL ERROR
              return  res.json(`ERROR: no hay ningun producto con el id: ${id}`)
            }

            let images=JSON.parse(car.imgs);  //Del car encontrado extrae array de nombres de imagenes.
            images.forEach(image=>            //Elimina las imagenes del directorio.
              image==="placeholder.svg"?0:fs.unlinkSync(`${carImagePath}/${image}`)
            );
           
            db.Car.destroy({                    //Una vez eliminadas las imagenes, elimina el registro.
              where:{id:id}
            })
              .then( result => {
                res.status(200).json('ELIMINADO CON EXITO');  //MANDA EL MENSAJE, CUANDO SE DESARROLLE EL FRON HABRIA QUE CAMBIAR A UNA REDIRECCION
              });
            }
          )      
    }
}

module.exports = apiMetricsController;
