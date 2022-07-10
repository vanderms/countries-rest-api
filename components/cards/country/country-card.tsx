/* eslint-disable @next/next/no-img-element */
import classes from './country-card.module.scss';
import { Country } from 'contexts/countries/countries';
import Link from 'next/link';

interface CountryCardProps{
  country: Country;
}

export const CountryCard: React.FC<CountryCardProps> = ({country}) => {
  return (
    <Link href={`/countries/${country.name.toLowerCase()}`}><a>
      <article className={classes["country-card"]}>
        <img className={classes['flag']} src={country.flag} alt="flag" />
        <div className={classes["content"]}>
          <h2 className={classes["name"]}>{country.name}</h2>
          <dl className={classes['data']}>
            <div className={classes["data-item"]}>
              <dt className={classes['term']}>Population:</dt>
              <dd className={classes['description']}>{country.population.toLocaleString('en-us') }</dd>
            </div>
            <div className={classes["data-item"]}>
              <dt className={classes['term']}>Region:</dt>
              <dd className={classes['description']}>{ country.region }</dd>
            </div>
            <div className={classes["data-item"]}>
              <dt className={classes['term']}>Capital:</dt>
              <dd className={classes['description']}>{ country.capital}</dd>
            </div>
          </dl>
        </div>       
      </article>
    </a></Link>
  )
}