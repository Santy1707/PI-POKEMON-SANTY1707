import React from "react";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getPokemons, filterPokemonsByType, filterCreated, orderByName, orderByAttack, getPokemonByName } from "../actions";
import {Link} from 'react-router-dom'
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import './Home.css'
import imagen from './Imagenes/Icono.jpeg'

export default function Home () {

const dispatch = useDispatch();
const allPokemons = useSelector ((state) => state.pokemons)
const page = useSelector((state) => state.pageSearchBar)
const [orden, setOrden] = useState('')
const [currentPage, setCurrentPage] = useState(1) 
const [pokemonsPerPage, setPokemonsPerPage] = useState(12) 
const indexOfLastPokemon = currentPage * pokemonsPerPage 
const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage 
const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon)

console.log(page)

const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
}

useEffect (()=> {
    dispatch(getPokemons());  
    setCurrentPage(page)
},[dispatch]); 

function handleClick(e) {
    window.location.reload()
    dispatch(getPokemons())
}

function handleFilterTypes(e) {
    dispatch(filterPokemonsByType(e.target.value))
    setCurrentPage(1)
}

function handleFilterCreated(e) {
    // en el caso de que sea All la logica esta en el reducer, para variar un poco
    dispatch(filterCreated(e.target.value))
    setCurrentPage(1)
}

function handleSort(e) {
    if (e.target.value === "All") {
        dispatch(getPokemons());  
    }
    dispatch(orderByName(e.target.value))
    setCurrentPage(1)
    setOrden( `Ordenado de manera ${e.target.value}` )
}

function handleSortAttack(e) {
    e.preventDefault();
    if (e.target.value === "All") {
        dispatch(getPokemons());  
    }
    dispatch(orderByAttack(e.target.value))
    setCurrentPage(1)
    setOrden( `Ordenado por ${e.target.value}` )
}

console.log(allPokemons)
console.log(allPokemons)
return (

    <div>
        <div className="nav">

        <div className="new-container">
            <img style={{width: '50px'}} src= {imagen}/>
        </div>
      
        <div className='container-filtros'>
        <h5>Filtrar por nombre</h5>
    <select onChange={ e => handleSort(e)}>
            <option value='All'>Todos</option>
            <option value='asc'>A-Z Ascendente</option> 
            <option value='desc'>Z-A Descendente</option>
        </select>
        <h5>Filtrar por Ataque</h5>
        <select onChange={ e => handleSortAttack(e)}>
        <option value='All' onClick={e => {handleClick(e)}}>Todos</option>
            <option value='min'>Minimo</option> 
            <option value='max'>Maximo</option>
        </select>
        <h5>Filtrar por Tipo</h5> 
        <select onChange={ e => {handleFilterTypes(e)}}>
            <option value='All'>Todos</option>
            <option value='normal'>normal</option>
            <option value='rock'>rock</option>
            <option value='water'>water</option>
            <option value='dragon'>dragon</option>
            <option value='flying'>flying</option>
            <option value='ghos'>ghost</option>
            <option value='electric'>electric</option>
            <option value='fairy'>fairy</option>
            <option value='poison'>poison</option>
            <option value='steel'>steel</option>
            <option value='psychic'>psychic</option>
            <option value='unknown'>unknown</option>
            <option value='fighting'>fighting</option>
            <option value='fire'>fire</option>
            <option value='ice'>ice</option>
            <option value='shadow'>shadow</option>
            <option value='ground'>ground</option>
            <option value='bug'>bug</option>
            <option value='grass'>grass</option>
            <option value='dark'>dark</option>
        </select>
        <h5>Filtrar por procedencia</h5>
        <select onChange={ e => handleFilterCreated(e)}>
            <option value='all'>Todos</option>
            <option value='creados'>Creados</option>
            <option value='existente'>Existentes</option>
        </select>
        </div>   
        
        <Link to='/pokemons/create'>
        <button className="poke-button"> Crear mi Pokemon!!</button>
        </Link>

    <div className='container-search-bar'>
    <SearchBar
    setCurrentPage={setCurrentPage}/>  
        </div>
        </div>

<div className="container">
<h1>Los Pokemones son lo maximo!</h1> 
    
    <button onClick={e => {handleClick(e)}}>
        Volver a cargar todos los pokemons
    </button> 

        <Paginado
        pokemonsPerPage = {pokemonsPerPage} 
        allPokemons={allPokemons.length}
        paginado ={paginado}
        />

    {allPokemons[0] !== "No se encuentra el personaje con dicho nombre" && allPokemons[0] !== "No hay pokemones de ese tipo" ? currentPokemons?.map((ele) => {
        return (
            <>
                <Link to ={'/pokemons/' + ele.id}>
                <Card name={ele.name}  type={ele.types}  image={ele.image}/>
                </Link>
            </>
        )
    }): <p>{allPokemons[0]?allPokemons[0]: <p>Cargando Pokemones.......</p>}</p>}
  
  </div>
  </div>
)
}


{/*// es como el componentDidMount
// le doy click y me trae todo de vuelta.
// las opciones tiene su value para poder determinar que accion hacer en cada caso
 // las opciones tiene su value para poder determinar que accion hacer en cada caso
 // las opciones tiene su value para poder determinar que accion hacer en cada caso
// esto es lo mismo que hacer el mapState to props, con el use selector se trae todo lo del state en este caso el pokemons
// importante este array, aqui daria indicaciones sobre la interrelacion entre lo que haya en el estado, ejemplo: siempre y cuando haya tal cosa ejecuta o anteriores - se lo pasamos vacio porque no depende de nada y se lo va a montar tranquilo
*/}
