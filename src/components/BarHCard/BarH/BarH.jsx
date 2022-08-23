import React from 'react';
import './BarH.css';

function BarH(props){
  let {count,name,percent,i}=props;
  let root=document.querySelector(':root');
  root.style.setProperty(`--barh${i+1}`,`calc(${percent} * ( 100% - var(--barLabel) - 3rem )`)

  return (
    <div className={`BarH`}>
          {/* Etiqueta con nombre y count de categoria */}
        <div className={`BarH__label BarH__label--${i+1}`}>
          <p className={`BarH__count`}>{count}</p>
          <p className={`BarH__cat`}>{name}</p>
        </div>
          {/* Barra de conteo */}
         <div className={`BarH__bar-${i+1}`}></div> 
    </div>
  )
}
export default BarH;