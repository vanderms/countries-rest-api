import classes from './search-section.module.scss';
import { useCountries, Region } from 'contexts/countries/countries';
import { useState } from 'react';



export const SearchSection: React.FC = () => {
  const { updateFilter, updateRegion } = useCountries();  

  return (
    <div className={classes["search-section"]}>
      <form className={classes['search-form']} role='search'>
        <label className={classes['search-label']}>         
          <input
            className={classes['search-input']}
            type="text"
            placeholder=' '
          />
          <span className={classes['search-label-text']}>Search for a country</span>
        </label>
        <button className={classes["search-btn"]} aria-label='search'></button>
      </form>
      <form className={classes["filter-form"]} role='search' onSubmit={e => e.preventDefault()}>
        <label className={classes["hint"]}>Filter by Region
          <input type="checkbox" name='checkbox' className={classes["hidden-input"]} />
        </label>
        <div className={classes["filter-dropdown"]}>
          <label className={classes['filter-label']}>
            <input className={classes["hidden-input"]} type="radio" name="regions" value='' checked/>    
            <span className={classes["filter-label-text"]}>All</span>
          </label>
        {Object.values(Region).map(region => (
          <label key={region} className={classes['filter-label']}>              
            <input className={classes["hidden-input"]} type="radio" name="regions" value={region}  />       
            <span className={classes["filter-label-text"]}>{region}</span>
          </label>
        ))}
        </div>
      </form>
    </div>
  );
}