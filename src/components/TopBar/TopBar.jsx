import React from 'react';
import logo from '../../assets/svg/logo/logo.svg'
import './TopBar.css';
import adminPhoto from '../../assets/img/jpg/chuck.jpg'


function TopBar(){
  return (
    <div className="TopBar">
        <div className="TopBar__logoAdmin">
          <img className='TopBar__logo' src={logo} alt="" />
          <p className='TopBar__admin'>Administrador Total</p>
        </div>
        <div className="TopBar__photoAdmin">
          <p className='TopBar__adminName'>Chuck Norris</p>
          <div className="TopBar__photo"><img src={adminPhoto} alt="" className="TopBar__photoImg" /> </div>
        </div>
    </div>
  )
}
export default TopBar;