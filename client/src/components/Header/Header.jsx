import ReactDOM from "react-dom";
import HeaderLogo from "../../assets/img/instagram.png";
import { useState } from "react";
import Modal from "../Modal/Modal";
import "./Header.scss";
import RegistrationForm from "../Forms/RegistrationForm/RegistrationForm";

const Portal = ({ children }) => {
  const parentElement = document.querySelector("#modal-root");
  return ReactDOM.createPortal(children, parentElement);
};

const Header = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [registrationModal, setRegistrationModal] = useState(false);

  const onCloseModal = () => {
    setRegistrationModal(false);
  };

  return (
    <header className="header">
      <div className="container header__wrapper">
        <img src={HeaderLogo} alt="" className="header__logo" />
        <div className="header__btn-wrapper">
          {isLogin ? <button>Logout</button> : <button>Login</button>}

          <button onClick={() => setRegistrationModal(true)}>
            Registration
          </button>
        </div>
      </div>

      <Portal>
        {registrationModal && (
          <Modal onCloseModal={onCloseModal}>
            <RegistrationForm onCloseModal={onCloseModal} />
          </Modal>
        )}
      </Portal>
    </header>
  );
};

export default Header;
