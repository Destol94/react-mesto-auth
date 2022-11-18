
import { useCallback, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import AuthForm from './AuthForm';


function Register({ loggedIn, onRegister, link }) {
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
    onRegister(formData.email, formData.password);
  }, [formData, onRegister])

  if (loggedIn) {
    return <Redirect to="/" />
  }

  return (
    <AuthForm onSubmit={submitForm} name="formRegistration" titleForm="Регистрация" formData={formData} handleInputChange={handleInputChange} textButton="Зарегистрироваться" >
      <Link className="sign-form__link" to={link} >Уже зарегистрированы? Войти</Link>
    </AuthForm>
  )
}
export default Register;