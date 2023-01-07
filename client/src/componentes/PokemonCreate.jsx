import React, {useState, useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import {postPokemon, getTypes, cleanState, getPokemons} from '../actions/index'
import {useDispatch, useSelector} from 'react-redux'
import './PokemonCreate.css'
import Swal from 'sweetalert2'

export default function PokemonCreate() {
    const dispatch = useDispatch();
    const types = useSelector((state) => state.types);
    const history = useHistory();
    const allPokemon = useSelector((state) => state.allPokemons)
    const [errors, setErrors] = useState({});

    function validate(input) {
        let errores = {};

        if (allPokemon.find(el => el.name === input.name)) {
            errores.name = 'El nombre ya existe'
        } else if (!input.name) {
            errores.name = 'El nombre es obligatorio'
        } else if (input.name.length < 2 || input.name.length > 20) {
            errores.name = 'Debe tener entre 2 y 20 caracteres'
        } else if((!/^([a-zA-Z]+)(\s[a-zA-Z]+)*$/.test(input.name.trim()))){
            errores.name = "El campo nombre solo acepta letras"
        }     
        if (input.hp > 100 || input.hp < 0) {
            errores.hp = 'Se requiere un valor entre 0 y 100'
        }       
        if (input.attack > 100 || input.attack < 0 ) {
            errores.attack = 'Se requiere un valor entre 0 y 100'
        } 
        if (input.defense > 100 || input.defense < 0) {
            errores.defense = 'Se requiere un valor entre 0 y 100'
        }
        if (input.speed > 100 || input.speed < 0) {
            errores.speed = 'Se requiere un valor entre 0 y 100'
        }        
        if (input.height > 100 || input.height < 0) {
            errores.height = 'Se requiere un valor entre 0 y 100'
        } 
        if (input.weight > 100 || input.weight < 0) {
            errores.weight = 'Se requiere un valor entre 0 y 100'
        } 
        if (!input.types || input.types.length === 0 || input.types.length > 2) {
            errores.types = 'Seleeciona uno o maximo dos tipos'
        } 
        if((!/.+\.(jpg|png)$/.test(input.image))){
            errores.image = "La imagen debe ser de tipo jpg o png"
        }
        return errores;
    };


    const [input, setInput] = useState({
        name: '', // asdasasasasasasasasasasasasasasasasasasasasasasas
        hp: '', // 200002
        attack: '', // 321231321
        defense: '',
        speed: '',
        height: '',
        weight: '',
        image: '',
        types: []
    })

function handleChange(e) {
    setInput({
        ...input,
        [e.target.name]: e.target.value
    })

    setErrors( validate({
        ...input,
        [e.target.name]: e.target.value
    }))
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
}

function handleSubmit(e) {
    e.preventDefault();
    if( input.name && input.attack && input.defense && input.height 
        && input.hp && input.image && input.weight && input.speed 
        && input.types && 
        !errors.name && !errors.attack 
        && !errors.defense && !errors.height
        && !errors.hp && !errors.image 
        && !errors.weight && !errors.speed
        ) {    
        dispatch(postPokemon(input))
        Swal.fire({
            title: 'Crack!!',
            text: "Pokemon creado, grande!",
            icon: 'success',
        })
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
    } else {
        Swal.fire({
            title: 'Incompleto',
            text: "Por favor llena todos los campos de manera correcta",
            icon: 'error',
        })
    }
}

function handleDelete(el) {
    setInput({
        ...input,
        types: input.types.filter(tp => tp !== el)
    })
}

useEffect(()=> {
    dispatch(getTypes())
    dispatch(getPokemons())
}, [dispatch])


    return (
    <div className="contenedor-principal-create">

        <Link to='/pokemons'><button className='regresar'>Regresar</button></Link>
            <h1>Crea tu Pokemon!! </h1>
    
    <form className = 'form' onSubmit={handleSubmit}>

        <div>
            <label>Nombre:</label>
            <input type= 'text' value= {input.name} name='name'
            onChange={handleChange}
            />

            {errors.name && (
                <p className="danger">{errors.name}</p>
            )}
        </div>

        <div>
            <label>Vida:</label>
            <input type= 'number' value= {input.hp} name='hp'
            onChange={handleChange}
            />

             {errors.hp && (
                <p className="danger">{errors.hp}</p>
            )}
        </div>

        <div>
            <label>Ataque:</label>
            <input type= 'number' value= {input.attack} name='attack'
            onChange={handleChange}
            />

            {errors.attack && (
                <p className="danger">{errors.attack}</p>
            )}
        </div>

        <div>
            <label>Defensa:</label>
            <input  type= 'number' value= {input.defense} name='defense'
            onChange={handleChange}
            />

            {errors.defense && (
                <p className="danger">{errors.defense}</p>
            )}
        </div>

        <div>
            <label>Velocidad:</label>
            <input type= 'number' value= {input.speed} name='speed'
            onChange={handleChange}
            />

            {errors.speed && (
                <p className="danger">{errors.speed}</p>
            )}
        </div>

        <div>
            <label>Altura:</label>
            <input type= 'number' value= {input.height} name='height'
            onChange={handleChange}
            />

            {errors.height && (
                <p className="danger">{errors.height}</p>
            )}
        </div>

        <div>
            <label>Peso:</label>
            <input type= 'number' value= {input.weight} name='weight'
            onChange={handleChange}
            />

            {errors.weight && (
                <p className="danger">{errors.weight}</p>
            )}
        </div>

        <div className="container-poke-image">
            <label>Imagen:</label>
            <input type= 'text' value= {input.image} name='image'
            onChange={handleChange}
            />
           
            {errors.image && (
                <p className="danger">{errors.image}</p>
            )}
        </div>

       <select className ='select' onChange={e => handleSelect(e)}>
        {types.map(tp => 
            <option key = {tp.name} 
            value={tp.name}>{tp.name}</option>
            )}
       </select>

       {input.types.map((tp, index) => <p key={index}>{ tp + ' '}</p>)}

       {errors.types && (
                <p className="danger">{errors.types}</p>
            )}
       <button className="regresar" type='submit' disabled={Object.entries(errors) === 0 ? true : false}>Crear Pokemon</button>
       {/* {Object.entries(errors) !== 0 ? <p> Llena todos los campos </p>: <p>Formulario completado</p>}  */}
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

