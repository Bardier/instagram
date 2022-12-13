import "../Forms.scss";

import Spinner from "../../../assets/img/spinning-loading.gif";
import { useState } from "react";

const RegistrationForm = ({ onCloseModal }) => {
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    // todo добавить валидацию всех полей
    if (
      form.elements.password.value !== form.elements["confirm-password"].value
    ) {
      alert("Пароль не совпадает");
      return;
    }

    setIsLoading(true);

    const newUser = {
      name: form.elements.name.value,
      email: form.elements.email.value,
      password: form.elements.password.value,
      // todo сделать добавление файла аватарки
      avatar: form.elements.avatar.value,
      followers: [],
    };

    fetch("http://localhost:5000/api/auth/registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => {
        setIsLoading(false);
        return response.json();
      })
      .then((data) => alert(data.message));
  };

  return (
    // todo переписать форму на formik
    <form className="form" onSubmit={onSubmit}>
      <h2 className="form__title">Регистрация</h2>
      <label className="form__label">
        Name
        <input name="name" type="text" className="form__input" />
      </label>
      <label className="form__label">
        Avatar
        <input name="avatar" type="file" className="form__input" />
      </label>
      <label className="form__label">
        Email
        <input name="email" type="text" className="form__input" />
      </label>
      <label className="form__label">
        Password
        <input name="password" type="password" className="form__input" />
      </label>
      <label className="form__label">
        Confirm password
        <input
          name="confirm-password"
          type="password"
          className="form__input"
        />
      </label>
      <button type="submit">
        {isLoading && <img src={Spinner} alt="" className="form__spinner" />}
        Регистрация
      </button>
    </form>
  );
};

export default RegistrationForm;
