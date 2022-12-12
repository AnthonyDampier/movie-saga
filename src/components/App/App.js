import {HashRouter as Router, Route} from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList';
import Details from '../Details/Detail';
import MovieForm from '../MovieForm/MovieForm';

function App() {
  return (
    <div className="App">
      <Router>        
        <Route path="/" exact>
          <MovieList />
        </Route>
        {/* Details page */}
        <Route path="/details/:id">
          <Details />
        </Route>
        {/* Add Movie page */}
        <Route path="/addAMovie">
          <MovieForm/>
        </Route>
      </Router>
    </div>
  );
}


export default App;
