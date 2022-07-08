import 'styles/index.scss';
import type { AppProps } from 'next/app';
import { ThemeContextProvider } from 'contexts/theme/theme-context';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeContextProvider theme={pageProps.theme}>
      <Component {...pageProps} />
    </ThemeContextProvider>    
  )
}

export default CustomApp;
