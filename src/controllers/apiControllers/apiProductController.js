// ******************* API PRODUCT CONTROLLER ******************
const path = require('path');
const fs=require('fs');
//Directorio de imágenes de coches Path
const carImagePath=path.resolve('./public/products/carsImages')
// Modelos de base de datos
let db = require('../../database/models')
let sequelize = require('sequelize')

const apiProductController = {
    /******** API LISTA DE PRODUCTOS/AUTOS CON RELACIONES Y CATEGORIAS ************/
    list: function(req,res){
      let page=+req.query.page; //Número de página enviado por query /cars?page=n
        // Carga tablas foráneas para las listas del formulario.
        // Busca todas las categorias y relaciones
        // UTILIZO EL ATTRIBUTES -> EXCLUDE PARA SACAR LO QUE NO QUIERO
        let brands = db.Brand.findAll({ attributes: { exclude: ['id'] } });  
        let categories = db.Category.findAll( {attributes: { exclude: ['id'] } });
        let colors = db.Color.findAll({ attributes: { exclude: ['id'] } });
        let conditions = db.Condition.findAll({ attributes: { exclude: ['id'] } });
        let currencies = db.Currency.findAll({ attributes: { exclude: ['id'] } });
        let fuel = db.Fuel.findAll({ attributes: { exclude: ['id'] } });
        let cars = db.Car.findAndCountAll({
                      limit:8,
                      offset:8*page,
                      include: [{association:'brand'},{association:'condition'},{association:'color'}],
                      attributes:['id','model','year']
                    })

        // OTRA FORMA DE TRAER LO QUE YO QUIERO, USANDO ATTRIBUTES -> poniendo el valor de la key/clave que quiero
        let transmissions = db.Transmission.findAll({ attributes: ['name'] });

        // contador de categorias
        let countByCategory = db.Car.findAll({                            
                                include: [{association:'category',attributes:['name']}],
                                attributes: [[sequelize.literal("category.name"), "cat"],
                                            [sequelize.fn('COUNT',sequelize.col('Car.id')),'count']                       
                                            ],
                                group:'cat'
                              });
        
        // Promesas que espera todos los findAll anteriores
        Promise.all([ cars, countByCategory, brands, categories, colors, conditions, currencies, fuel, transmissions ])
        .then( data => {
            let totalResponse = {            // respuesta con todos los datos
              count: data[0].count,
              cars: data[0].rows,
              countByCategory: data[1],
              relations: {
                  brands: data[2],
                  categories: data[3],
                  colors: data[4],
                  conditions: data[5],
                  currencies: data[6],
                  fuel: data[7],
                  transmission: data[8]
              }
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

module.exports = apiProductController;

/*
        status_id:1,
        brand_id:body.brand,
        model:body.model,
        condition_id:body.condition,
        year:body.year,
        km:body.km,
        engine:body.engine,
        fuel_id:body.fuel,
        transmission_id:body.transmission,
        color_id:body.color,
        doors:body.doors,
        airbags:body.airbags,
        category_id:body.category,
        price:body.price,
        currency_id:body.currency,
        description:body.description,



*/