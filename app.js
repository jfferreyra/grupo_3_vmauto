// Importación de módulos
  const path=require('path');
  const express=require('express');
  const app=express();

// Declaracion de variables

  //Puerto
  app.set('port',process.env.PORT||5000);

  //Ejs
  app.set('views', path.resolve('views'));
  app.set('view engine','ejs');

// Declaracion de rutas
//Carpeta Pública
  const pathPublic=path.resolve('public');
//Rutas
  const indexRoute=require('./routes/indexRoute');
  const searchRoute=require('./routes/searchRoute');
  const productRoute=require('./routes/productRoute');
  const carritoRoute=require('./routes/carritoRoute');
  const registerRoute=require('./routes/registerRoute');
  const loginRoute=require('./routes/loginRoute');
  const adminProductsRoute=require('./routes/adminProductsRoute');

// Uso de rutas estáticas
//Carpeta Pública
  app.use(express.static(pathPublic));
//Rutas
  app.use('/',indexRoute);
  app.use('/search',searchRoute);
  app.use('/product',productRoute);
  app.use('/carrito',carritoRoute);
  app.use('/register',registerRoute);
  app.use('/login',loginRoute);
  app.use('/adminProducts',adminProductsRoute);
  app.use('/adminProducts/addProduct',adminProductsRoute);

// Ruteo 

  app.get('/prueba',(req,res)=>res.render('prueba'));

// Carga del servidor en puerto 5000
  app.listen(app.get('port'),()=>console.log('Server Ok in port',app.get('port')));