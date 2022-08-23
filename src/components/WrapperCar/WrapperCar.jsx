import React from 'react';
import './WrapperCar.css';
import CarTop from '../CarTop/CarTop';
import CarBtm from '../CarBtm/CarBtm';

function WrapperCar(){
  return (
    <div className="WrapperCar">
      <CarTop />
      <CarBtm />
    </div>
  )
}
export default WrapperCar;