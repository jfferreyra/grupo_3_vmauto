import React from 'react';
import UserTable from '../UserTable/UserTable';
import './UserBtm.css';

function UserBtm({users}){
  return (
    <div className='UserBtm'>
      <UserTable users={users}/>
      <div className="UserBtm__buttons">
        <div className="UserBtm__before">Anterior</div>
        <div className="UserBtm__after">Siguiente</div>
      </div>
    </div>
  )
}
export default UserBtm;