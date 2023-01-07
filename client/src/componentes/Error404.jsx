import React from "react"
import {NavLink} from "react-router-dom";
import Error404 from "./Imagenes/Icono.jpeg"
import './Error404.css'

export default function Home () {
    return (
        <div>
            <NavLink to={"/pokemons"}> 
            <button className="button"> Regresar </button>
            </NavLink>

            <h3> Error 404</h3> 
            <h3> Pagina no Encontrada </h3>
            <img src={Error404} alt='Imagen de Pokemon'/>
        </div>
    )
}
