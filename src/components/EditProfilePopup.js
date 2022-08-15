import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose}) {
  return (
    <PopupWithForm
      name={"edit"}
      title={"Редактировать профиль"}
      buttonTitle={'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
    >
      <label className="popup__form-label">
          <input name="name" id="name" type="text" className="popup__input popup__input_type_name" autoComplete="off" placeholder="Имя" minLength="2" maxLength="40" required />
          <span id="name-error" className=""></span>
        </label>
        <label className="popup__form-label">
          <input name="status" id="status" type="text" className="popup__input popup__input_type_status" autoComplete="off" placeholder="Статус" minLength="2" maxLength="200" required />
          <span id="status-error" className=""></span>
        </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;