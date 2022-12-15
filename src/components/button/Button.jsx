import propTypes from 'prop-types';
import '../styles.css';

const Button = ({ onClick }) => {
  return (
    <button className="Button" type="button" onClick={onClick}>
      Load More
    </button>
  );
};

Button.propTypes = {
  onClick: propTypes.func.isRequired,
};

export default Button;
