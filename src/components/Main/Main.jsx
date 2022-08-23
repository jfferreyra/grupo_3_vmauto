import React from 'react';
import './Main.css'
import SideBar from '../SideBar/SideBar';
import { Outlet } from 'react-router-dom';

function Main(){
  return (
    <div className='Main'>
      <SideBar />
      <Outlet />
    </div>
  )
}
export default Main;