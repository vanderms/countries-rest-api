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

interface ICountriesContext {
  countries: Country[];
  getFilteredCountries: () => Country[];
  updateRegion: (region: Region | null) => void;
  updateFilter: (filter: string | null) => void;
}

const CountriesContext = createContext<ICountriesContext | null>(null);


interface CountriesContextProviderProps {
  countries: Country[];
  children: React.ReactNode;
}

export const CountriesContextProvider: React.FC<CountriesContextProviderProps> = (props) => {
  
  const [region, setRegion] = useState<Region | null>(null);
  const [filter, setFilter] = useState<string | null>(null);

  const updateRegion = (region: Region | null) => {
    setRegion(() => region as Region);
  }

  const updateFilter = (filter: string | null) => {
    setFilter(() => filter);
  }

  const getFilteredCountries = () => {
    const filteredCountries = props.countries.filter(country => {
      return (region === null || region === country.region) &&
        (filter === null || country.name.includes(filter));
    });
    return filteredCountries;
  }
  
  const value = {
    countries: props.countries,
    getFilteredCountries,
    updateRegion,
    updateFilter
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
