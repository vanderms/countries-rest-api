import type { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import { Theme } from 'contexts/theme/theme-context';
import axios from 'axios';
import { CountriesContextProvider } from 'contexts/countries/countries';
import { Country } from 'contexts/countries/countries';
import { HeaderSection } from 'components/sections/header/header';
import { SearchAndFilterSection } from 'components/sections/search-and-filter/search-section';
import { CountriesListSection } from 'components/sections/countries-list/countries-list-section';


export const getServerSideProps: GetServerSideProps = async (context) => {

  const theme = (context.req.cookies?.theme ?? 'light') as Theme;
  const response: any = await axios.get('https://restcountries.com/v3.1/all');

  const countries: Country[] = response.data.map( (country: any) => {
    return {
      name: country.name.common,
      flag: country?.flags?.png || country?.flags?.svg || '',
      population: country.population ?? 0,
      region: country.region ?? null,
      capital: country.capital ?? ''
    }
  })

  return {
    props: { theme, countries },
  }
}


const Home: NextPage<{ theme: Theme, countries: Country[] }> = ({ countries }) => {

  const name = "Where in the world?";
  const title = name;
  const description = "Challenge Rest Countries API, by Frontend Mentor";
  const url = "https://imaginative-custard-146134.netlify.app/";
  
  return (
      <>
      <Head>
        <meta property="og:site_name" content={ name }/>
        <meta property="og:title" content={ title } />
        <meta property="og:description" content={ description }/>
        <meta property="og:image" content={ url + "preview.jpg" }/>
        <meta property="og:type" content="website" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:url" content={ url }></meta> 
        <title>{ title }</title>        
      </Head>     
      <CountriesContextProvider countries={countries}>
        <main>
          <HeaderSection />
          <SearchAndFilterSection />
          <CountriesListSection/>
        </main>      
      </CountriesContextProvider>
    </>
  )
}

export default Home
