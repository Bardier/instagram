import "../Forms.scss";

import Spinner from "../../../../assets/img/spinning-loading.gif";
import { useState } from "react";
import { authorization, login } from "../../../../actions/user";

const LoginForm = ({ onCloseModal, setIsLogin }) => {
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    setIsLoading(true);

    const loginUser = {
      email: form.elements.email.value,
      password: form.elements.password.value,
    };

    authorization("login", loginUser).then((data) => {
      setIsLoading(false);
      if (data.message) {
        alert(data.message);
        return;
      }

      localStorage.setItem("token", data.token);
      alert(`Добро пожаловать ${data.user.name}!`);

      setIsLogin(true);
      onCloseModal();
    });
  };

  return (
    // todo переписать форму на formik
    <form className="form" onSubmit={onSubmit}>
      <h2 className="form__title">Логин</h2>
      <label className="form__label">
        Email
        <input name="email" type="text" className="form__input" />
      </label>
      <label className="form__label">
        Password
        <input name="password" type="password" className="form__input" />
      </label>
      <button type="submit">
        {isLoading && <img src={Spinner} alt="" className="form__spinner" />}
        Логин
      </button>
    </form>
  );
};

export default LoginForm;
