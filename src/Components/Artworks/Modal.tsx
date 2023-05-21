import React from 'react';
import Card from '../../Components/Card/Card';
import RectImg from '../../../assets/photo.svg';
import './Modal.css';

interface ModalProps {
  show: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ show, onClose }) => {
  const handleClose = () => onClose();

  return (
    <div
      className="ModalOverlay"
      style={{
        display: show ? 'block' : 'none',
      }}
    >
      <div className="Modal">
        <button className="ModalClose" onClick={handleClose}>
          ✕
        </button>
        <div className="ModalBody">
          <Card modalView={true} image={RectImg} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
