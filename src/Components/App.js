import axios from 'axios';
import { Component } from 'react';
import './App.css';
import SearchBar from './Searchbar/Searchbar';

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
      const response = await axios.get(
        `https://pixabay.com/api/?q=${this.state.imageName}&page=${this.state.pageNumber}&key=22647650-093efc913fe4b5bfd764725e8&image_type=photo&orientation=horizontal&per_page=12`,
      );
      console.log(response);
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
