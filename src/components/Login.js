import { useCallback, useState } from "react";
import { Redirect } from 'react-router-dom';

function Login({ loggedIn, onLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }, [formData]);

  const submitForm = useCallback((e) => {
    e.preventDefault();
    onLogin(formData.email, formData.password);
  }, [formData, onLogin]);

  if (loggedIn) {
    return <Redirect to="/" />
  }
  return (
    <form className="sign-form" onSubmit={submitForm} name="formLogin">
      <h2 className="sign-form__title">Вход</h2>
      <input className="sign-form__input sign-form__email" placeholder="Email" name="email" required value={formData.email} onChange={handleInputChange} />
      <input type="password" className="sign-form__input sign-form__pass" placeholder="Пароль" name="password" required value={formData.password} onChange={handleInputChange} />
      <button className="sign-form__button">Войти</button>
    </form>
  )
}
export default Login;