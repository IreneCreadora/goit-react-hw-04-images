import propTypes from 'prop-types';
import '../styles.css';

const ImageGalleryItem = ({ image, onImageClick }) => {
  const fullImage = () => onImageClick(image.largeImageURL);

  return (
    <li className="ImageGalleryItem">
      <img
        className="ImageGalleryItem-image"
        src={image.webformatURL}
        alt={image.tags}
        onClick={fullImage}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  image: propTypes.shape({
    largeImageURL: propTypes.string.isRequired,
    webformatURL: propTypes.string.isRequired,
    tags: propTypes.string.isRequired,
  }),
  onImageClick: propTypes.func.isRequired,
};

export default ImageGalleryItem;
