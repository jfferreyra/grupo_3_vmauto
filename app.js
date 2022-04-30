// Importación de módulos
  const path=require('path');
  const express=require('express');
  const app=express();

// Declaracion de variables
  //Puerto
  app.set('port',5000);
  //Ejs
  app.set('views',path.resolve(__dirname,'./views'))
  app.set('view engine','ejs');

// Declaracion de rutas
  const pathPublic=path.resolve(__dirname,'./public');
  // const pathHeader=path.resolve(__dirname,'./views/header.html');
  // const pathFooter=path.resolve(__dirname,'./views/footer.html');

// Uso de rutas estáticas
  app.use(express.static(pathPublic));

// Ruteo 
  app.get('/',(req,res)=>res.render('index'));
  // app.get('/footer',(req,res)=>res.render('footer'));
  app.get('/prueba',(req,res)=>res.render('prueba'));
  app.get('/product',(req,res)=>res.render('product'));
  app.get('/carrito',(req,res)=>res.render('carrito'));
  app.get('/prueba2',(req,res)=>res.render('prueba2'));

// Carga del servidor en puerto 5000
  app.listen(app.get('port'),()=>console.log('Server Ok in port',app.get('port')));