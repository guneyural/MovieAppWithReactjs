import React, {Component} from 'react';
import Movie from './Movie';
import Header from './Header';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
      <div>
        <Header />            
        <Movie />
      </div>
    );
  }
}

export default App;