import React from "react"
import {NavLink} from "react-router-dom";
import Error404 from "./Imagenes/Icono.jpeg"


export default function Home () {
    return (
        <div>
        <NavLink to={"/pokemons"}> 
        <button> Regresar </button>
        </NavLink>

           <h3> Error 404</h3> 
           <p>Pagina no Encontrada</p>
           <img src={Error404}/>
        </div>
    )
}
