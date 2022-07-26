// ****************************** USUARIO - CONTROLLER *************************************************
//***************** Importación *******************************
  //Base de datos
  const path = require('path');
  const fs=require('fs');
  const db = require('../database/models'); //Modelos y relaciones

  //bcrypt
  const bcrypt=require('bcryptjs');
  const { promiseImpl } = require('ejs');

//************************************** Controller **************************************************

const cartController={
  cart: function(req, res) {
    let id=+req.session.user.id; //Obtiene id de req.session de usuario logueado.
    let cart=db.Cart.findAll({
      where: { user_id: id }, //Busca todos los cars que compro el usuario en la tabla pivot
      include:[   //Incluye el objeto car con sus propiedades
        {association:'car',
          include:[   //A su vez car incluye las propiedades de sus propiedades que estan en tablas foraneas.
            {association:'brand'},
            {association:'condition'},
            {association:'fuel'},
            {association:'transmission'},
            {association:'color'},
            {association:'category'},
            {association:'currency'}
          ]
        }
      ]
    });
    let hotcars=db.Car.findAll({  //Busca de todos los autos los que estan en promoción.
      where: { status_id: 3 },
      include:[   //Incluye las propiedades de las propiedades que estan en tablas foraneas.
        {association:'brand'},
        {association:'condition'},
        {association:'fuel'},
        {association:'transmission'},
        {association:'color'},
        {association:'category'},
        {association:'currency'}
      ]
    });   
  Promise.all([cart,hotcars]) // Recibe las dos promesas y envia a vista carrito
  .then( ([cart,hotcars])=> {
        res.render('carrito', {cart,hotcars});
      });
  },
  addCar:function (req,res) {
    let user_id=+req.session.user.id;
    let car_id=+req.body.carId;
    console.log(user_id,car_id);
    db.Cart.create({
      user_id,
      car_id
    })
      .then( result=> {
        return res.redirect(`/carrito/${user_id}`);
      });
  },
  delCar:function (req,res) {
    let user_id=+req.session.user.id;
    let car_id=+req.body.carId;
    console.log(user_id,car_id);
    db.Cart.destroy({
      where:{
        user_id,
        car_id
      }
    })
      .then( result=> {
        return res.redirect(`/carrito/${user_id}`);
      });
  }
}

module.exports = cartController;