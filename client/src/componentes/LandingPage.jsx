import React from 'react';
import {Link} from 'react-router-dom';
import './LandingPage.css'
import ImagendeFondo from './Imagenes/FondoPokemon.jpg'

export default function LandingPage() {
    return (
        <div className='landing'>
            <h1 className='text'>Que empiece la batalla!</h1>
            <div>
            <img className='img-landing' src={ImagendeFondo} alt="Fondo de Pokemon, XD" />
            </div>
            <div>
            <Link to ='/pokemons'>
                <button className='button-landing'>Comenzar</button>
                </Link>
            </div>
        </div>
    )
}

{/*   <img className={styles.Imagen} src={imagen}/>*/}
