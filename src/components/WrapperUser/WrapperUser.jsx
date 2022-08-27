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

  function getUsers() {     // Metodo trae usuarios y conteo.
    fetch(`http://localhost:5001/api/users?page=${page}`)
      .then(response=>response.json())
      .then(data => {
        setUsers(data.users);
        setCount(data.count);
      })
      .catch(e=>{console.log(e);})
  }
  function getUser() {
    let id = users[row].id;
    fetch(`http://localhost:5001/api/users/${id}`)
      .then(response=>response.json())
      .then(data => {
        setUser(data);
      })
      .catch(e=>{console.log(e);})
  }
  function setRowUser(i){
    setRow(i);
  }
  function incPage() {
    if(page<Math.ceil(count/8)-1){
      setPage(page+1);
    }
  }
  function decPage() {
   if(page >= 1){
    setPage(page-1);
   }
  }
  function destroy(id) {
    fetch(`http://localhost:5001/api/users/del/${id}`,{ method: 'DELETE' })
    .then(() =>{
      if(page>Math.ceil((count-1)/8)-1){
        setPage(page-1);
      }
      setCount(count-1);
    }) 
  };

  useEffect(()=>{   // Trae usuarios luego del primer renderizado
		setRow(0);
    getUsers();
	},[page,count]);

  useEffect(()=>{   // Trae usuarios luego del primer renderizado
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