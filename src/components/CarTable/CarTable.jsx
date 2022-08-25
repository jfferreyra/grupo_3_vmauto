import React from 'react';
import CarRow from './CarRow/CarRow';
import './CarTable.css'
// let cars=[
//   {id:235,brand:'Marca',model:'Modelo',condition:'Nuevo',year:2020,color:'rojo'},
//   {id:235,brand:'Marca',model:'Modelo',condition:'Nuevo',year:2020,color:'rojo'},
//   {id:235,brand:'Marca',model:'Modelo',condition:'Nuevo',year:2020,color:'rojo'},
//   {id:235,brand:'Marca',model:'Modelo',condition:'Nuevo',year:2020,color:'rojo'},
//   {id:235,brand:'Marca',model:'Modelo',condition:'Nuevo',year:2020,color:'rojo'},
//   {id:235,brand:'Marca',model:'Modelo',condition:'Nuevo',year:2020,color:'rojo'},
//   {id:235,brand:'Marca',model:'Modelo',condition:'Nuevo',year:2020,color:'rojo'},
//   {id:235,brand:'Marca',model:'Modelo',condition:'Nuevo',year:2020,color:'rojo'},
//   {id:235,brand:'Marca',model:'Modelo',condition:'Nuevo',year:2020,color:'rojo'}
// ]
function CarTable({cars,setRowCar}){
  return (
    <div className='CarTable'>
      <table className="CarTable__table" id="dataTable">
        <thead className='CarTable__tableHeader'>
          <tr>
            <th>Id</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Condición</th>
            <th>Año</th>
            <th>Color</th>
          </tr>
        </thead>
        <tbody className='UserTable__body'>
          {cars.length > 0 && cars.map((car,i)=>
            <CarRow car={car} key={i} k={i} setRowCar={setRowCar}/>
          )}
        </tbody>
      </table>
    </div>
  )
}
export default CarTable;