import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {

  const avatarSrcRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarSrcRef.current.value
    });
    avatarSrcRef.current.value = '';
  }

  return (
    <PopupWithForm onClose={props.onClose} name="avatar" buttonText="Сохранить" title="Обновить аватар" isOpen={props.isOpen} onSubmit={handleSubmit} >
      <div className="popup__field">
        <input className="popup__occupation popup__input" ref={avatarSrcRef} defaultValue="" type="url" name="link" id="inpitLinkAvatar" placeholder="Ссылка на картинку" required />
        <span className="popup__span-error inpitLinkAvatar-error"></span>
      </div>
    </PopupWithForm>
  )
}
export default EditAvatarPopup;