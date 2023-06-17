import React from 'react';
import { NotificationManager } from 'react-notifications';
import SearchButtonImage from '../../../assets/magnifier.svg';
import './Search.css';
import { useNavigate } from 'react-router-dom';

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
        props?.onlyMobile ? 'SearchOnlyMobile' : ''
      }`
    }
      onSubmit={(event) => {
        event.preventDefault();
        const query: string = event.target.query.value;
        const shieldedQuery: string = query.replaceAll('#', '*');
        navigate(`/search/${shieldedQuery}`)
      }}
    >
      <input
        type="text"
        placeholder={props.placeholder}
        className="SearchInput"
        name="query"
        spellCheck={false}
      />
      <button type="submit" className="SearchButton">
        <img src={SearchButtonImage} />
      </button>
    </form>
  );
};

export default Search;
