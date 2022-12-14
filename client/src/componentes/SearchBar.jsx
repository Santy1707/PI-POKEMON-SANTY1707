import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonByName } from "../actions";
import './SearchBar.css'

export default function SearchBar({setCurrentPage}) {
const dispatch = useDispatch()
const [name, setName] = useState('')

function handleInputChange (e) {
    e.preventDefault()
    setName(e.target.value)
}

function handleSubmit (e) {
    e.preventDefault()
    dispatch(getPokemonByName(name))
    setName("")
    setCurrentPage(1)
}

return ( 
    <div>
        <input
            type = 'text'
            placeholder="Buscar pokemon... :)"
            onChange={(e)=> handleInputChange(e)}
        />
        <button className="button" type='submit'
        onClick={(e)=> handleSubmit(e)}>Buscar</button>
    </div>
)
}
