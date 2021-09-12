import PropTypes from 'prop-types';

const ButtonLoadMore = ({ onClick }) => {
  return (
    <button type="button" className="SearchForm-button" onClick={onClick}>
      Load more
    </button>
  );
};
ButtonLoadMore.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ButtonLoadMore;
