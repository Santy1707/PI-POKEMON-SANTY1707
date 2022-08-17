import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail, deleteById } from '../actions/index';
import { useEffect } from 'react';
import './Details.css'


export default function Detail(props) {
    console.log(props)
    const dispatch = useDispatch();
    const history = useHistory()
    
    useEffect (()=> {
        dispatch(getDetail(props.match.params.id))
    }, [dispatch])

    function handleDelete(id){
        dispatch(deleteById(id))
        history.push('/home')
    }

    const myPokemon = useSelector((state) => state.detail)
    console.log(myPokemon)
    return (
        <div className='details'>
            { myPokemon.length > 0 && myPokemon[0].created && <p>Pokemon personalizado!!, crack :D</p>}
            {
                myPokemon.length > 0 ?
                <div className='details_list'> 
                    <h1>El gran {myPokemon[0].name}</h1>
                    <img src={myPokemon[0].image}/>
                    <h2>Numero de ID: {myPokemon[0].id}</h2>
                    <h2>Vida: {myPokemon[0].hp}</h2>
                    <h2>Ataque: {myPokemon[0].attack}</h2>
                    <h2>Defensa: {myPokemon[0].defense}</h2>
                    <h2>Velocidad: {myPokemon[0].speed}</h2>
                    <h2>Altura: {myPokemon[0].height}</h2>
                    <h2>Peso: {myPokemon[0].weight}</h2>
                    <h2>Typos: {myPokemon[0].types.map( tp => tp + ' ')}</h2>
                {myPokemon[0].created && <button onClick={() => handleDelete(props.match.params.id)}>Eliminar pokemon</button>}
                </div> : <p>Loading......</p>
            }
        
        <Link to='/home'>
            <button>Volver</button>
        </Link>

        </div>
    )
}

{/* {!myPokemon[0].created? myCharacter[0].types + ' ' : myPokemon[0].types.map(tp => tp.name + (' ')} */}