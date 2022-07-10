import classes from './search-form.module.scss';
import { useCountries } from 'contexts/countries/countries';

export const SearchForm: React.FC = () => {
  const { setQuery, query } = useCountries();

  return (
     <form
      className={classes['search-form']}
      role='search'
      onSubmit={(e) => e.preventDefault()}        
      >
      <label className={classes['search-label']}>         
        <input
          className={classes['search-input']}
          type="text"
          placeholder=' '
          value={query}
          onChange={(e) => {
            setQuery(e.currentTarget.value);                       
          }}
        />
        <span className={classes['search-label-text']}>Search for a country</span>
      </label>
      <button className={classes["search-btn"]} aria-label='search'></button>
    </form>
  )
}