import React from 'react';
import './UserTop.css';
import UserCardW from '../UserCardW/UserCardW';
import TotalCard from '../TotalCard/TotalCard';

// let {userTitle,userCount}={userTitle:'Total Usuarios',userCount:325,}
let userTitle='Total Usuarios';

function UserTop({count}){
  return (
    <div className='UserTop'>
      <TotalCard title={userTitle} count={count} />
      <UserCardW />
    </div>
  )
}
export default UserTop;