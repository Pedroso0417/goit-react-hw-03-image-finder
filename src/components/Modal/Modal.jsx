import PropTypes from 'prop-types';
import Modal from 'react-modal';
import css from '.Modal.module.css';

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
  isOpen: PropTypes.func.isRequired,
  onClose: PropTypes.bool.isRequired,
  imageUrl: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};
export default CustomModal;
