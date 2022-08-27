import React from 'react';
import BarHCard from '../BarHCard/BarHCard';
import LastCard from '../LastCard/LastCard';
import './MetricBtm.css';

function MetricBtm({categories,lastUser,lastCar}){
  console.log(categories,'****** categories ******');
  return (
    <div className='MetricBtm'>
      <BarHCard categories={categories}/>
      <LastCard lastUser={lastUser} lastCar={lastCar}/>
    </div>
  )
}
export default MetricBtm;