
import cross from '../images/cross.svg';
import checkMark from '../images/checkMark.svg';

import closeButton from '../images/CloseIcon.svg';
function InfoTooltip(props) {
  return (
    <div className={`popup popup_${props.name} ${props.isOpen && 'popup_opened'}`} id={`popup_${props.name}`}>
      <form className="popup__form popup__info-tool-tip" name={props.name} id={`popupFormEdit_${props.name}`} noValidate>
        <img className="popup__info-tool-tip_res-img" src={props.responseText ? checkMark : cross} alt={props.loggedIn ? "галочка, ошибка регистрации" : "крестик, не удачная регистрация"} />
        <p className="popup__info-tool-tip_res-text" >{props.responseText ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</p>
        <button type="button" className="popup__btn-close button" onClick={props.isOpen ? props.onClose : undefined}><img className="popup__btn-close-img" alt="кнопка закрыть" src={closeButton} /></button>
      </form>
    </div>
  )
}
export default InfoTooltip;