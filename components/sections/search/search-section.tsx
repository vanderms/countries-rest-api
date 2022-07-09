import classes from './search-section.module.scss';
import { useCountries, Region } from 'contexts/countries/countries';



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
        <p className={classes["hint"]}>Filter by Region</p>
        <div className={classes["filter-dropdown"]}>
          <label>
              All
            <input type="radio" name="regions" value='' checked/>    
          </label>
        {Object.values(Region).map(region => (
          <label key={region}>
              {region}
             <input type="radio" name="regions" value={region} />       
          </label>
        ))}
        </div>
      </form>
    </div>
  );
}