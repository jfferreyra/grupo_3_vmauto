//Requerimientos
  const path=require('path');
  const fs=require('fs');

//Base de datos de usuarios en el futuro será una consulta a DB.
const usersPath=path.resolve('./src/models/data/users/users.json')

//Modelo userModel

const userModel={
  // Busca usuario por campo y valor
  findAll:function (){
    return JSON.parse(fs.readFileSync(usersPath,'utf-8'));
  },
  findByField:function(field,value){
    let users=JSON.parse(fs.readFileSync(usersPath,'utf-8'));
    let user=users.find(user=>user[field]===value);
    return user; 
  },
  // Actualiza producto en user BD;
  updateDb:function(users){
    fs.writeFileSync(usersPath,JSON.stringify(users,null,2));
    return null;
  },
  destroy:function(id){
    let users=this.findAll();
    usersUpdated=users.filter(user=>user.id!==id);
    return this.updateDb(usersUpdated);
  }
};

module.exports=userModel;