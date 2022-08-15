import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import { api } from "../utils/api.js";

function App() {
  // ----------------Хуки useState для состояний попапов-------------------------
  const [isPopupEditOpen, setIsPopupEditOpen] = React.useState(false);
  const [isPopupAddOpen, setIsPopupAddOpen] = React.useState(false);
  const [isPopupAvatarOpen, setIsPopupAvatarOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = React.useState(false);
  // ----------------------------------------------------------------------------


  //--------Состояния текущего пользователя, карточки и выбранная карточка-------
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState({});
  // ----------------------------------------------------------------------------


  //--------Функции обрабатывающие нажатия кнопок -------------------------------
  function handleEditAvatarClick(){
    setIsPopupAvatarOpen(true);
  }

  function handleEditProfileClick(){
    setIsPopupEditOpen(true);
  }

  function handleAddPlaceClick(){
    setIsPopupAddOpen(true);
  }

  function handleDeleteCardClick() {
    setDeleteCardPopupOpen(true);
  }
  // ----------------------------------------------------------------------------


  //--------Функция обрабатывающая нажатие кнопки закрытия ----------------------
  function closeAllPopups() {
    setIsPopupAvatarOpen(false);
    setIsPopupEditOpen(false);
    setIsPopupAddOpen(false);
    setDeleteCardPopupOpen(false);
    setSelectedCard({ isOpen: false });
    
  }
  //-----------------------------------------------------------------------------

  //--------Функция обрабатывающая нажатие по карточке --------------------------
  function handleCardClick(card) {
    setSelectedCard({
      isOpen: true,
      link: card.link,
      title: card.name,
    });
  }
  // ----------------------------------------------------------------------------

  React.useEffect(() => {
    const promises = [api.getUserInfo(), api.getInitialCards()];

    Promise.all(promises)
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards);
      })
      .catch((err) => console.log(`Error ${err}`));
  }, []);


  return (
    <div className="page">
      <div className="container">
        <Header />
        <Main  
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cards}
          currentUser={currentUser}
          onCardDelete={handleDeleteCardClick}
        />
        <Footer />
      </div>

      <EditAvatarPopup
        isOpen={isPopupAvatarOpen}
        onClose={closeAllPopups}
      />

      
      <EditProfilePopup
        isOpen={isPopupEditOpen}
        onClose={closeAllPopups}
      />
      

      <AddPlacePopup
        isOpen={isPopupAddOpen}
        onClose={closeAllPopups}
      />

      <DeleteCardPopup
        isOpen={isDeleteCardPopupOpen}
        onClose={closeAllPopups}
      />
      

      <ImagePopup
        card={selectedCard}
        isOpen={selectedCard.isOpen}
        onClose={closeAllPopups}
      />
      
    </div>
  );
}

export default App;
