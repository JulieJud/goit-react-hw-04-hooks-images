import { Component } from 'react';
import './App.css';
import SearchBar from './Searchbar/Searchbar';
import fetchImages from './Service/SErvice';
import ImageGallery from './ImageGallery/ImageGallery';
import ButtonLoadMore from './Button/Button';
import Spinner from './Loader/Loader';
import toast, { Toaster } from 'react-hot-toast';

export class App extends Component {
  state = {
    imageName: null,
    images: [],
    status: 'idle',
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
          return toast.error(`no picture with name ${imageName}`);
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
        return toast.error('smt going wrong');
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
        {this.state.status === 'pending' && <Spinner />}
        {this.state.images.length < 1 && (
          <>
            <h2 className="titleName">
              The gallery is empty! Use search field!
            </h2>
          </>
        )}

        <ImageGallery images={this.state.images} />
        {this.state.images.length !== 0 && (
          <ButtonLoadMore onClick={this.handleLoadMore} />
        )}
        <Toaster />
      </div>
    );
  }
}

export default App;
