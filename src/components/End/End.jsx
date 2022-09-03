import React from 'react';
import './End.css';
import photo from '../../assets/img/jpg/congratulation.JPG';

function End(){
  return (
    <div class="End__card">
		<div class="End__imgBox">
			<div class="End__bark"></div>
			<img src={photo} alt=""/>
		</div>
		<div class="End__details">
			<h2 class="End__color1">.         FIN</h2>
			<p>Grupo 3,</p>
			<p>Gracias a todos, uds. Sergio, Leo , Rodrigo y</p>
			<p>Todos los Compañeros de cursada. </p>
			<p>Les deseamos a todos </p>
			<p>Muy Buena Presentación!!</p>
		</div>
	</div>
  )
}
export default End;