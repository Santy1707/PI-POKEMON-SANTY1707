import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail, deleteById, getPokemons, cleanState } from '../actions/index';
import { useEffect } from 'react';
import './Details.css'
// import {ImagenRelleno} from './Imagenes/Icono2.jpeg'


export default function Detail(props) {
    const dispatch = useDispatch();
    const history = useHistory()
    
    useEffect (()=> {
        dispatch(getDetail(props.match.params.id))
        return () => {
            dispatch(cleanState())
          }
    }, [dispatch])

    function handleDelete(id){
        dispatch(deleteById(id))
        history.push('/pokemons')
    }

    const myPokemon = useSelector((state) => state.detail)
    return (
        <div className='details'>
        
        <div>
        { myPokemon.length > 0 && myPokemon[0].created && <h2>Pokemon personalizado!!, crack :D</h2>}
            {
                myPokemon.length > 0 ?
                <div className='details_list'> 
                    <h1> El gran {myPokemon[0].name} </h1>
                    <img src={myPokemon[0].image} alt='Imagen del pokemon'/>
                    <h2>Numero de ID: {myPokemon[0].id}</h2>
                    <h2>Vida: {myPokemon[0].hp}</h2>
                    <h2>Ataque: {myPokemon[0].attack}</h2>
                    <h2>Defensa: {myPokemon[0].defense}</h2>
                    <h2>Velocidad: {myPokemon[0].speed}</h2>
                    <h2>Altura: {myPokemon[0].height}</h2>
                    <h2>Peso: {myPokemon[0].weight}</h2>
                    <h2>Typos: {myPokemon[0].types.map( tp => tp + ' ')}</h2>
                {myPokemon[0].created && <button className='button_detail' onClick={() => handleDelete(props.match.params.id)}>Eliminar pokemon</button>}
                </div> : <div className='details_list'><h2>No hay pokemons con ese ID</h2></div>
            }
            <Link to='/pokemons'>
            <button className='button_detail'>Volver</button>
        </Link>
        </div>

        </div>

        

        
    )
}

{/* {!myPokemon[0].created? myCharacter[0].types + ' ' : myPokemon[0].types.map(tp => tp.name + (' ')} */}