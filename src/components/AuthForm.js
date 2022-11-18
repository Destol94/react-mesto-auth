export default function AuthForm({onSubmit, name, titleForm, formData, handleInputChange, textButton, children }) {
  return (
    <form className="sign-form" name={name} onSubmit={onSubmit}>
      <h2 className="sign-form__title">{titleForm}</h2>
      <input className="sign-form__input sign-form__email" placeholder="Email" name="email" value={formData.email} onChange={handleInputChange} required />
      <input type="password" className="sign-form__input sign-form__pass" name="password" value={formData.password} onChange={handleInputChange} placeholder="Пароль" required />
      <button className="sign-form__button">{textButton}</button>
      {children}
    </form>
  )
}