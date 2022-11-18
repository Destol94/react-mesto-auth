import { useCallback, useState } from "react";
import { Redirect } from 'react-router-dom';
import AuthForm from "./AuthForm";

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
    <AuthForm onSubmit={submitForm} name="formLogin" titleForm="Вход" formData={formData} handleInputChange= {handleInputChange} textButton="Войти" />
  )
}
export default Login;