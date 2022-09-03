import React from 'react';
import { NavLink } from 'react-router-dom';
import notFoundImg from '../../assets/svg/error-404-Homer.svg'
import './NotFound.css'
function NotFound(){
  return (
    <div className='NotFound__wrapp'>
      <img className='NotFound__img' src={notFoundImg} alt=""/>
      <div className='NotFound__msg'>
        <p>La página que intentás solicitar no está</p>
        <p>en el servidor (Error 404)</p>
        <p>Probá mejor con estos links:</p>
        <div className="NotFound__wrappUls">
        <ul className='NotFound__ul'>
            <li className='NotFound__li'><NavLink className='NotFound__NavLink' to="/metrics/lastUser"><span>Métricas</span></NavLink></li>
            <li className='NotFound__li'><NavLink className='NotFound__NavLink' to="/users"><span>Usuarios</span></NavLink></li>
            <li className='NotFound__li'><NavLink className='NotFound__NavLink' to="/cars"><span>Coches</span></NavLink></li>
        </ul>
        <ul className='NotFound__ul'>
            <li className='NotFound__li'><NavLink className='NotFound__NavLink' to="/metrics/lastUser"><span>Último Usuario</span></NavLink></li>
            <li className='NotFound__li'><NavLink className='NotFound__NavLink' to="/metrics/lastCar"><span>Último Coche</span></NavLink></li>
            <li className='NotFound__li'><NavLink className='NotFound__NavLink' to="/end"><span>Fin</span></NavLink></li>
        </ul>
        </div>
      </div>
    </div>
  )
}
export default NotFound;