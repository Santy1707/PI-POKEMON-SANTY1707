import React, {useState, useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import {postPokemon, getTypes} from '../actions/index'
import {useDispatch, useSelector} from 'react-redux'
import './PokemonCreate.css'


export default function PokemonCreate() {
    const dispatch = useDispatch();
    const types = useSelector((state) => state.types);
    const history = useHistory();
    const allPokemon = useSelector((state) => state.allPokemons)
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        name: '',
        hp: '',
        attack: '',
        defense: '',
        speed: '',
        height: '',
        weight: '',
        image: '',
        types: []
    })

    function validate(input) {
        let errors = {};
        if (allPokemon.find(el => el.name === input.name)) {
            errors.name = 'El nombre ya existe'
        } else if (!input.name) {
            errors.name = 'El nombre es obligatoio'
        }  else if (input.hp > 2000000000) {
            errors.hp = 'Se requiere un valor menor al actual'
        } else if (input.attack > 2000000000) {
            errors.attack = 'Se requiere un valor menor al actual'
        } else if (input.defense > 2000000000) {
            errors.defense = 'Se requiere un valor menor al actual'
        } else if (input.speed > 2000000000) {
            errors.speed = 'Se requiere un valor menor al actual'
        } else if (input.height > 2000000000) {
            errors.height = 'Se requiere un valor menor al actual'
        } else if (input.weight > 2000000000) {
            errors.weight = 'Se requiere un valor menor al actual'
        } else if (input.types.length === 0 || input.types.length > 2) {
            errors.types = 'Selecciona uno o dos tipos'
        } else if (!input.image) {
            errors.image = 'Se requiere una imagen'
        } 
        return errors;
    };


function handleChange(e) {
    setInput({
        ...input,
        [e.target.name]: e.target.value
    })
    setErrors(validate({
        ...input,
        [e.target.name]: e.target.value
    }))
    console.log(allPokemon)
    console.log(input)
    console.log(errors)
}


function handleSelect(e){
    if (!input.types.includes(e.target.value))
    setInput({
        ...input,
        types: [...input.types, e.target.value]
    })
    setErrors(validate({
        ...input,
        types: [...input.types, e.target.value]
    }))
    console.log(input)
}

function handleSubmit(e) {
    e.preventDefault();
    console.log(input)
    dispatch(postPokemon(input))
    alert('Pokemon creado con exito!!, sos crack!')
    setInput({
        name: '',
        hp: '',
        attack: '',
        defense: '',
        speed: '',
        height: '',
        weight: '',
        image: '',
        types: []
    })
    history.push('/pokemons')
}

function handleDelete(el) {
    setInput({
        ...input,
        types: input.types.filter(tp => tp !== el)
    })

}

useEffect(()=> {
    dispatch(getTypes())
}, [dispatch])

    return (
        <div className="contenedor-principal-create">

            <Link to='/pokemons'><button className='regresar'>Regresar</button></Link>
            <h1>Crea tu Pokemon!! </h1>
    
    <form className = 'form' onSubmit={handleSubmit}>

        <div>
            <label>Nombre:</label>
            <input
            type= 'text'
            value= {input.name}
            name='name'
            onChange={handleChange}
            />
            {errors.name && (
                <p className="error">{errors.name}</p>
            )}
        </div>
        <div>
            <label>Vida:</label>
            <input
            type= 'text'
            value= {input.hp}
            name='hp'
            onChange={handleChange}
            />
             {errors.hp && (
                <p className="error">{errors.hp}</p>
            )}
        </div>
        <div>
            <label>Ataque:</label>
            <input
            type= 'text'
            value= {input.attack}
            name='attack'
            onChange={handleChange}
            />
            {errors.attack && (
                <p className="error">{errors.attack}</p>
            )}
        </div>
        <div>
            <label>Defensa:</label>
            <input
            type= 'text'
            value= {input.defense}
            name='defense'
            onChange={handleChange}
            />
            {errors.defense && (
                <p className="error">{errors.defense}</p>
            )}
        </div>
        <div>
            <label>Velocidad:</label>
            <input
            type= 'text'
            value= {input.speed}
            name='speed'
            onChange={handleChange}
            />
            {errors.speed && (
                <p className="error">{errors.speed}</p>
            )}
        </div>
        <div>
            <label>Altura:</label>
            <input
            type= 'text'
            value= {input.height}
            name='height'
            onChange={handleChange}
            />
            {errors.height && (
                <p className="error">{errors.height}</p>
            )}
        </div>
        <div>
            <label>Peso:</label>
            <input
            type= 'text'
            value= {input.weight}
            name='weight'
            onChange={handleChange}
            />
            {errors.weight && (
                <p className="error">{errors.weight}</p>
            )}
        </div>
        <div className="container-poke-image">
            <label>Imagen:</label>
            <input
            type= 'text'
            value= {input.image}
            name='image'
            onChange={handleChange}
            />
            {errors.image && (
                <p className="error">{errors.image}</p>
            )}
        </div>

       <select className ='select' onChange={e => handleSelect(e)}>
        {types.map(tp => 
            <option key = {tp.name} 
            value={tp.name}>{tp.name}</option>
            )}
       </select>

       {input.types.map((tp, index) => <p key={index}>{ tp + ' '}</p>)}
       {errors.input && (
                <p className="error">{errors.input}</p>
            )}
       <button type='submit' disabled={Object.entries(errors).length? true: false}>Crear Pokemon</button>
    </form>
     
     {input.types.map( (tp, index) => 
                <div key={index}>
                    <p>{tp}</p>
                    <button onClick={() => handleDelete(tp)}>X</button>
                </div>
                )}
        </div>
    )
}

