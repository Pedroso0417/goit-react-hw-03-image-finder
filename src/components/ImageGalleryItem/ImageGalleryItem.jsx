import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ image, onClick }) => {
  return (
    <li
      className={css.galleryItem}
      onClick={() => onClick(image.largeImageURL)}
    >
      <img src={image.webformatURL} alt="" />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired, // Assuming 'image' is an object
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
