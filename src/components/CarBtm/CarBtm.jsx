import React from 'react';
import CarTable from '../CarTable/CarTable';
import './CarBtm.css';

function CarBtm(){
  return (
    <div className='CarBtm'>
      <CarTable/>
      <div className="CarBtm__buttons">
        <div className="CarBtm__before">Anterior</div>
        <div className="CarBtm__after">Siguiente</div>
      </div>
    </div>
  )
}
export default CarBtm;