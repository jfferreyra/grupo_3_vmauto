// ******************* API METRICS CONTROLLER ******************
// Modelos de base de datos
let db = require('../../database/models');
let sequelize = require('sequelize');

const apiMetricsController = {
  /******** Métricas de Coches ************/
  metrics: function (req, res) {
    // Ultimo usuario.
    let lastUser = db.User.findOne({
      order: [['id', 'DESC']],
      include: [
        { association: 'userType', attributes: ['name'] },
        { association: 'location', include: [{ association: 'state' }] },
      ],
      attributes: { exclude: ['pass', 'created_at', 'updated_at'] },
    });
    // Último Producto.
    let lastCar = db.Car.findOne({
      order: [['id', 'DESC']],
      include: [{ all: true }],
    });
    // Total de usuarios y productos.
    let totalUser = db.User.count();
    let totalCar = db.Car.count();

    // Contador de categorias
    let countByCategory = db.Car.findAll({
      include: [{ association: 'category', attributes: [] }],
      attributes: [
        [sequelize.literal('category.name'), 'name'],
        [sequelize.fn('COUNT', 'id'), 'count'],
      ],
      group: 'name',
    });
    let countByCondition = db.Car.findAll({
      include: [{ association: 'condition', attributes: [] }],
      attributes: [
        [sequelize.literal('condition.name'), 'name'],
        [sequelize.fn('COUNT', 'id'), 'count'],
      ],
      group: 'name',
    });
    let countByFuel = db.Car.findAll({
      include: [{ association: 'fuel', attributes: [] }],
      attributes: [
        [sequelize.literal('fuel.name'), 'name'],
        [sequelize.fn('COUNT', 'id'), 'count'],
      ],
      group: 'name',
    });
    let countByTransmission = db.Car.findAll({
      include: [{ association: 'transmission', attributes: [] }],
      attributes: [
        [sequelize.literal('transmission.name'), 'name'],
        [sequelize.fn('COUNT', 'id'), 'count'],
      ],
      group: 'name',
    });

    // Promesas que espera todas las consultas anteriores
    Promise.all([
      totalUser,
      totalCar,
      countByCategory,
      countByCondition,
      countByFuel,
      countByTransmission,
      lastUser,
      lastCar,
    ]).then((data) => {
      let totalResponse = {
        // respuesta con todos los datos
        totalUser: data[0],
        totalCar: data[1],
        category: data[2],
        condition: data[3],
        fuel: data[4],
        transmission: data[5],
        lastUser: data[6],
        lastCar: data[7],
      };
      return res.json(totalResponse); // Respuesta de api con las métricas
    });
  },
};

module.exports = apiMetricsController;
