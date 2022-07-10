import classes from './countries-list-section.module.scss';
import { useCountries } from 'contexts/countries/countries';
import { CountryCard } from 'components/cards/country/country-card';


export const CountriesListSection: React.FC = () => {
  
  const { filterCountries } = useCountries();
  const filteredCountries = filterCountries();

  return (
    <ul className={classes["countries-list-section"]}>
      {
        filteredCountries.map((country, idx) => (
          <li key={ country.name }>
            <CountryCard country={country} lazyLoading={ idx > 8 } />
          </li>
        ))
      }
    </ul>
  )
}
