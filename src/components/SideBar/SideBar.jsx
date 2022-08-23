import React from 'react';
import { NavLink } from 'react-router-dom';
import './SideBar.css';

function SideBar(){
  return (
    <div className="SideBar">
        <div className="SideBar__nav">
          <ul className='SideBar__ul'>
            <li className='SideBar__li'><NavLink className='SideBar__NavLink' to="/users"><i className="rIcon-users"></i><span>Usuarios</span></NavLink></li>
            <li className='SideBar__li'><NavLink className='SideBar__NavLink' to="/cars"><i className="rIcon-cars"></i><span>Coches</span></NavLink></li>
          </ul>
        </div>
        <div className="SideBar__nav">
          <ul className='SideBar__ul'>
            <li className='SideBar__li'><NavLink className='SideBar__NavLink' to="/metrics/lastUser"><i className="rIcon-metric"></i><span>Métricas</span></NavLink></li>
            <li className='SideBar__li'><NavLink className='SideBar__NavLink' to="/metrics/lastUser"><i className="rIcon-lastUser"></i><span>Último Usuario</span></NavLink></li>
            <li className='SideBar__li'><NavLink className='SideBar__NavLink' to="/metrics/lastCar"><i className="rIcon-cars"></i><span>Último Coche</span></NavLink></li>
          </ul>
        </div>
    </div>
  )
}
export default SideBar;