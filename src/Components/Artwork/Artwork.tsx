import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Artwork.css';
import Card from '../Card/Card';
import RectImg from '../../../assets/photo.svg';

const Artwork = (): JSX.Element => {
  const navigate = useNavigate();
  return (
    <div className="Artwork">
      <Card artworkView={true} image={RectImg} />
      <button className="ArtworkClose" onClick={(event) => navigate(-1)}>
        ✕
      </button>
    </div>
  );
};

export default Artwork;
