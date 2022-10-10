const {Pokemon, Types} = require('../db');
const axios = require ('axios');
// const Types = require('../models/Types');

const getApiInfo = async () => {
   try {
    const apiUrl = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=40') // llamo los datos de la API, aun no hemos accedido a los valor de cada pokemon
    console.log(apiUrl.data.results)
    const apiInfo = apiUrl.data.results.map( async (e) => await axios.get(e.url)) // aqui accede a la propiedad url de cada pokemon
    console.log(apiInfo)
    console.log('Juan')
    const pokeInfo = await axios.all(apiInfo) // axios all trae la informacion de multiples peticiones, de todos los pokemones, luego hacemos un .then porque axios.all devuelve una promesa
    .then(respuesta => 
        respuesta.map( p => { 
            return  {
                id: p.data.id,
                name: p.data.name,
                hp: p.data.stats[0].base_stat, // hay que mirar cada mini api e ir a stats para hallar la vida, por eso toca acceder hasta el fondo.
                attack: p.data.stats[1].base_stat,
                defense: p.data.stats[2].base_stat,
                speed: p.data.stats[5].base_stat,
                height: p.data.height,
                weight: p.data.weight,
                types: p.data.types.map(tp => tp.type.name),
                image: p.data.sprites.other.home.front_default,
            }
        })
    )
   // .then(r => globalThis.pokeData = r)
   return globalThis.pokeData = pokeInfo
    console.log(pokeData)
    // let pokeDatabuena = pokeData.Array
    // return pokeData
        // aqui map me crea un array y luego en una constante guardo la informacion de cada Pokemon como un objeto
             // ponemos .data porque el axios da un data de cada uno de los 40 pokemones a los que llega, cada pokemon tiene su propia mini api por decirlo asi
    } catch (error) {
        console.log(pokeData)
        console.log(error.message)
   }
}

getApiInfo()

const getDbInfo = async () => {
    try {
        const infoDb = await Pokemon.findAll({
            include: {
                model: Types,
                attributes: ['name'],
                through: {
                    attributes: [],
                },
            }
        })
        //console.log(infoDb)
        const datoLimpio = JSON.parse(JSON.stringify(infoDb, null, 2))
        datoLimpio.forEach(pokemon => pokemon.types = pokemon.types.map(tp => tp.name))
        console.log(datoLimpio) 
        return datoLimpio 
    } catch (error) {
        console.log({msg: error})
    } 
}

const getAllPokemons = async () => {
   // const apiInfo = await getApiInfo();
   let apiInfo = pokeData
   const dbInfo = await getDbInfo()
   // console.log(Array.isArray(apiInfo))
   // console.log(Array.isArray(dbInfo))
   // console.log(apiInfo)
    //if (dbInfo.length) {
    //    const totalInfo = apiInfo.concat(dbInfo)
    //    return totalInfo;
    //};
    const totalInfo = [...apiInfo, ...dbInfo] // 1
    // const infoFinal = totalInfo.forEach( pokemon => pokemon.type.map (ele => ele.name))
    return totalInfo  // return infoFinal; // return totalInfo
}

    //const dbMap = dbInfo.map(p => {
    /*    return {
            id: p.id,
            name: p.name,
            hp: p.hp, // hay que mirar cada mini api e ir a stats para hallar la vida, por eso toca acceder hasta el fondo.
            attack: p.attack,
            defense: p.defense,
            speed: p.speed,
            height: p.height,
            weight: p.weight,
            image: p.image,
            types: p.types,//.length === 1? [p.types[0].name] : [p.types[0].name, p.types[1].name]
        }  
    })*/

module.exports = {
    getAllPokemons
    //getApiInfo
    //getDbInfo
}