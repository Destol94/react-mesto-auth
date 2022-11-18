import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { useState, useEffect, useCallback } from 'react';
import api from '../utils/Api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import Login from './Login';
import { authorization, registration, tokenCheck } from '../utils/AuthMesto';
import InfoTooltip from './InfoTooltip';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(null);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(null);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(null);
  const [infoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState([]);
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [dataUser, setDataUser] = useState('');
  const [textErrorRegistration, setTextErrorRegistration] = useState('');

  const cbTokenCheck = useCallback(async () => {
    try {
      const jwt = localStorage.getItem('jwt');
      if (!jwt) {
        throw new Error('нет токена в кеше');
      }
      const cbToken = await tokenCheck(jwt);
      if (!cbToken) {
        throw new Error('токен не соответсвует пользовалетю');
      }
      setLoggedIn(true);
      setDataUser(cbToken.data.email);
    }
    catch { };
  }, []);

  const cbAutorization = useCallback(async (userName, password) => {
    try {
      const jwt = await authorization(userName, password);
      if (!jwt) {
        throw new Error('ошибка входа');
      }
      if (jwt.token) {
        setLoggedIn(true);
        localStorage.setItem('jwt', jwt.token);
        setDataUser(userName);
      }
    }
    catch (error) { console.log(error) }
  }, [])


  const cbRegistration = useCallback(async (userName, password) => {
    try {
      const data = await registration(userName, password);
      setTextErrorRegistration(data);
      console.log(data);
      if (!data) {
        throw new Error('ошибка регистрации');
      }

      if (data.jwt) {
        setLoggedIn(true);
        localStorage.setItem('jwt', data.jwt);
      }
    }
    catch { }
    finally {
      handleInfoTollTipClick();
      // setTextErrorRegistration('');
    }
  }, [])

  const cbLogOut = useCallback(() => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setDataUser('');
  }, []);


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

  useEffect(() => {
    cbTokenCheck();
  }, [cbTokenCheck]);

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
  function handleInfoTollTipClick() {
    setInfoTooltipOpen(true);
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
          <Switch>
            <ProtectedRoute exact
              path="/"
              component={Main}
              loggedIn={loggedIn}
              onLogout={cbLogOut}
              dataUser={dataUser}
              onEditProfile={handleEditProfileClick}
              cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick}
            />
            <Route path="/sign-up">
              <Header text="Войти" link="/sign-in" loggedIn={loggedIn} />
              <Register loggedIn={loggedIn} onRegister={cbRegistration} link="/sign-in" />
            </Route>
            <Route path="/sign-in">
              <Header text="Регистрация" link="/sign-up" loggedIn={loggedIn} />
              <Login loggedIn={loggedIn} onLogin={cbAutorization} />
            </Route>
            <Route>
              {loggedIn ? (<Redirect to="/" />) : (<Redirect to="/sign-in" />)}
            </Route>
          </Switch>
          {loggedIn && <Footer />}
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={() => { closeAllPopups(setIsEditProfilePopupOpen) }} onUpdateUser={handleUpdateUser} />
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={() => { closeAllPopups(setIsAddPlacePopupOpen) }} onAddPlace={handleAddPlaceSubmit} />
          <PopupWithForm onClose={() => { closeAllPopups() }} name="confirm" title="Вы уверены?" buttonText="Да" />
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={() => { closeAllPopups(setIsEditAvatarPopupOpen) }} onUpdateAvatar={handleUpdateAvatar} />
          <ImagePopup card={selectedCard} onClose={() => { closeAllPopups(handleCardClick) }} />
          <InfoTooltip isOpen={infoTooltipOpen} onClose={() => { closeAllPopups(setInfoTooltipOpen); setTextErrorRegistration(''); }} name="infoTooltip" loggedIn={loggedIn} responseText={textErrorRegistration} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
