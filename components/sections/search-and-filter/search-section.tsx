import classes from './search-section.module.scss';
import { SearchForm } from 'components/forms/search-form/search-form';
import { FilterForm } from 'components/forms/filter-form/filter-form';


export const SearchAndFilterSection: React.FC = () => {
 
  return (
    <div className={classes["search-section"]}>
      <SearchForm />
      <FilterForm/>
      
    </div>
  );
}