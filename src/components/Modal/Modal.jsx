import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import css from './Modal.module.css';

Modal.setAppElement('#root');

const CustomModal = ({ isOpen, imageUrl, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={css.modal}
      overlayClassName={css.overlay}
    >
      <img src={imageUrl} alt="" />
      <button className={css.closeButton} onClick={onClose}>
        &times;
      </button>
    </Modal>
  );
};

CustomModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  imageUrl: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

export { CustomModal as Modal };
