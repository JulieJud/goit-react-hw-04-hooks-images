import { Component } from 'react';
import './App.css';
import SearchBar from './Searchbar/Searchbar';
import fetchImages from './Service/SErvice';
import ImageGallery from './ImageGallery/ImageGallery';
import ButtonLoadMore from './Button/Button';
import Spinner from './Loader/Loader';
import toast, { Toaster } from 'react-hot-toast';
import Modal from './Modal/Modal';

export class App extends Component {
  state = {
    imageName: null,
    selectedImage: null,
    images: [],
    status: 'idle',
    page: 1,
    error: null,
    showModal: true,
    largeImageURL: '',
    imgTags: '',
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

  handleSelectedImage = (largeImageURL, imgTags) => {
    this.setState({ largeImageURL, imgTags });
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(state => ({
      showModal: !state.showModal,
      selectedImage: '',
    }));
  };

  render() {
    const { images, status, largeImageURL, imgTags, showModal } = this.state;

    return (
      <div>
        <SearchBar onSearch={this.handleFormSubmit} />
        {status === 'pending' && <Spinner />}
        {images.length < 1 && (
          <>
            <h2 className="titleName">
              The gallery is empty! Use search field!
            </h2>
          </>
        )}

        <ImageGallery images={images} onSelect={this.handleSelectedImage} />
        {images.length !== 0 && (
          <ButtonLoadMore onClick={this.handleLoadMore} />
        )}
        <Toaster />
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImageURL} alt={imgTags} />
          </Modal>
        )}
      </div>
    );
  }
}

export default App;
