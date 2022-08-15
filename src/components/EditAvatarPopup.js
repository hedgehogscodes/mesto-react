import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose }) {

  return (
    <PopupWithForm
      name={"avatar"}
      title={"Обновить аватар"}
      buttonTitle={'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
    >
      <label className="popup__form-label">
          <input name="link" id="avatarlink" type="url" className="popup__input popup__input_type_link" placeholder="Ссылка на аватар" required />
          <span id="avatarlink-error" className=""></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;