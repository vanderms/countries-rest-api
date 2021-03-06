/* eslint-disable @next/next/no-img-element */
import classes from './single-country-section.module.scss';
import { CountryExtended } from 'contexts/countries/countries';
import Link from 'next/link';


interface SingleCountrySectionProps{
  country: CountryExtended
}

export const SingleCountrySection: React.FC<SingleCountrySectionProps> = ({ country }) => {
  return (
    <section className={classes["single-country-section"]} aria-labelledby={classes['title']}>
      <Link href='/'>
        <a className={classes['back-btn']}>Back</a>
      </Link>
      <div className={classes["image-wrapper"]}>
        <img src={country.flag} alt="flag" className={classes['flag']} />
      </div>
      <h2 className={classes["title"]} id={classes['title']}>{ country.name }</h2>
      <dl className={classes['data-list']}>
        <div className={classes["data-item"]}>
          <dt className={classes['term']}>Native name:</dt>
          <dd className={classes['description']}>{ country.nativeName }</dd>
        </div>
         <div className={classes["data-item"]}>
          <dt className={classes['term']}>Population:</dt>
          <dd className={classes['description']}>{ country.population.toLocaleString('en-us') }</dd>
        </div>
         <div className={classes["data-item"]}>
          <dt className={classes['term']}>Region:</dt>
          <dd className={classes['description']}>{ country.region }</dd>
        </div>
         <div className={classes["data-item"]}>
          <dt className={classes['term']}>Sub Region:</dt>
          <dd className={classes['description']}>{ country.subRegion }</dd>
        </div>
         <div className={classes["data-item"]}>
          <dt className={classes['term']}>Capital:</dt>
          <dd className={classes['description']}>{ country.capital }</dd>
        </div>
      </dl>
      <dl className={classes['data-list']}>
        <div className={classes["data-item"]}>
          <dt className={classes['term']}>Top level domain:</dt>
          <dd className={classes['description']}>{ country.domain }</dd>
        </div>
         <div className={classes["data-item"]}>
          <dt className={classes['term']}>Currencies:</dt>
          <dd className={classes['description']}>{ country.currencies}</dd>
        </div>
         <div className={classes["data-item"]}>
          <dt className={classes['term']}>Languages:</dt>
          <dd className={classes['description']}>{ country.languages.join(', ')}</dd>
        </div>        
      </dl>
      <aside className={classes['border-countries-container']}>
        <h3 className={classes["border-countries-title"]}>Border Countries:</h3>
        <ul className={classes["border-countries-list"]}>
          { country.borders.map((borderCountry: string) => (
            <li key={borderCountry}>
              <Link href={`/countries/${borderCountry}`}>
              <a className={classes['border-country']}>{borderCountry}</a>             
              </Link>             
            </li>
          ))}
        </ul>
      </aside>
    </section>
  )
}