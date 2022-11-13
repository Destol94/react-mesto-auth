
import { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import trashCan from '../images/trashcan.svg';

function Card(props) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const cardDeleteBtnClassName = (`element__trashcan button ${isOwn ? 'element__trashcan_visible' : 'element__trashcan_hidden'}`);

  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (`${isLiked ? 'element__btn-heart_activ' : ''} element__btn-heart button`);

  function imgClick() {
    props.onCardClick(props.card);
  }
  function handleLikeClick() {
    props.onCardLike(props.card);
  }
  function handleDeleteClick() {
    props.onCardDelete(props.card)
  }

  return (
    <div className="element" >
      <img src={props.card.link} alt={props.card.name} className="element__img" onClick={imgClick} />
      <div className="element__footer">
        <h2 className="element__text">{props.card.name}</h2>
        <div className="element__box-like">
          <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button"></button>
          <p className="element__number-of-likes">{props.card.likes.length}</p>
        </div>
        <button className={cardDeleteBtnClassName} onClick={handleDeleteClick} ><img src={trashCan} alt="кнопка удаления карточки" /></button>
      </div>
    </div>
  )
}
export default Card;