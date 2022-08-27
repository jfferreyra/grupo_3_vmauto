import React from 'react';
import './BarV.css';

function BarV(props){
  let {count,name,percent,i}=props;
  let root=document.querySelector(':root');
  root.style.setProperty(`--BarV${i+1}`,`calc(${percent} * ( 100% - var(--barVLabel) - 3rem )`)

  return (
    <div className={`BarV`}>
          {/* Barra de conteo */}
         <div className={`BarV__bar-${i+1}`}></div> 
          {/* Etiqueta con nombre y count de categoria */}
        <div className={`BarV__label BarV__label--${i+1}`}>
          <p className={`BarV__count`}>{count}</p>
          <p className={`BarV__cat`}>{name}</p>
        </div>
    </div>
  )
}
export default BarV;