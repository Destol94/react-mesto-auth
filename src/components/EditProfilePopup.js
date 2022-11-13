import { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";


function EditProfilePopup(props) {

  const [name, setName] = useState('');
  function handleChangeName(e) {
    setName(e.target.value);
  }

  const [description, setDescription] = useState('');
  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  const currentUser = useContext(CurrentUserContext);
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);


  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }
  return (
    <PopupWithForm onClose={props.onClose} isOpen={props.isOpen} onSubmit={handleSubmit} name="profile" title="Редактировать профиль" buttonText="Сохранить">
      <div className="popup__field">
        <input type="text" className="popup__name popup__input" onChange={handleChangeName} value={name} name="inputName" id="inputName" placeholder="Имя" required minLength="2" maxLength="40" />
        <span className="popup__span-error inputName-error"></span>
      </div>
      <div className="popup__field">
        <input type="text" className="popup__occupation popup__input" onChange={handleChangeDescription} value={description} name="inpitOccupation" placeholder="О себе" id="inpitOccupation" required minLength="2" maxLength="200" />
        <span className="popup__span-error inpitOccupation-error"></span>
      </div>
    </PopupWithForm>
  )
}
export default EditProfilePopup;