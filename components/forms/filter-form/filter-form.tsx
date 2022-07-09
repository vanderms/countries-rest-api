import classes from './filter-form.module.scss';
import { useCountries, Region } from 'contexts/countries/countries';
import { useState, ChangeEvent, useEffect, useRef } from 'react';


function isParent(current: HTMLElement | null, target: HTMLElement): boolean {
  if (!current) {
    return false;
  }
  return current === target || isParent(current.parentElement, target);
}

export const FilterForm: React.FC = () => {
  const { region, setRegion } = useCountries();  
  const [dropdown, setDropdown] = useState<{ open: string }>({ open: '' });
  const formRef = useRef<HTMLFormElement>(null);
  
  useEffect(() => {
    function handleClick(e: any) {      
      if (!isParent(e.target, formRef.current as HTMLElement)) {
        setDropdown({ open: '' });
      }      
    }
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);


  const filterRegion =  (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.checked) {
      setRegion(e.currentTarget.value !== '' ? e.currentTarget.value as Region: null);
    }
  }

  const isRegionSelected = (regionName: string) => {
    if (regionName !== 'All') {
      return regionName === region;
    }
    return region === null;
  }

  return (
    <form
      className={classes["filter-form"]}
      role='search'
      onSubmit={e => e.preventDefault()}
      ref={formRef}
    >
        <label className={classes["hint"]} data-open={ dropdown.open }>Filter by Region
          <input
            type="checkbox"
            name='checkbox'
            className={classes["hidden-input"]}
            checked={dropdown.open === 'true'}
            onChange={(e) => {
              const status = e.currentTarget.checked ? 'true' : '';
              setDropdown({ open: status });
            }}
          />
        </label>
      <div
        className={classes["filter-dropdown"]}
        data-open={dropdown.open}        
      >
          <label className={classes['filter-label']}>
            <input
              className={classes["hidden-input"]}
              type="radio" name="regions"
              value=''
              checked={isRegionSelected('All')}
              onChange={filterRegion}
            />    
            <span className={classes["filter-label-text"]}>All</span>
          </label>
        {Object.values(Region).map(region => (
          <label key={region} className={classes['filter-label']}>              
            <input
              className={classes["hidden-input"]}
              type="radio" name="regions"
              value={region}
              checked={isRegionSelected(region)}
              onChange={filterRegion}
            />       
            <span className={classes["filter-label-text"]}>{region}</span>
          </label>
        ))}
      </div>
    </form>
  )
}