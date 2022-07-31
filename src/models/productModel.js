//Requerimientos
  const path=require('path');
  const productsDB=require('./data/products/carsDB.json');
  const idsV=require('./data/products/idsVacants.json');
  const fs=require('fs');

//Declaración de directorios y archivos de base de datos
  const productsDBPath=path.resolve('./models/data/products/carsDB.json');
  const idsVacantsPath=path.resolve('./models/data/products/idsVacants.json');
  const productsImagesPath=path.resolve('./public/products/carsImages');
  
//Modelo productModel

const productModel={
  // busca producto por campo y valor
  find:function(field,value){
    return productsDB.find(product=>product[field]===value);
  },
  //Devuelve el producto editado para actualizar
  edit:function (req){
    let id=+req.params.id;
    let product=this.find('id',id);
    let edited={id:id,...this.editBody(req.body),images:this.editImages(product,req.body,req.files)};
    return edited;
  },
  //Devuelve el producto creado para actualizar
  create:function(req){
    let id=req.params.id;
    let created={id:id,...req.body,images:this.createImages(req.files)};
    return created;
  },
  //Actualiza producto en BD; recibe operación (crear, editar, eliminar) en el caso de edit y create
  //register es el producto editado o creado, y en el caso de delete register es el id del producto
  //a borrar.
  updateDB:function(option,register){
    let productsUpdated=productsDB;
    switch(option){
      case 'edit':
        productsUpdated=productsDB.map(product=>product.id===register.id?product=register:product);
      break;
      case 'create':
        productsUpdated.push(register);
      break;
      case 'delete':
        let product=this.find('id',register);
        product.images.forEach(image=>
          image==="placeholder.svg"?0:fs.unlinkSync(`${productsImagesPath}/${image}`)
         );
        productsUpdated=productsDB.filter(product=>product.id!==register);
        this.delId(register);
      break;
    };
    fs.writeFileSync(productsDBPath,JSON.stringify(productsUpdated,null,2));
  },
  //Devuelve array de images ordenadas, sin "huecos" entre posiciones y renombradas segun posición.
  //los lugares vacios ("huecos") quedan al final del array llenos con imagen de placeholder.
  //Para realizar esto se utilizan inputs checkers que indican si el usuario modifico, borro, o no
  //hizo nada con cada imagen anterior. 
  editImages:function(product,reqbody,reqfiles){
    let imagesBefore=product.images;
    let images=[];
    let imagesVoid=[];
    let im=0;
    let iv=0;
    for(let i=1;i<8;++i){
    if(reqbody['chk'+i]==='img'+i+'c'){
      let imageFilename=reqfiles['img'+i][0].filename;
      images[im]=this.reorder(imageFilename,im,i);
      im+=1;
    }else if(reqbody['chk'+i]==='del'+i && imagesBefore[i-1]!=='placeholder.svg'){
        fs.unlinkSync(`${productsImagesPath}/${imagesBefore[i-1]}`);
        imagesVoid[iv]="placeholder.svg";
        iv+=1;
      }else if(imagesBefore[i-1]==='placeholder.svg'){
        imagesVoid[iv]="placeholder.svg";
        iv+=1;
      }else{
        let imageFilename=imagesBefore[i-1];
        images[im]=this.reorder(imageFilename,im,i);
        im+=1;
      };
    };
    images.push(...imagesVoid);
    return images;
  },
  //Devuelve el body del formulario sin los inputs checkers.
  editBody:function(reqbody){
    let d = /chk\d$/;
    const body = Object.keys(reqbody).filter((key) => !d.exec(key)).reduce((obj, key) => {
        return Object.assign(obj,{
          [key]: reqbody[key]
        });
    }, {});
    return body;
  },
  //Lo mismo que editImages pero en este caso no se necesitan checkers y la logica es más simple.
  //tambien se hace uso de la funcion reorder para renombrar las imagenes y reordenarlas en el caso
  //de que el usuario las suba salteadas.
  createImages:function(reqfiles){
      let images=[];
      let imagesVoid=[]
      let im=0;
      let iv=0;
      for(let i=1;i<8;++i){
        if(reqfiles['img'+i]){
          let imageFilename=reqfiles['img'+i][0].filename;
          images[im]=this.reorder(imageFilename,im,i);
          im+=1;
        }else{
          imagesVoid[iv]="placeholder.svg";
          iv+=1;
        }
      };
      images.push(...imagesVoid);
      return images;
  },
  //Toma id del producto eliminado y lo agrega a la lista de disponibles en idsVacants.json
  delId:function (id){
    idsV.push(id);
    fs.writeFileSync(idsVacantsPath,JSON.stringify(idsV));
  },
  //Devuelve un id nuevo. Tomandoló del los disponibles en el array idsVacants.json 
  //En el caso de que sólo haya 1 disponible, lo toma y deja uno nuevo sumandolé 1.
  newId:function (req,res,next){
    idsV.length<=1?idsV.unshift(idsV[0]+1):0;
    req.params.id=idsV.pop();
    fs.writeFileSync(idsVacantsPath,JSON.stringify(idsV));
    next();
  },
  //Funcion que renombra las imagenes luego de multer para que coincida con la posición.
  reorder:function(imageFilename,im,i){
    let imagePath=`${productsImagesPath}/${imageFilename}`;
    if(im!==i-1){
      let newFilename=imageFilename.replace(`${i}.`,`${im+1}.`);
      let newPath=`${productsImagesPath}/${newFilename}`;
      fs.renameSync(imagePath,newPath);
      imageFilename=newFilename;
    }
    return imageFilename;
  }
};

module.exports=productModel;