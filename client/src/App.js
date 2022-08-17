import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LandingPage from './componentes/LandingPage';
import Home from './componentes/Home';
import Detail from './componentes/Details';
import PokemonCreate from './componentes/PokemonCreate'

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path ='/' component ={LandingPage}/>
        <Route exact path ='/home' component ={Home}/>
        <Route exact path ='/pokemons' component={PokemonCreate}/>
        <Route exact path ='/home/:id' component ={Detail}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
