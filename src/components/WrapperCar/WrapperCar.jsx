import React from 'react';
import './WrapperCar.css';
import CarTop from '../CarTop/CarTop';
import CarBtm from '../CarBtm/CarBtm';
import { useState, useEffect } from 'react';

function WrapperCar() {
  const [cars, setCars] = useState([]); //Estado cars Coches.
  const [count, setCount] = useState(0); //Estado count Conteo de coches.
  const [car, setCar] = useState({}); //Estado car. Coche seleccionado en la tabla.
  const [row, setRow] = useState(0); //Estado fila. Fila seleccionada en la tabla.
  const [page, setPage] = useState(0); //Estado page. Página del listado de coches, cada página tiene
  // un tamaño predeterminado de 8 registros.

  function getCars() {
    // Metodo trae usuarios y conteo.
    fetch(`http://localhost:5001/api/cars?page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        setCars(data.cars);
        setCount(data.count);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  function getCar() {
    let id = cars[row].id;

    let e = document.querySelector('.CarRow__selectedRow'); // Obtiene la fila con clase selected si es que existe.
    if (e !== null) {
      // Sino existe no remueve clase seleccionada.(e es null)
      e.classList.remove('CarRow__selectedRow');
    }
    e = document.getElementById(`CarRow__tr-${row}`); // Obtiene fila seleccionada por usuario
    e.classList.add('CarRow__selectedRow'); // Le coloca clase de fila seleccionada

    fetch(`http://localhost:5001/api/cars/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setCar(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  function setRowCar(i) {
    setRow(i);
  }
  function incPage() {
    if (page < Math.ceil(count / 8) - 1) {
      setPage(page + 1);
    }
  }
  function decPage() {
    if (page >= 1) {
      setPage(page - 1);
    }
  }
  function destroy(id) {
    fetch(`http://localhost:5001/api/cars/del/${id}`, {
      method: 'DELETE',
    }).then(() => {
      if (page > Math.ceil((count - 1) / 8) - 1) {
        setPage(page - 1);
      }
      setCount(count - 1);
    });
  }

  useEffect(() => {
    // Trae coches luego del primer renderizado y cada vez que se pagína.
    setRow(0);
    getCars();
  }, [page, count]);

  useEffect(() => {
    // Muestra el coche seleccionado en la tabla.
    if (cars.length !== 0) {
      getCar();
    }
  }, [cars, row]);

  return (
    <div className="WrapperCar">
      <CarTop count={count ?? 0} car={car} destroy={destroy} />
      <CarBtm
        cars={cars ?? []}
        setRowCar={setRowCar} //Exporta funcion para seleccionar coche
        incPage={incPage}
        decPage={decPage}
      />
    </div>
  );
}
export default WrapperCar;
