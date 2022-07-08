import React from "react";
import { createContext, useState, useContext } from "react";
import Cookies from 'js-cookie';


export type ThemeType = 'light' | 'dark'; 

interface IThemeContext {
  theme: ThemeType; 
  setTheme: (theme: ThemeType) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<IThemeContext | null>(null);


interface IThemeContextProviderProps {
  children: React.ReactNode;
  theme: ThemeType;
}

export const ThemeContextProvider: React.FC<IThemeContextProviderProps> = (props) => {
  const [theme, setTheme] = useState<ThemeType>(props.theme);

  const changeTheme = (theme: ThemeType) => {
    Cookies.set('theme', theme, { sameSite: 'Lax' });
    setTheme(() => theme);
  }

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    Cookies.set('theme', newTheme, { sameSite: 'Lax' });
    setTheme(() => newTheme);
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme: changeTheme }}>
      <div data-theme={theme}>
        { props.children }
      </div>     
    </ThemeContext.Provider>
  )
}

export function useTheme(): IThemeContext {
  const value = useContext(ThemeContext);
  if (value) {
    return value;
  }  
  throw Error('component is not inside a <ThemeContextProvider/>');
}
