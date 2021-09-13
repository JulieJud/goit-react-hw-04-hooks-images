import { Component } from 'react';
import './App.css';
import SearchBar from './Searchbar/Searchbar';
import fetchImages from './Service/SErvice';
import ImageGallery from './ImageGallery/ImageGallery';
import ButtonLoadMore from './Button/Button';
import Spinner from './Loader/Loader';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export class App extends Component {
  state = {
    imageName: null,
    images: [],
    reqStatus: 'idle',
    page: 1,
    error: null,
  };

  handleFormSubmit = imageName => {
    this.setState({ imageName, page: 1, images: [] });
  };

  handleLoadMore = () => {
    this.setState(p => ({ page: p.page + 1 }));
  };

  async componentDidUpdate(_, prevState) {
    const { imageName, page } = this.state;

    if (prevState.imageName !== imageName || prevState.page !== page) {
      try {
        this.setState({ status: 'pending' });
        const images = await fetchImages(imageName, page);

        this.setState({ status: 'resolved' });

        if (imageName.trim() === '' || images.length === 0) {
          return alert(`no picture with name ${imageName}`);
        }

        this.setState({
          images: [...this.state.images, ...images],
        });

        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      } catch (error) {
        this.setState({ status: 'rejected' });
        return alert('smt going wrong');
      }
    }
  }

  scrollOnLoadButton = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };
  render() {
    return (
      <div>
        <SearchBar onSearch={this.handleFormSubmit} />
        {this.state.images.length < 1 && (
          <>
            <h2>The gallery is empty</h2>
            <p>Use search field!</p>
          </>
        )}
        {this.state.reqStatus === 'pending' && <Spinner />}

        <ImageGallery images={this.state.images} />
        {this.state.images.length !== 0 && (
          <ButtonLoadMore onClick={this.handleLoadMore} />
        )}
      </div>
    );
  }
}

export default App;
