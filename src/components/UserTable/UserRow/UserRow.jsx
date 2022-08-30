import React from 'react';
import './UserRow.css'
function UserRow({user,setRowUser,k}){
const {id,name,surname,dni,email,phone}=user;
  return (
    <tr className={`UserRow__tr-${k%2}`} id={`tr-${k}`} onClick={()=>setRowUser(k)}>
      <td className='UserRow__celd'>{id}</td>
      <td className='UserRow__celd'>{name}</td>
      <td className='UserRow__celd'>{surname}</td>
      <td className='UserRow__celd'>{dni}</td>
      <td className='UserRow__celd'>{email}</td>
      <td className='UserRow__celd'>{phone}</td>
    </tr>
  )
}
export default UserRow;