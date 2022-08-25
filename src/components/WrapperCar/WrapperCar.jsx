import React from 'react';
import './WrapperCar.css';
import CarTop from '../CarTop/CarTop';
import CarBtm from '../CarBtm/CarBtm';
import { useState,useEffect} from 'react';

function WrapperCar(){
  const [cars,setCars]=useState([]); //Estado cars Coches.
  const [count,setCount]=useState(0); //Estado count Conteo de coches.
  const [car,setCar]=useState({}); //Estado car. Coche seleccionado en la tabla.
  const [row,setRow]=useState(0); //Estado fila. Fila seleccionada en la tabla.
  const [page,setPage]=useState(0); //Estado page. Página del listado de coches, cada página tiene
  // un tamaño predeterminado de 8 registros.

  function getCars() {     // Metodo trae usuarios y conteo.
    fetch(`http://localhost:5001/api/cars?page=${page}`)
      .then(response=>response.json())
      .then(data => {
        setCars(data.cars);
        setCount(data.count);
      })
      .catch(e=>{console.log(e);})
  }
  function getCar() {
    let id = cars[row].id;
    fetch(`http://localhost:5001/api/cars/${id}`)
      .then(response=>response.json())
      .then(data => {
        setCar(data);
      })
      .catch(e=>{console.log(e);})
  }
  function setRowCar(i){
    setRow(i);
  }
  function incPage() {
    if(page<Math.ceil(count/8)-1){
      setPage(page+1);
    }
  }
  function decPage() {
    if(page >= 1){
      setPage(page-1);
    }
  }

  useEffect(()=>{   // Trae usuarios luego del primer renderizado
		setRow(0);
    getCars();
	},[page]);

  useEffect(()=>{   // Trae usuarios luego del primer renderizado
		if(cars.length!==0){
      getCar(row);  
    }
	},[cars,row]);

  return (
    <div className="WrapperCar">
      <CarTop count={count??0} car={car}/>
      <CarBtm cars={cars??[]} setRowCar={setRowCar} incPage={incPage} decPage={decPage}/>
    </div>
  )
}
export default WrapperCar;