import ReactDOM from "react-dom";
import HeaderLogo from "../../assets/img/instagram.png";
import { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import "./Header.scss";
import RegistrationForm from "./Forms/RegistrationForm/RegistrationForm";
import LoginForm from "./Forms/LoginForm/LoginForm";

const Portal = ({ children }) => {
  const parentElement = document.querySelector("#modal-root");
  return ReactDOM.createPortal(children, parentElement);
};

const Header = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [registrationModal, setRegistrationModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);

    if (token) {
      //   todo сделать функцию которая будет делать запрос на пользователя в базе по токену
    }
  }, []);

  const onCloseModal = () => {
    setRegistrationModal(false);
    setLoginModal(false);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLogin(false);
  };
  return (
    <header className="header">
      <div className="container header__wrapper">
        <img src={HeaderLogo} alt="" className="header__logo" />
        <div className="header__btn-wrapper">
          {isLogin ? (
            <button onClick={logout}>Logout</button>
          ) : (
            <button onClick={() => setLoginModal(true)}>Login</button>
          )}

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
        {loginModal && (
          <Modal onCloseModal={onCloseModal}>
            <LoginForm onCloseModal={onCloseModal} setIsLogin={setIsLogin} />
          </Modal>
        )}
      </Portal>
    </header>
  );
};

export default Header;
