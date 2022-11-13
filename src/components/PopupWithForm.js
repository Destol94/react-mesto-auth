import closeButton from '../images/CloseIcon.svg';

function PopupWithForm(props) {
  return (
    <div className={`popup popup_${props.name} ${props.isOpen && 'popup_opened'}`} id={`popup_${props.name}`}>
      <form className="popup__form popup__form_edit" onSubmit={props.onSubmit} name={props.name} id="popupFormEdit" noValidate>
        <h2 className="popup__title">{`${props.title}`}</h2>
        {props.children}
        <button type="submit" className="popup__btn-submit button">{props.buttonText}</button>
        <button type="button" className="popup__btn-close button" onClick={props.isOpen ? props.onClose : undefined}><img className="popup__btn-close-img" alt="кнопка закрыть" src={closeButton} /></button>
      </form>
    </div>
  )
}
export default PopupWithForm;