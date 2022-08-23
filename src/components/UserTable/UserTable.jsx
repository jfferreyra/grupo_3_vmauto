import React from 'react';
import UserRow from './UserRow/UserRow';
import './UserTable.css'

let users=[
  {id:235,name:'Name',surname:'Surname',dni:'DNI',email:'macgiver@gmail.com',phone:'+549351458896'},
  {id:235,name:'Name',surname:'Surname',dni:'DNI',email:'macgiver@gmail.com',phone:'+549351458896'},
  {id:235,name:'Name',surname:'Surname',dni:'DNI',email:'macgiver@gmail.com',phone:'+549351458896'},
  {id:235,name:'Name',surname:'Surname',dni:'DNI',email:'macgiver@gmail.com',phone:'+549351458896'},
  {id:235,name:'Name',surname:'Surname',dni:'DNI',email:'macgiver@gmail.com',phone:'+549351458896'},
  {id:235,name:'Name',surname:'Surname',dni:'DNI',email:'macgiver@gmail.com',phone:'+549351458896'},
  {id:235,name:'Name',surname:'Surname',dni:'DNI',email:'macgiver@gmail.com',phone:'+549351458896'},
  {id:235,name:'Name',surname:'Surname',dni:'DNI',email:'macgiver@gmail.com',phone:'+549351458896'},
  {id:235,name:'Name',surname:'Surname',dni:'DNI',email:'macgiver@gmail.com',phone:'+549351458896'}
]


function UserTable(){
  
  return (
    <div className='UserTable'>
      <table className="UserTable__table" id="dataTable">
        <thead className='UserTable__tableHeader'>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>DNI</th>
            <th>Email</th>
            <th>Teléfono</th>
          </tr>
        </thead>
        <tbody className='UserTable__body'>
          {users.length > 0 && users.map((user,i)=>
            <UserRow user={user} key={i}/>
          )}
        </tbody>
      </table>
    </div>
  )
}
export default UserTable;