import React from 'react';
import Modal from 'react-modal';
import css from '.Modal.module.css';

 const CustomModal = ({ isOpen, imageUrl, onClose }) => {
  return (
    <div className={`overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div className={css.modal}>
        <img src={imageUrl} alt="" />
      </div>
    </div>
  );
};

export default CustomModal;
