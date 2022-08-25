import React from 'react';
import './CarRow.css'
function CarRow({car,setRowCar,k}){
  console.log(car,'****car*****');
  const {id,brand,model,condition,year,color}=car;
  return (
    <tr onClick={()=>setRowCar(k)}>
      <td className='CarRow__celd'>{id}</td>
      <td className='CarRow__celd'>{brand.name}</td>
      <td className='CarRow__celd'>{model}</td>
      <td className='CarRow__celd'>{condition.name}</td>
      <td className='CarRow__celd'>{year}</td>
      <td className='CarRow__celd'>{color.name}</td>
    </tr>
  )
}
export default CarRow;