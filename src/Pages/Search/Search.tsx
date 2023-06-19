import React from 'react'
import { useLoaderData, useParams } from 'react-router-dom';
import { GetImage } from '../../Requests';
import Card from '../../Components/Card/Card';

const Search = (): JSX.Element => {
  const params = useParams();
  const searchString = params.searchParams;
  const subQueries = searchString.split(' ');
  const hashTags = [];
  const otherWords = [];

  subQueries.forEach(word => {
    if (word.startsWith('*')) {
      hashTags.push(word);
    } else {
      otherWords.push(word);
    }
  });
  const artworks = useLoaderData();
  const cards = GetCards(artworks);
  return (
    <div className='AppWrapper'>
      <div className="SearchTags">
        <span>Поиск по:</span>
        {otherWords.length > 0 && otherWords.map(word => <span>{word}</span>)}
        {hashTags.length > 0 && hashTags.map(tag => <span className="CardTag">{tag.slice(1)}</span>)}
      </div>
      {artworks && Object.keys(artworks).length > 0 &&
        <div className="Artworks MainWrapper">
          {cards}
        </div>}
    </div>
  )
};

const GetCards = (artworks: object): JSX.Element[] => {
  const cards: JSX.Element[] = [];
  artworks.forEach((value, key) => {
    cards[key] = <Card
      id={value.id}
      userId={value.userId}
      image={GetImage(value.imageUrl)}
      userName={value.userName}
      userAvatar={GetImage(value.avatarUrl)}
      artworkView={false}
      showStats={true}
    />
  });
  return cards;
}

export default Search;