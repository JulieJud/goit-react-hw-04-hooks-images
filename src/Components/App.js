import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import SearchBar from './Searchbar/Searchbar';
import fetchImages from '../services/imagesApi';
import ImageGallery from './ImageGallery/ImageGallery';
import ButtonLoadMore from './Button/Button';
import Spinner from './Loader/Loader';
import Modal from './Modal/Modal';

export default function App() {
  const [imageName, setImageName] = useState(null);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [imgTags, setImgTags] = useState('');

  const handleFormSubmit = imageName => {
    setImageName(imageName);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage(p => p + 1);
  };

  const handleSelectedImage = (largeImageURL, imgTags) => {
    setLargeImageURL(largeImageURL);
    setImgTags(imgTags);
  };

  const closeModal = () => {
    setLargeImageURL('');
  };

  useEffect(() => {
    if (!imageName) return;

    async function getImage() {
      try {
        setStatus('pending');
        const images = await fetchImages(imageName, page);

        setStatus('resolved');

        if (imageName.trim() === '' || images.length === 0) {
          return toast.error(`no picture with name ${imageName}`);
        }

        setImages([...images, ...images]);

        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      } catch (error) {
        setStatus('rejected');
        return toast.error('smt going wrong');
      }
    }

    getImage();
  }, [imageName, page]);

  return (
    <div>
      <SearchBar onSearch={handleFormSubmit} />
      {images.length < 1 && (
        <>
          <h2 className="titleName">The gallery is empty! Use search field!</h2>
        </>
      )}

      <ImageGallery images={images} handleSelectedImage={handleSelectedImage} />
      {status === 'pending' && <Spinner />}

      {images.length !== 0 && <ButtonLoadMore onClick={handleLoadMore} />}

      <Toaster />
      {largeImageURL && (
        <Modal
          onClose={closeModal}
          largeImageURL={largeImageURL}
          imgTags={imgTags}
        />
      )}
    </div>
  );
}
