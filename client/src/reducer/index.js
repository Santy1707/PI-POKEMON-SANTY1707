const initialState = {
    pokemons : [],
    allPokemons: [],
    detail: [],
    types: [],
};

function rootReducer (state=initialState, action){
    switch(action.type) {
        case 'GET_POKEMONS':
            return {
                ...state,
                pokemons: action.payload, // 1 propiedad del estado con toda la info, tal cual como viene del back
                allPokemons: action.payload // Lo mismo que antes, necesitamos tener una copia para aplicar ciertos filtros
            }
            case 'FILTER_BY_TYPE':
            const allPokemons = state.allPokemons;
            const statusFiltered = action.payload === 'All'? allPokemons : allPokemons.filter( el => el.types.includes(action.payload))   
            console.log(statusFiltered)
            console.log(state.pokemons)
            return {
                ...state,
                pokemons: statusFiltered.length? statusFiltered: ['No hay pokemones de ese tipo']
                }

            case 'ORDER_BY_NAME':
                let sortedArr = action.payload === "asc" ? state.pokemons.sort(function (a, b) {
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
            //  console.log(prueba1)
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
            let response = action.payload 
            return {
                ...state,
                pokemons: response.length? response : ['No hay pokemones con esesads nombre'],
            }
            case 'DELETE_POKEMON':
                return{
                    ...state
                }
            case "CLEAN_STATE": 
                return {
                    ...state,
                    detail: action.payload,
                    pokemons: action.payload,
                    allPokemons: action.payload
                }
        default: return state
    } 
}


export default rootReducer;