import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup({ isOpen, onClose }) {

  return (
    <PopupWithForm
      name={"confirm"}
      title={"Вы уверены?"}
      buttonTitle={'Да'}
      isOpen={isOpen}
      onClose={onClose}
    />
  );
}

export default DeleteCardPopup;