import type { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import { Theme } from 'contexts/theme/theme-context';
import axios from 'axios';
import { CountriesContextProvider } from 'contexts/countries/countries';
import { Country } from 'contexts/countries/countries';
import { HeaderSection } from 'components/sections/header/header';


export const getServerSideProps: GetServerSideProps = async (context) => {

  const theme = (context.req.cookies?.theme ?? 'light') as Theme;
  const response: any = await axios.get('https://restcountries.com/v3.1/all');

  const countries: Country[] = response.data.map( (country: any) => {
    return {
      name: country.name.common,
      flag: country?.flags?.svg || country?.flags?.png || '',
      population: country.population ?? 0,
      region: country.region ?? null,
      capital: country.capital ?? ''
    }
  })

  return {
    props: { theme, countries },
  }
}


const Home: NextPage<{ theme: Theme, countries: any }> = ({ countries }) => {
  
  return (
      <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>     
      <CountriesContextProvider countries={countries}>
        <main>
          <HeaderSection/>
        </main>      
      </CountriesContextProvider>
    </>
  )
}

export default Home
