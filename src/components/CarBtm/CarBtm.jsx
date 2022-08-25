import React from 'react';
import CarTable from '../CarTable/CarTable';
import './CarBtm.css';

function CarBtm({cars,setRowCar,incPage,decPage}){
  return (
    <div className='CarBtm'>
      <CarTable cars={cars} setRowCar={setRowCar}/>
      <div className="CarBtm__buttons">
        <div className="CarBtm__before" onClick={decPage}>Anterior</div>
        <div className="CarBtm__after" onClick={incPage}>Siguiente</div>
      </div>
    </div>
  )
}
export default CarBtm;