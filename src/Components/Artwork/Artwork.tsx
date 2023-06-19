import React from 'react';
import { useNavigate, useLoaderData } from 'react-router-dom';
import './Artwork.css';
import Card from '../Card/Card';
import RectImg from '../../../assets/photo.svg';
import { GetImage } from '../../Requests';

const Artwork = (): JSX.Element => {
  const navigate = useNavigate();
  const artworkData = useLoaderData().data;
  return (
    <div className="Artwork">
      <Card id={artworkData.id} userId={artworkData.userId} artworkView={true} image={GetImage(artworkData.imageUrl)} artworkName={artworkData.title} artworkDesc={artworkData.description} userName={artworkData.userName} userAvatar={GetImage(artworkData.userPfp)} artworkTags={artworkData.tags} />
      <button className="ArtworkClose" onClick={(event) => navigate(-1)}>
        ✕
      </button>
    </div>
  );
};

export default Artwork;
