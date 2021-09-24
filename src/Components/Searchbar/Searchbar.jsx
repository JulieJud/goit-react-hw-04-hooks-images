import s from './SearchBar.module.css';

const SearchBar = ({ onSearch }) => {
  return (
    <header className={s.searchbar}>
      <form
        className={s.searchForm}
        onSubmit={e => {
          e.preventDefault();
          onSearch(e.target.elements.imageName.value);
          e.target.reset();
        }}
      >
        <button type="submit" className={s.searchForm_button}>
          <span className={s.searchForm_button_label}>Search</span>
        </button>

        <input
          className={s.searchForm_input}
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
