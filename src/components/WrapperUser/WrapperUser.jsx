import React from 'react';
import './WrapperUser.css';
import UserTop from '../UserTop/UserTop';
// import UserBtm from '../UserBtm/UserBtm';
import UserBtm from '../UserBtm/UserBtm';
import { useState,useEffect} from 'react';

function WrapperUser(){
  const [users,setUsers]=useState([]); //Estado users Usuarios.
  const [count,setCount]=useState(0); //Estado count Conteo de usuarios.
  const [user,setUser]=useState({}); //Estado user. Usuario seleccionado en la tabla.
  const [row,setRow]=useState(0); //Estado fila. Fila seleccionada en la tabla.
  const [page,setPage]=useState(0); //Estado page. Página del listado de usuarios, cada página tiene
  // un tamaño predeterminado de 8 registros. 

  function getUsers() {     // Trae usuarios y conteo.
    fetch(`http://localhost:5001/api/users?page=${page}`)
      .then(response=>response.json())
      .then(data => {
        setUsers(data.users); // Array de usuarios
        setCount(data.count); // Total de usuarios
      })
      .catch(e=>{console.log(e);})
  }
  function getUser() {  //  Trae un usuario cuando se selecciona un fila row de la tabla.
    let id = users[row].id;
    fetch(`http://localhost:5001/api/users/${id}`)
      .then(response=>response.json())
      .then(data => {
        setUser(data); // Usuario
      })
      .catch(e=>{console.log(e);})
  }
  function setRowUser(i){ // Registra la fila seleccionada de la tabla.
    setRow(i);
  }
  function incPage() {  // Incrementa en uno la pagina al hacer click en siguiente.
    if(page<Math.ceil(count/8)-1){  // Comprueba si es última página.
      setPage(page+1);
    }
  }
  function decPage() {  // Incrementa en uno la pagina al hacer click en siguiente.
   if(page >= 1){ // Comprueba si es primera página.
    setPage(page-1);
   }
  }
  function destroy(id) {  // Elimina registro
    fetch(`http://localhost:5001/api/users/del/${id}`,{ method: 'DELETE' })
    .then(() =>{
      if(page>Math.ceil((count-1)/8)-1){ //Comprueba si la última pagina queda vacia .
        setPage(page-1);                 // Elimina y regresa a la anterior.
      }
      setCount(count-1);  // Disminuye el total en 1.
    }) 
  };

  useEffect(()=>{   // Trae usuarios luego del primer renderizado
		setRow(0);    // Establece el primer registro de la página actual como predeterminado para mostrar detalle.
    getUsers();
	},[page,count]);

  useEffect(()=>{   // Muestra el usuario seleccionado en la tabla.
		if(users.length!==0){
      getUser(row);  
    }
	},[users,row]);

  return (
    <div className="WrapperUser">
      <UserTop count={count??0} user={user} destroy={destroy}/> {/*Si existe users.count sino 0 y lo envia a UserTop */}
      <UserBtm users={users??[]} setRowUser={setRowUser} incPage={incPage} decPage={decPage}/> {/*Si existe users.users sino [] y lo envia a UserBtm */}
    </div>
  )
}
export default WrapperUser;