import classes from './search-form.module.scss';
import { useCountries } from 'contexts/countries/countries';
import { useState } from 'react';


export const SearchForm: React.FC = () => {
  const { setQuery } = useCountries();  
  const [ searchValue, setSearchValue ] = useState<string>('');

  return (
     <form
        className={classes['search-form']}
        role='search'
        onSubmit={(e) => {
          e.preventDefault();
          setQuery(searchValue);
        }}
      >
      <label className={classes['search-label']}>         
        <input
          className={classes['search-input']}
          type="text"
          placeholder=' '
          value={searchValue}
          onChange={(e) => setSearchValue(e.currentTarget.value)}
        />
        <span className={classes['search-label-text']}>Search for a country</span>
      </label>
      <button className={classes["search-btn"]} aria-label='search'></button>
    </form>
  )
}