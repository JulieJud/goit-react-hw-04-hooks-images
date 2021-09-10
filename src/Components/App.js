import { Component } from 'react';
import './App.css';
import SearchBar from './Searchbar/Searchbar';

export class App extends Component {
  state = {
    imageName: null,
    images: [],
    reqStatus: 'idle',
  };
  handleFormSubmit = imageName => {
    this.setState({ imageName });
  };

  render() {
    return (
      <div>
        {' '}
        <SearchBar onSearch={this.handleFormSubmit} />{' '}
      </div>
    );
  }
}

export default App;
