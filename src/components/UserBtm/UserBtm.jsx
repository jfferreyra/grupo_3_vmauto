import React from 'react';
import UserTable from '../UserTable/UserTable';
import './UserBtm.css';

function UserBtm({users,setRowUser,incPage,decPage}){
  return (
    <div className='UserBtm'>
      <UserTable users={users} setRowUser={setRowUser}/>
      <div className="UserBtm__buttons">
        <div className="UserBtm__before" onClick={decPage}>Anterior</div>
        <div className="UserBtm__after" onClick={incPage}>Siguiente</div>
      </div>
    </div>
  )
}
export default UserBtm;