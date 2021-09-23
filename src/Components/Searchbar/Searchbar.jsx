import s from './SearchBar.module.css';

const SearchBar = ({ onSearch }) => {
  return (
    <header className={s.Searchbar}>
      <form
        className={s.SearchForm}
        onSubmit={e => {
          e.preventDefault();
          onSearch(e.target.elements.imageName.value);
          e.target.reset();
        }}
      >
        <button type="submit" className={s.SearchForm_button}>
          <span className={s.SearchForm_button_label}>Search</span>
        </button>

        <input
          className={s.SearchForm_input}
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
