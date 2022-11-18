
import { useCallback, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';


function Register({loggedIn, onRegister, link}) {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const handleInputChange = useCallback((event) => {
    const {name, value} = event.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }, [formData]);

  const submitForm = useCallback((e) => {
    e.preventDefault();
    onRegister(formData.email, formData.password);
  }, [formData, onRegister])
  if(loggedIn) {
    return <Redirect to="/" />
  }

  return (
    <form className="sign-form" name="formRegistration" onSubmit={submitForm}>
      <h2 className="sign-form__title">Регистрация</h2>
      <input className="sign-form__input sign-form__email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" required />
      <input type="password" className="sign-form__input sign-form__pass" name="password" value={formData.password} onChange={handleInputChange} placeholder="Пароль" required />
      <button className="sign-form__button">Зарегистрироваться</button>
      <Link className="sign-form__link" to={link} >Уже зарегистрированы? Войти</Link>
    </form>
  )
}
export default Register;