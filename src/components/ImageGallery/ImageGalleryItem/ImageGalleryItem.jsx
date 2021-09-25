import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  tags,
  handleSelectedImage,
}) => {
  return (
    <li className={s.imageGalleryItem}>
      <img
        src={webformatURL}
        alt={tags}
        className={s.imageGalleryItem_image}
        onClick={() => handleSelectedImage(largeImageURL, tags)}
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
