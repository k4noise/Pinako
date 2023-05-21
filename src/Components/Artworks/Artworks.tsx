import React, { ReactNode, useState } from 'react';
import Modal from './Modal';

interface ArtworksProps {
  children: ReactNode;
  additionalClassName?: string;
}

const Artworks = (props: ArtworksProps): JSX.Element => {
  const [showModal, setShowModal] = useState(false);
  const [scrollYPos, setScrollYPos] = useState(window.scrollY);

  const handleOpenModal = () => {
    setShowModal(true);
    setScrollYPos(window.scrollY);
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setShowModal(false);
    window.scrollTo(0, scrollYPos);
    document.body.style.overflow = '';
  };

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
          handleOpenModal();
        }}
      >
        {props.children}
      </div>
      <Modal show={showModal} onClose={handleCloseModal} />
    </>
  );
};

export default Artworks;
