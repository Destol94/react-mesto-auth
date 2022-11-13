import closeIcon from '../images/CloseIcon.svg';

function ImagePopup(props) {
  return (
    <div className={`popup popup_image ${props.card && 'popup_opened'}`} id="popup_image">
      <div className="zoom">
        <figure className="zoom__container">
          <img className="zoom__img" src={props.card?.link} alt={props.card?.name} />
          <figcaption className="zoom__figcaption">{props.card?.name}</figcaption>
        </figure>
        <button onClick={props.card ? props.onClose : undefined} className="popup__btn-close button"><img className="popup__btn-close-img" alt="кнопка закрыть" src={closeIcon} /></button>
      </div>
    </div>
  )
}
export default ImagePopup;