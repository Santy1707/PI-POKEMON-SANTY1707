import axios from 'axios'

export function getPokemons() {
    return async function (dispatch) {
        var json = await axios.get('http://localhost:3001/pokemons');
         // aqui esta la magia de la conexión entre el Front y el Back
        return dispatch({
            type: 'GET_POKEMONS',
            payload: json.data // la informacion que trae el llamado asincrono a dicha ruta.
        })
    }
}

export function getTypes() {
    return async function (dispatch) {
      var json = await axios.get("http://localhost:3001/types");
      return dispatch({
        type: "GET_TYPES",
        payload: json.data
      })
    }
}

export function getPokemonByName(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/pokemons?name=" + name)
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
      const response = await axios.post("http://localhost:3001/pokemons", payload)
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
          var json = await axios.get(`http://localhost:3001/pokemons/${id}`);
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
  console.log(payload)
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
      var response = await axios.delete(`http://localhost:3001/pokemons/${id}`)
      .then(() => {alert('Pokemon eliminado')})
      return dispatch({
        type: 'DELETE_POKEMON',
      })
    } catch (error) {
      alert('No se pudo eliminar')
    }
  }
}



