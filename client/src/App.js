import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LandingPage from './componentes/LandingPage';
import Home from './componentes/Home';
import Detail from './componentes/Details';
import PokemonCreate from './componentes/PokemonCreate'
import Error404 from './componentes/Error404'

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path ='/' component ={LandingPage}/>
        <Route exact path ='/pokemons' component ={Home}/>
        <Route exact path ='/pokemons/create' component={PokemonCreate}/>
        <Route exact path ='/pokemons/:id' component ={Detail}/>
        <Route exact path={"*"} component={Error404}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
