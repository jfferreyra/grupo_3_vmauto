import React from 'react';
import './WrapperUser.css';
import UserTop from '../UserTop/UserTop';
import UserBtm from '../UserBtm/UserBtm';
import { useState,useEffect} from 'react';

function WrapperUser(){
  const [users,setUsers]=useState([]); //Variable de usuarios, estado users
  
  function getUsers() {     // Metodo trae usuarios y conteo.
    fetch('http://localhost:5001/api/users')
      .then(response=>response.json())
      .then(data => {
        setUsers(data);
      })
      .catch(e=>{console.log(e);})
  }
  // function getUser(id) {
  //   fetch('http://localhost:5000/api/user/:id')
  //     .then(response=>response.json())
  //     .then(data => {
  //       setUsers(data);
  //     })
  //     .catch(e=>{console.log(e);})
  // }

  useEffect(()=>{   // Trae usuarios luego del primer renderizado
		getUsers();
	},[]);
  
  return (
    <div className="WrapperUser">
      <UserTop count={users.count??0} /> {/*Si existe users.count sino 0 y lo envia a UserTop */}
      <UserBtm users={users.users??[]}/> {/*Si existe users.users sino [] y lo envia a UserBtm */}
    </div>
  )
}
export default WrapperUser;