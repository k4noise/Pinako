import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface ArtworksProps {
  children: ReactNode;
  additionalClassName?: string;
}

const Artworks = (props: ArtworksProps): JSX.Element => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className={`Artworks ${
          props?.additionalClassName ? props.additionalClassName : ''
        }`}
        onClick={(event) => {
          const targetElement = event.target as HTMLElement;
          if (!targetElement.parentNode.classList.contains('ClickableCard'))
            return;
          navigate('/profile/324/artwork/1234');
        }}
      >
        {props.children}
      </div>
    </>
  );
};

export default Artworks;
