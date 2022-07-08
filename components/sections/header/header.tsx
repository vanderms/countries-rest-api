import selectors from './header.module.scss';
import Link from 'next/link';
import { useTheme, Theme } from 'contexts/theme/theme-context';

export const HeaderSection: React.FC = () => {

  const { theme, toggleTheme } = useTheme();

  return (
    <header className={selectors['header-section']}>
      <h1 className={selectors["title"]}><Link href='/'><a>Where in the world?</a></Link></h1>
      <button
        className={selectors["toggle-btn"]}
        data-icon={theme === Theme.LIGHT ? 'dark' : 'light'}
        onClick={toggleTheme}
      >
        Dark Mode
      </button>
    </header>
  )
}