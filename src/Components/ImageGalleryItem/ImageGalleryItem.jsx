import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';
const ImageGalleryItem = ({ image, handleSelectedImage }) => {
  return (
    <li className={s.ImageGalleryItem}>
      <img
        src={image.webformatURL}
        alt={image.tags}
        className={s.ImageGalleryItem_image}
        onClick={() => handleSelectedImage(image)}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string,
  }),
};

export default ImageGalleryItem;
