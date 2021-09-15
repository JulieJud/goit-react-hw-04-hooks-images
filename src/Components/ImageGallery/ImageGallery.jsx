import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import s from './ImageGallery.module.css';

const ImageGallery = ({ images, handleSelectedImage }) => {
  return (
    <ul className={s.ImageGallery}>
      {images.map((image, id) => (
        <ImageGalleryItem
          key={id}
          image={image}
          onClick={handleSelectedImage}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ),
};

export default ImageGallery;
