import React from 'react';
import './WrapperUser.css';
import UserTop from '../UserTop/UserTop';
import UserBtm from '../UserBtm/UserBtm';
// import { useState,useEffect} from 'react';

function WrapperUser(){
  // const [users,setUsers]=useState([]);
  
  // function getUsers() {
  //   fetch('http://localhost:5000/api/users')
  //     .then(response=>response.json())
  //     .then(data => {
  //       setUsers(data);
  //     })
  //     .catch(e=>{console.log(e);})
  // }
  // function getUser(id) {
  //   fetch('http://localhost:5000/api/user/:id')
  //     .then(response=>response.json())
  //     .then(data => {
  //       setUsers(data);
  //     })
  //     .catch(e=>{console.log(e);})
  // }

  // useEffect(()=>{
	// 	getUsers();
	// },[]);
  
  return (
    <div className="WrapperUser">
      <UserTop />
      <UserBtm />
      {/* <UserTop count={users.count??0} />
      <UserBtm users={users.rows??[]}/> */}
    </div>
  )
}
export default WrapperUser;