import axios from 'axios'
import Swal from 'sweetalert2';

const API = "https://apppokemonback.herokuapp.com"

// `${API}/pokemons`


export function getPokemons() {
    return async function (dispatch) {
        const json = await axios.get(`/pokemons`);
         // aqui esta la magia de la conexión entre el Front y el Back
         console.log(json.data)
        return dispatch({
            type: 'GET_POKEMONS',
            payload: json.data // la informacion que trae el llamado asincrono a dicha ruta.
        })
    }
}

export function getTypes() {
    return async function (dispatch) {
      const json = await axios.get("/types");
      return dispatch({
        type: "GET_TYPES",
        payload: json.data
      })
    }
}

export function getPokemonByName(name) {
  return async function (dispatch) {
    try {
      const json = await axios.get("/pokemons?name=" + name)
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
      const response = await axios.post("/pokemons/", payload)
      return response;
    }
    } catch (error) {
      console.log(error)
    }  
}

export function getDetail(id) {
    return async function (dispatch) {
      try{
          const json = await axios.get(`/pokemons/${id}`);
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
      let response = await axios.delete(`/pokemons/${id}`)
      .then(() => {Swal.fire({
        title: 'Completado',
        text: "Pokemon eliminado",
        icon: 'success',
    })})
      return dispatch({
        type: 'DELETE_POKEMON',
      })
    } catch (error) {
      Swal.fire({
        title: 'No se pudo eliminar',
        text: "El pokemon no se puede eliminar",
        icon: 'error',
    })
    }
  }
}

export function cleanState(payload){
  return {
    type: "CLEAN_STATE",
    payload: []
  }
}

