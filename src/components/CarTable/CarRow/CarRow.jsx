import React from 'react';
import './CarRow.css'
function CarRow(props){
const {id,brand,model,condition,year,color}=props.car;
  return (
    <tr>
      <td className='CarRow__celd'>{id}</td>
      <td className='CarRow__celd'>{brand}</td>
      <td className='CarRow__celd'>{model}</td>
      <td className='CarRow__celd'>{condition}</td>
      <td className='CarRow__celd'>{year}</td>
      <td className='CarRow__celd'>{color}</td>
    </tr>
  )
}
export default CarRow;