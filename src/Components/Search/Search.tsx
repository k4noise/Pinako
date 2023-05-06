import React from 'react';
import { useNavigate } from 'react-router-dom';
import SearchButtonImage from '../../../assets/magnifier.svg';
import './Search.css';

interface SearchProps {
  locatedInNav: boolean;
  placeholder: string;
  onlyMobile?: boolean;
}

const Search = (props: SearchProps): JSX.Element => {
  const navigate = useNavigate();
  return (
    <form
      className={`${props.locatedInNav ? 'SearchFormNav' : 'SearchForm'} ${
        props?.onlyMobile && 'SearchOnlyMobile'
      }`}
      onSubmit={(event) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        navigate(`/search/${form.query.value}`);
      }}
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
