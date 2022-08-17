import React from 'react';

export default function Paginado ({pokemonsPerPage, allPokemons, paginado}) {
    const pageNumbers = [] 
//                                     120     /     12
    for (let i = 0; i <Math.ceil(allPokemons/pokemonsPerPage); i++) {
        pageNumbers.push(i+1)
    }

    return (
        <nav>
            <div>
                { pageNumbers && 
                pageNumbers.map(number => (
                    <button>
                    <a onClick={() => paginado(number)}>{number}</a>
                    </button>
                ))}
            </div>
        </nav>   
    ) 
}