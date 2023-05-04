import React from 'react';
import SearchButtonImage from '../../../assets/magnifier.svg';
import './Search.css';

interface SearchProps {
  locatedInNav: boolean;
  placeholder: string;
  onlyMobile?: boolean;
}

const Search = (props: SearchProps): JSX.Element => {
  return (
    <form
      method="get"
      action="/search/"
      className={`${props.locatedInNav ? 'SearchFormNav' : 'SearchForm'} ${
        props?.onlyMobile && 'SearchOnlyMobile'
      }`}
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
