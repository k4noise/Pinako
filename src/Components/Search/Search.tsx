import React from 'react';
import { NotificationManager } from 'react-notifications';
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
      className={`${props.locatedInNav ? 'SearchFormNav' : 'SearchForm'} ${
        props?.onlyMobile && 'SearchOnlyMobile'
      }`}
      onSubmit={(event) => {
        event.preventDefault();
        NotificationManager.error(
          'Данная функция в разработке',
          'Ошибка',
          3000
        );
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
