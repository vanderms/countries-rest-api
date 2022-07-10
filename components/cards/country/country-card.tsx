/* eslint-disable @next/next/no-img-element */
import classes from './country-card.module.scss';
import { Country } from 'contexts/countries/countries';
import Link from 'next/link';

interface CountryCardProps{
  country: Country;
  lazyLoading: boolean;
}

export const CountryCard: React.FC<CountryCardProps> = ({country, lazyLoading}) => {
  return (
    <Link href={`/countries/${country.name.toLowerCase()}`}><a>
      <article className={classes["country-card"]}>
        <img className={classes['flag']} src={country.flag} alt="flag" loading={ lazyLoading ? 'lazy': 'eager'}/>
        <div className={classes["content"]}>
          <h2 className={classes["name"]}>{country.name}</h2>
          <dl className={classes['data']}>
            <div className={classes["data-item"]}>
              <dt className={classes['term']}>Population:</dt>
              <dl className={classes['description']}>{country.population.toLocaleString('en-us') }</dl>
            </div>
            <div className={classes["data-item"]}>
              <dt className={classes['term']}>Region:</dt>
              <dl className={classes['description']}>{ country.region }</dl>
            </div>
            <div className={classes["data-item"]}>
              <dt className={classes['term']}>Capital:</dt>
              <dl className={classes['description']}>{ country.capital}</dl>
            </div>
          </dl>
        </div>       
      </article>
    </a></Link>
  )
}