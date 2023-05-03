import React from 'react';
// import { useLocation } from 'react-router-dom';
import SearchButtonImage from '../../../assets/magnifier.svg';

interface SearchProps {
  locatedInNav: boolean;
  placeholder: string;
}

const Search = (props: SearchProps): JSX.Element => {
  // const location = useLocation();
  return (
    <form
      method="get"
      action="/search"
      className={
        props.locatedInNav ? 'SearchFormNav' : 'SearchForm'
      }
    >
      <input
        type="text"
        placeholder={props.placeholder}
        className="SearchInput"
        name="query"
      />
      <button type="submit" className="SearchButton">
        <img src={SearchButtonImage} />
      </button>
    </form>
  );
};

export default Search;
