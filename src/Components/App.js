import { Component } from 'react';
import './App.css';
import SearchBar from './Searchbar/Searchbar';
import fetchImages from './Service/SErvice';
import ImageGallery from './ImageGallery/ImageGallery';

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
        <SearchBar onSearch={this.handleFormSubmit} />
        {this.state.images.length < 1 && (
          <alert>
            <h2>The gallery is empty</h2>
            <p>Use search field!</p>
          </alert>
        )}

        <ImageGallery images={this.state.images} />
      </div>
    );
  }
}

export default App;
