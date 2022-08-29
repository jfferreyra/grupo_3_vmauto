import React from 'react';
import './UserTop.css';
import UserCardW from '../UserCardW/UserCardW';
import TotalCard from '../TotalCard/TotalCard';

let userTitle='Total Usuarios';

function UserTop({count,user,destroy}){
  return (
    <div className='UserTop'>
      <TotalCard title={userTitle} count={count} />
      <UserCardW user={user} destroy={destroy}/>
    </div>
  )
}
export default UserTop;