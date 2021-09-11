const SearchBar = ({ onSearch }) => {
  return (
    <header className="Searchbar">
      <form
        className="SearchForm"
        onSubmit={e => {
          e.preventDefault();
          onSearch(e.target.elements.imageName.value);
        }}
      >
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="imageName"
        />
      </form>
    </header>
  );
};

export default SearchBar;
