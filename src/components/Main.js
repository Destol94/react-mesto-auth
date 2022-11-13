import plus from '../images/Vector.svg';
import { useContext } from 'react';
import pencil from '../images/pencil.svg';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <main className="main">
      <section className="profile">
        <div className="profile__container">
          <img src={currentUser.avatar} onClick={props.onEditAvatar} alt="Фотография Жак-Ив Кусто" className="profile__avatar" />
          <div className="profile__info">
            <div className="profile__name-edit">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button className="profile__edit-button button" onClick={props.onEditProfile} type="button"><img className="profile__edit-button-img" src={pencil} alt="кнопка изменить" /></button>
            </div>
            <p className="profile__occupation">{currentUser.about}</p>
          </div>
        </div>
        <button className="profile__add-button button" onClick={props.onAddPlace} type="button"><img src={plus} alt="добавить" className="profile__add-button-img" /></button>
      </section>
      <section className="elements">
        {props.cards.map((item) => (
          <Card card={item} key={item._id} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} />
        ))}
      </section>
    </main>
  )
}
export default Main;