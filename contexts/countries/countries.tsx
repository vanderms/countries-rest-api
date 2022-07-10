import { useState, useContext, createContext } from "react";

export enum Region {
  Africa = "Africa",
  Americas = "Americas",
  Asia = "Asia",
  Europe = "Europe",
  Oceania = "Oceania"
}

export interface Country {
  name: string;
  flag: string;
  population: number;
  region: string;
  capital: string;
}

export interface CountryExtended extends Country {
  nativeName: string;
  subRegion: string;
  domain: string;
  currencies: string[];
  languages: string[]
  borders: string[];
}

interface ICountriesContext {
  countries: Country[];
  region: Region | null;
  query: string;
  filterCountries: () => Country[];
  setRegion: (region: Region | null) => void;
  setQuery: (query: string) => void;
}

const CountriesContext = createContext<ICountriesContext | null>(null);


interface CountriesContextProviderProps {
  countries: Country[];
  children: React.ReactNode;
}

export const CountriesContextProvider: React.FC<CountriesContextProviderProps> = (props) => {
  
  const [region, setRegion] = useState<Region | null>(null);
  const [query, setQuery] = useState<string>('');

  const updateRegion = (region: Region | null) => {
    setRegion(() => region as Region);
  }

  const updateQuery = (query: string) => {
    setQuery(() => query);
  }

  const filterCountries = () => {
    const filteredCountries = props.countries.filter(country => {
      return (region === null || region === country.region) &&
        (country.name.toLowerCase().includes(query.toLowerCase()));
    });
    return filteredCountries;
  }
  
  const value = {
    countries: props.countries,
    query,
    region,
    filterCountries,
    setRegion: updateRegion,
    setQuery: updateQuery
  }
    
  return (
    <CountriesContext.Provider value={value}>
      {props.children}
    </CountriesContext.Provider>
  )
}


export function useCountries(){
  const value = useContext(CountriesContext);
  if (value) {
    return value;
  }
  throw Error('Component is not inside a <ContextCountriesProvider/>');
}
