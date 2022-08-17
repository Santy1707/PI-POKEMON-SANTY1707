const initialState = {
    pokemons : [],
    allPokemons: [],
    detail: [],
    types: []
};

function rootReducer (state=initialState, action){
    switch(action.type) {
        case 'GET_POKEMONS':
            return {
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload
            }
            case 'FILTER_BY_TYPE':
            const allPokemons = state.allPokemons;
            const statusFiltered = action.payload === 'All'? allPokemons : allPokemons.filter( el => el.types.includes(action.payload))   
            // console.log(statusFiltered)
            return {
                ...state,
                pokemons: statusFiltered
                }

            case 'ORDER_BY_NAME':
            let sortedArr  = action.payload === 'asc'? state.pokemons.sort(function (a, b) {
                if (a.name > b.name) {
                    return 1;
                }
                if (b.name > a.name) {
                    return -1;
                }
                return 0;
            }) : 
            state.pokemons.sort(function (a, b) {
                if (a.name > b.name) {
                    return -1;
                }
                if (b.name > a.name) {
                    return 1;
                } 
                return 0;
            })
            // console.log(statusFiltered)
            return {
                ...state,
                pokemons: sortedArr
            }

            case 'ORDER_BY_ATTACK':
            let sortedByAttack = action.payload === 'min'? state.pokemons.sort(function (a, b) {
                if (a.attack > b.attack) {
                    return 1;
                }
                if (b.attack > a.attack) {
                    return -1;
                }
                return 0;
            }) : 
            state.pokemons.sort(function (a, b) {
                if (a.attack > b.attack) {
                    return -1;
                }
                if (b.attack > a.attack) {
                    return 1;
                } 
                return 0;
            })
            // console.log(statusFiltered)
            return {
                ...state,
                pokemons: sortedByAttack
            }

            case 'FILTER_CREATED': // existente - all
            const myPokemons = state.allPokemons;
            const createdFilter = action.payload === 'creados'? myPokemons.filter(el => el.created) : myPokemons.filter(el => !el.created)
            return {
                ...state,
                pokemons: action.payload === 'all'? state.allPokemons : createdFilter
            }

            case 'GET_DETAILS':
            return {
                ...state,
                detail: action.payload
            }

            case 'POST_POKEMON':
            return {
                ...state,
            }

            case 'GET_TYPES':
            return {
                ...state,
                types: action.payload 
            }

            case 'GET_POKEMON_NAME':
            return {
                ...state,
                pokemons: action.payload
            }
            case 'DELETE_POKEMON':
                return{
                    ...state
                }
        default: return state
    } 
}


export default rootReducer;