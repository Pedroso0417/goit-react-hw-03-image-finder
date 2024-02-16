import PropTypes from 'prop-types';
import Modal from 'react-modal';

import css from './Modal.module.css';

Modal.setAppElement('#root');

const CustomModal = ({ isOpen, imageUrl, onClose }) => {
  return (
    <div className={`overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div className={css.modal}>
        <img src={imageUrl} alt="" />
      </div>
    </div>
  );
};

CustomModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,

  imageUrl: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};
export { Modal };
