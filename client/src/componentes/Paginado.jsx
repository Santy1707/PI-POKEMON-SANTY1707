import React from 'react';
import './Paginado.css';

export default function Paginado ({pokemonsPerPage, allPokemons, paginado}) {
    const pageNumbers = [] 
//                                     40     /     12
    for (let i = 1; i <= Math.ceil(allPokemons/pokemonsPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
            <div className='paginado'>
                { pageNumbers && 
                pageNumbers.map(number => (
                    <div className='paginado-button'>
                        <button className='button-paginado'
                        onClick={() => paginado(number)}>
                        {number}
                    </button>
                    </div>
                ))}
            </div>
    ) 
}