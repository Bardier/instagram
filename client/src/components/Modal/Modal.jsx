import PropTypes from "prop-types";

import "./Modal.scss";

const Modal = ({ children, onCloseModal }) => {
  return (
    <div className="modal" onMouseDown={onCloseModal}>
      <div className="modal__content" onMouseDown={(e) => e.stopPropagation()}>
        {children}
        <button className="modal__close" onClick={onCloseModal}>
          &#10006;
        </button>
      </div>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.element,
};

export default Modal;
