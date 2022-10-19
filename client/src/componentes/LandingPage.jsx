import React from 'react';
import {Link} from 'react-router-dom';
import './LandingPage.css'

export default function LandingPage() {
    return (
        <div className='Landing'>
            <h1 className='text'>Que empiece la batalla!</h1>
            <Link to ='/pokemons'>
                <button className='button'>Comenzar</button>
                </Link>
        </div>
    )
}

{/*   <img className={styles.Imagen} src={imagen}/>*/}
