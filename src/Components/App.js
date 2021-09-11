import { Component } from 'react';
import './App.css';
import SearchBar from './Searchbar/Searchbar';
import fetchImages from './Service/SErvice';

export class App extends Component {
  state = {
    imageName: null,
    images: [],
    reqStatus: 'idle',
    pageNumber: 1,
  };

  handleFormSubmit = imageName => {
    this.setState({ imageName });
  };

  async componentDidUpdate(_, prevState) {
    if (prevState.imageName !== this.state.imageName) {
      const images = await fetchImages(this.state.imageName);
      this.setState({ images });
    }
  }

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
