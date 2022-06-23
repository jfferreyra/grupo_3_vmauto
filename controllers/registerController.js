const fs = require('fs');
const path = require('path');

// PASSWORD ENCRIPTADA - sprint 6
var bcrypt = require('bcryptjs');


/* Requerimos base de datos users.json */
const usersFilePath = path.join(__dirname, '../models/data/users/users.json');
/* parea el archivo */
const usersParsed = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));


// registerController = Users
const registerController={
  register: function(req, res) {
    res.render('users/register');
  },
  login:function(req, res) {
    res.render('users/login');
  },

  create: function(req,res){  
    let image
 		// image = 'default-image.png'
    //console.log(req.body)

    let id
 

    if(usersParsed.length === 0){
      id = 0
      console.log('userParsed:',usersParsed)
    } else {
      // probar metodo pop usersParsed.pop()
      id = usersParsed[usersParsed.length - 1].id + 1
    }

    // chekea que no haya 2 usuarios con el mismo mail
    //let userInDB = registerController.findByField('email', req.body.email)
    // con leo
    // if(userInDB){

    // }

    let newUser = {
      id: id,
      ...req.body,
      password: bcrypt.hashSync(req.body.password,10)
    }
			
		// }
		usersParsed.push(newUser)
	  fs.writeFileSync(usersFilePath, JSON.stringify(usersParsed, null, 2))
		res.redirect('/')

    return newUser

  },

  getData: function() {
    return JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'))
  },

  findAll: function(){
    return this.getData()
  },

  findByPk: function(id){
    let allUsers = this.findAll();
    let userFound = allUsers.find(oneUser => oneUser.id === id);
    return userFound;
  },

   findByField: function(field,text){
    let allUsers = this.findAll();
    let userFound = allUsers.find(oneUser => oneUser[field] === text);
    return userFound;
  },
  delete: function(id){
    let allUsers = this.findAll()
    let finalUsers = allUsers.filter(oneUser => oneUser.id !== id);
	  fs.writeFileSync(usersFilePath, JSON.stringify(finalUsers, null, 2))
    return true
  }
}

console.log(registerController.delete(1))

module.exports = registerController;


