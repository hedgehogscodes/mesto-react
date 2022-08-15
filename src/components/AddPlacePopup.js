import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose}) {
  return (
    <PopupWithForm
      name={"add"}
      title={"Новое место"}
      buttonTitle={'Создать'}
      isOpen={isOpen}
      onClose={onClose}
    >
       <label className="popup__form-label">
          <input name="title" id="title" type="text" className="popup__input popup__input_type_title" autoComplete="off" placeholder="Название" minLength="2" maxLength="30" required/>
          <span id="title-error" className=""></span>
        </label>
        <label className="popup__form-label">
          <input name="link" id="link" type="url" className="popup__input popup__input_type_link" placeholder="Ссылка на картинку" required />
          <span id="link-error" className=""></span>
        </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;