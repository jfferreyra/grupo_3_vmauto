import React from 'react';
import './UserRow.css'
function UserRow(props){
const {id,name,surname,dni,email,phone}=props.user;
  return (
    <tr>
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