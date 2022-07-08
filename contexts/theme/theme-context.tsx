import React from "react";
import { createContext, useState, useContext } from "react";
import Cookies from 'js-cookie';


export enum Theme {
  LIGHT = 'light',
  DARK = 'dark'
}; 

interface IThemeContext {
  theme: Theme; 
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<IThemeContext | null>(null);


interface ThemeContextProviderProps {
  children: React.ReactNode;
  theme: Theme;
}

export const ThemeContextProvider: React.FC<ThemeContextProviderProps> = (props) => {
  const [theme, setTheme] = useState<Theme>(props.theme);

  const changeTheme = (theme: Theme) => {
    Cookies.set('theme', theme, { sameSite: 'Lax' });
    setTheme(() => theme);
  }

  const toggleTheme = () => {
    const newTheme = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
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
