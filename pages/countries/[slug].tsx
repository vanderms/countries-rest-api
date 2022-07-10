import type { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import { CountryExtended } from 'contexts/countries/countries';
import { Theme } from 'contexts/theme/theme-context';
import axios from 'axios';
import { HeaderSection } from 'components/sections/header/header';
import { SingleCountrySection } from 'components/sections/country-single/single-country-section';

export const getServerSideProps: GetServerSideProps = async (context) => {

  const theme = (context.req.cookies?.theme ?? 'light') as Theme;
  const response = await axios.get(`https://restcountries.com/v3.1/name/${context?.params?.slug ?? ''}`)
    .catch(() => ({ data: { error: true } }));
  
  if (response.data.error) {
    return { notFound: true }
  }
  
  const all = await axios.get('https://restcountries.com/v3.1/all');

  const currency = response.data[0].currencies[
    Object.keys(response.data[0].currencies)[0]].name;
  
  const nativeName = response.data[0].name.nativeName[
    Object.keys(response.data[0].name.nativeName)[0]].common;

  const countryExtended: CountryExtended = {
    name: response.data[0].name.common,
    flag: response.data[0]?.flags?.svg || response.data[0]?.flags?.png || '',
    population: response.data[0].population ?? 0,
    region: response.data[0].region ?? null,
    capital: response.data[0].capital ?? '',
    nativeName: nativeName,
    subRegion: response.data[0].subregion,
    domain: response.data[0].tld[0],
    currencies: currency,
    languages: Object.values(response.data[0].languages),
    borders: response.data[0]?.borders?.map((border: string) => {
      return all.data.find((country: any) => (
        country.cca3 === border || country.cioc === border
      )).name.common
    }) ?? []
  }  
  
  return {
    props: { theme, countryExtended },
  }
}

const CountryPage: NextPage<{theme: Theme, countryExtended: CountryExtended}> = ({countryExtended}) => {
  
  return (
    <>
    <Head>
        <title>{countryExtended.name}</title>
    </Head>      
    <main>
        <HeaderSection />
        <SingleCountrySection country={countryExtended}/>
    </main>
    </>  
  )
}

export default CountryPage;

