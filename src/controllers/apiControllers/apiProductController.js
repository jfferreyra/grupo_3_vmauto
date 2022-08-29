// ******************* API PRODUCT CONTROLLER ******************
const path = require('path');
const fs = require('fs');
//Directorio de imágenes de coches Path
const carImagePath = path.resolve('./public/products/carsImages');
// Modelos de base de datos
let db = require('../../database/models');
let sequelize = require('sequelize');

const apiProductController = {

  //******** api/products ----- api/cars?page=n ************
  list: function (req, res) {
    let page = 0; //Establece primera página del paginado, por defecto.
    if (req.query.page) {
      page = +req.query.page; // Si existe query establece page con el valor req.query.page
    } // Sino sigue con page=0

    // Busqueda de 8 registros correspondientes a la página establecida en page.
    let cars = db.Car.findAndCountAll({//Además cuenta el total de los registros.
      limit: 8,
      offset: 8 * page,
      include: [
        { association: 'brand' },
        { association: 'condition' },
        { association: 'color' },
      ],
      attributes: ['id', 'model', 'year'],
    });

    // CountByCategory. Cuenta la cantidad de coches por categoria.(deportivo, sedan, pickup, etc)
    let countByCategory = db.Car.findAll({
      include: [{ association: 'category', attributes: [] }],
      attributes: [
        [sequelize.literal('category.name'), 'name'],
        [sequelize.fn('COUNT', sequelize.col('Car.id')), 'count'],
      ],
      group: 'name',
    });

    // Array con principal relación 1 a muchos. Categories. El array se mapea más abajo.
    let categories = db.Category.findAll({ attributes: ['name'] });

    // Promesa que espera todas las consultas anteriores.
    Promise.all([cars, countByCategory, categories]).then((data) => {
      //Se pasan las propiedades name de cada objeto de categories(data[2]) a un array categories.
      categories = data[2].map((data) => data.name);
      //Se agrega url de detalle y array con principal 1 a muchos (categories) en cada car.
      cars = data[0].rows.map((car) => ({
        ...car.dataValues,
        categories,
        url: `http://localhost:5001/products/detail/${car.id}`,
      }));
      // Se arma la respuesta total.
      let totalResponse = {
        count: data[0].count,
        countByCategory: data[1],
        cars: cars,
      };
      return res.json(totalResponse); // Respuesta de Api con todos los datos.
    });
  },

  //************ API DETALLE DE PRODUCTO -----  api/cars/id *********
  detail: function (req, res) {
    let id = +req.params.id; //Se obtiene el id solicitado.

    // Se busca el coche.
    let car = db.Car.findByPk(id, { // Se busca por id el producto solicitado.
      include: [{ all: true }],
    });

    // Se solicitan todas las relaciones 1-n para armar un array de cada una con sus categorias.
    let brands = db.Brand.findAll({ attributes: ['name'] });
    let categories = db.Category.findAll({ attributes: ['name'] });
    let colors = db.Color.findAll({ attributes: ['name'] });
    let conditions = db.Condition.findAll({ attributes: ['name'] });
    let currencies = db.Currency.findAll({ attributes: ['name'] });
    let fuel = db.Fuel.findAll({ attributes: ['name'] });
    let transmissions = db.Transmission.findAll({ attributes: ['name'] });

    // Promesa que recibe las consultas anteriores.
    Promise.all([
      car,
      brands,
      categories,
      colors,
      conditions,
      currencies,
      fuel,
      transmissions,
    ]).then((data) => {
      if (!data[0]) {
        res.json(`ERROR: no tenemos ningun producto con el id: ${id}`);
      } else {
        let imgs = JSON.parse(data[0].imgs); // Obtiene primera imagen de producto.

        // Armado de relations objeto con todos los arrays de las relaciones.
        let relations = {
          brands: data[1].map((data) => data.name),
          categories: data[2].map((data) => data.name),
          colors: data[3].map((data) => data.name),
          conditions: data[4].map((data) => data.name),
          currencies: data[5].map((data) => data.name),
          fuel: data[6].map((data) => data.name),
          transmission: data[7].map((data) => data.name),
        };
        // Armado Final de detalle de producto, car.
        let car = {
          id: id,
          model: data[0].model,
          status: data[0].status.name,
          brand: data[0].brand.name,
          condition: data[0].condition.name,
          year: data[0].year,
          km: data[0].km,
          engine: data[0].engine,
          fuel: data[0].fuel.name,
          transmission: data[0].transmission.name,
          color: data[0].color.name,
          doors: data[0].doors,
          airbags: data[0].airbags,
          category: data[0].category.name,
          price: data[0].price,
          currency: data[0].currency.name,
          currencySymbol: data[0].currency.symbol,
          description: data[0].description,
          relations,
          image_url: `http://localhost:5001/products/carsImages/${imgs[0]}`,
        };
        res.json(car);
      }
    });
  },

  /************ API BORRADO DE PRODUCTOS/AUTOS ***********/
  delete: function (req, res) {
    let id = +req.params.id; //Obtiene id de req.params

    db.Car.findByPk(id, {
      include: [
        'brand',
        'category',
        'color',
        'condition',
        'currency',
        'fuel',
        'status',
        'transmission',
      ],
      raw: true,
      nest: true,
    }) //Busca car con id.
      .then((car) => {
        if (!car) {
          // SI NO ENCUENTRA NINGUN AUTO TIRA EL ERROR
          return res.json(`ERROR: no hay ningun producto con el id: ${id}`);
        }

        let images = JSON.parse(car.imgs); //Del car encontrado extrae array de nombres de imagenes.
        images.forEach(
          (
            image //Elimina las imagenes del directorio.
          ) =>
            image === 'placeholder.svg'
              ? 0
              : fs.unlinkSync(`${carImagePath}/${image}`)
        );

        db.Car.destroy({
          //Una vez eliminadas las imagenes, elimina el registro.
          where: { id: id },
        }).then((result) => {
          res.status(200).json('ELIMINADO CON EXITO'); //MANDA EL MENSAJE, CUANDO SE DESARROLLE EL FRON HABRIA QUE CAMBIAR A UNA REDIRECCION
        });
      });
  },
};

module.exports = apiProductController;
