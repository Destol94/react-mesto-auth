import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { useState, useEffect } from 'react';
import api from '../utils/Api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(null);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(null);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState([]);

  const [cards, setCards] = useState([]);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(error => console.log(error));
  }
  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((item) => { return !(item.owner._id === currentUser._id && card._id === item._id) }));
      })
      .catch(error => console.log(error));
  }
  useEffect(() => {
    api.getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch(error => console.log(error));
  }, []);


  useEffect(() => {
    api.getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  function closeAllPopups(set) {
    set(false);
  }
  function handleUpdateUser({ name, about }) {
    api.patchUserInfo(name, about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups(setIsEditProfilePopupOpen);
      })
  }
  function handleUpdateAvatar({ avatar }) {
    api.patchAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups(setIsEditAvatarPopupOpen);
      })
      .catch((error) => { console.log(error) })
  }

  function handleAddPlaceSubmit({ name, url, cleanForm }) {
    api.patchCard(name, url)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups(setIsAddPlacePopupOpen);
        cleanForm();
      })
      .catch((error) => { console.log(error) })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Header />
          <Main onEditProfile={handleEditProfileClick} cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} />
          <Footer />
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={() => { closeAllPopups(setIsEditProfilePopupOpen) }} onUpdateUser={handleUpdateUser} />
          
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={() => { closeAllPopups(setIsAddPlacePopupOpen) }} onAddPlace={handleAddPlaceSubmit} />
          <PopupWithForm onClose={() => { closeAllPopups() }} name="confirm" title="Вы уверены?" buttonText="Да" />
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={() => { closeAllPopups(setIsEditAvatarPopupOpen) }} onUpdateAvatar={handleUpdateAvatar} />
          <ImagePopup card={selectedCard} onClose={() => { closeAllPopups(handleCardClick) }} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
