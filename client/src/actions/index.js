import axios from 'axios'

const API = "https://apppokemonback.herokuapp.com"

// `${API}/pokemons`


export function getPokemons() {
    return async function (dispatch) {
        var json = await axios.get(`${API}/pokemons`);
         // aqui esta la magia de la conexión entre el Front y el Back
        return dispatch({
            type: 'GET_POKEMONS',
            payload: json.data // la informacion que trae el llamado asincrono a dicha ruta.
        })
    }
}

export function getTypes() {
    return async function (dispatch) {
      var json = await axios.get("https://apppokemonback.herokuapp.com/types");
      return dispatch({
        type: "GET_TYPES",
        payload: json.data
      })
    }
}

export function getPokemonByName(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get("https://apppokemonback.herokuapp.com/pokemons?name=" + name)
      console.log(json.data[0])
      console.log(json.data)
      return dispatch({
        type: 'GET_POKEMON_NAME',
        payload: json.data 
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export function postPokemon(payload){
  try {
    return async function () {
      const response = await axios.post("https://apppokemonback.herokuapp.com/pokemons", payload)
      console.log(response)
      return response;
    }
  } catch (error) {
    console.log(error)
  }  
}

export function getDetail(id) {
    return async function (dispatch) {
      try{
          var json = await axios.get(`https://apppokemonback.herokuapp.com/pokemons/${id}`);
      return dispatch({
        type: "GET_DETAILS",
        payload: json.data
      })
  } catch(error) {
    console.log(error)
  }
}
}
  
export function filterPokemonsByType(payload) {
  return {         
      type: 'FILTER_BY_TYPE',
      payload
  }
}

export function filterCreated (payload) {
  return {
      type: 'FILTER_CREATED',
      payload
  }
}

export function orderByName(payload) {
  return {
      type: 'ORDER_BY_NAME',
      payload
  }
}

export function orderByAttack(payload){
  return {
    type: "ORDER_BY_ATTACK",
    payload
  }
}

export function deleteById(id) {
  return async function (dispatch) {
    try {
      var response = await axios.delete(`https://apppokemonback.herokuapp.com/pokemons/${id}`)
      .then(() => {alert('Pokemon eliminado')})
      return dispatch({
        type: 'DELETE_POKEMON',
      })
    } catch (error) {
      alert('No se pudo eliminar')
    }
  }
}



