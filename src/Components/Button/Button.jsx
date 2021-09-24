import PropTypes from 'prop-types';
import s from './Button.module.css';

const ButtonLoadMore = ({ onClick }) => {
  return (
    <button type="button" className={s.button} onClick={onClick}>
      Load more
    </button>
  );
};
ButtonLoadMore.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ButtonLoadMore;
