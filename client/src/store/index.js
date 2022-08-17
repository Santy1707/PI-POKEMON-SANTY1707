// vamos a crear el store
import {createStore, applyMiddleware}  from 'redux';

// createStore para crear el store de la App y applyMiddleware 
// store el middleware
/*
Proporciona un punto de extensión para terceros entre el envío de una acción y el momento en que alcanza el reductor. La gente utiliza Redux middleware para el registro de eventos, informes de fallos, para mantener las llamadas a una API asíncrona, enrutamiento y más.
*/

import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import rootReducer from '../reducer';

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

// exportamos el store con la funcion reductora, la herramienta devTools y aplicamos el middleware, en este caso thunk

/*
Thunk es un concepto de programación donde se utiliza una función para retrasar la evaluación o el cálculo de una operación. Redux Thunk es un middleware que le permite invocar creadores de acciones que devuelven una función en vez de un objeto de acción

Entonces cada accion será una funcion a ejecutar en lugar del objeto que es en si, con su payload y su data
*/
