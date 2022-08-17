const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require ('axios');
//const Pokemon = require('../models/Pokemon');
const router = Router();
const {Pokemon, Types} = require('../db');
const {getAllPokemons} = require ('../funciones.js/functions')

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// ---------------------

router.get('/pokemons', async (req, res) => {
    const { name } = req.query 
    try {
       // const id = req.params.id
        const pokemonsTotal = await getAllPokemons()
        if (name) {
            const pokemonName = pokemonsTotal.filter(
                e => e.name.toLowerCase().includes(name.toLowerCase())) // usamos includes porque getAllPokemons retorna un array con objetos, yo quiero hacerle un filter a la variable donde tengo dicho array (pokemonsTotal) y quedarme solo con el objeto cuyo nombre coincida con el filter.
           pokemonName.length ?
           res.status(200).send(pokemonName) : 
           res.status(404).send('No se encuentra el personaje con dicho nombre')
        }
        else {
         //   let baseDeDatos = await getDbInfo()
         //   let hola = baseDeDatos;
         //   console.log(hola)
            res.status(200).send(pokemonsTotal)
        }
    } catch (error) {
        res.status(500).send(error.message)
   // 
    }
})


// --------------

router.get('/pokemons/:id', async (req, res, next) => {
    const {id} = req.params
    const pokemonsTotal = await getAllPokemons()
    console.log(id + ' texto')
    try {
        // esta funcion tiene tanto API COMO BASE DE DATOS, toda la informacion, ya la probé y funciona
        // console.log(pokemonsTotal)
        if (id) {
            let pokeId = pokemonsTotal.filter((e) => e.id == id)
            // console.log(pokeId)
            pokeId.length ?
            res.status(200).json(pokeId) : 
            res.status(404).send('No se encuentra el pokemon con dicho id')
            // console.log(pokeId + 'hola no encontro el ID')
        //else if (pokeIdApi.length){
             //   res.status(200).json(pokeIdApi) 
            // } 
          //   console.log(pokeIdApi)
        }
    } 
     catch (error) {
        next('no se encontro el pokemon con ese ID', error)
    }
})

// ----------------

router.get ('/types', async (req, res) => {
    const typesInfo =  await axios.get('https://pokeapi.co/api/v2/type')
         //   console.log(typesInfo.data.results)
    const typesMap = typesInfo.data.results.map(e => e.name)
         //   console.log(typesMap)
  //  for (let i = 0; i < typesMap.length; i++) {
 //      console.log(typesMap[i])
   //     Type.findOrCreate({
   //         where: {name: typesMap[i]}
 //       })
 //   }
    typesMap.forEach(i => {
     //   console.log(i)
        Types.findOrCreate({
            where: {name: i}
        })
    });
    const allTypes = await Types.findAll();
    res.send(allTypes)
})

// -------------

router.post('/pokemons', async (req, res) => {
    try {
        const { name, hp, attack, defense, speed,
            height, weight, created, types, image
        } = req.body
        // console.log(types)
        const pokemon = await Pokemon.create({name, hp, attack, defense, speed, height, weight, created, image 
        })
       // console.log(pokemon)
        const typesDb = await Types.findAll({
            where: {name: types}
        })
      // typesArr = typesDb //Object.keys(typesDb) 
       // console.log(typesArr)*/
        //console.log(typesArr)
        pokemon.addTypes(typesDb)
      //  console.log(pokemon)
        res.status(200).send('Personaje creado con exito, sos un crack!!')
    } catch (error) {
        res.status(500).send(error)
    }
})


// Route DELETE

router.delete('/pokemons/:id', async (req, res) =>{
     try {
         const {id} = req.params
         const eliminado = await Pokemon.destroy({
             where: {
                id,
             }
         })
         res.status(200).send('Pokemon eliminado')
     } catch (error) {
         console.log(error)
     }
 }
)

// const {id} = req.params;
// const pk = Pokemon.findByPk(id)
// if (pk)
// pk.destroy()
// res.status(200).send('Pokemon eliminado')

module.exports = router;