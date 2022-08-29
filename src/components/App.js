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
import { CurrentUserContext } from "../contexts/CurrentUserContext";

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
  const [cardDelete, setCardDelete] = React.useState({});
  // ----------------------------------------------------------------------------

  //--------Состояние выполнения запроса ----------------------------------------
  const [isLoading, setLoading] = React.useState(false);
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

  function handleDeleteCardClick(card) {
    setDeleteCardPopupOpen(true);
    setCardDelete(card);
  }

  function handleCardClick(card) {
    setSelectedCard({
      isOpen: true,
      link: card.link,
      title: card.name,
    });
  }

  // ----------------------------------------------------------------------------

  //--------Функция обрабатывающая нажатие кнопки закрытия ----------------------
  function closeAllPopups() {
    setIsPopupAvatarOpen(false);
    setIsPopupEditOpen(false);
    setIsPopupAddOpen(false);
    setDeleteCardPopupOpen(false);
    setSelectedCard({ isOpen: false });
    setLoading(false);
  }
  //-----------------------------------------------------------------------------

  //--------Функции обрабатывающие Сабмиты --------------------------------------
  function handleUpdateUser({ name, status }) {
    setLoading(true);
    api
      .saveUserInfo({ name, status })
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch((err) => console.log(`Error ${err}`));
  }

  function handleUpdateAvatar({ link }) {
    setLoading(true);
    api
      .editAvatar(link)
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch((err) => console.log(`Error ${err}`));
  }

  function handleAddPlaceSubmit({ title, link }) {
    setLoading(true);
    api
      .addCard({ title, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(`Error ${err}`));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      })
      .catch((err) => console.log(`Error ${err}`));
  }

  function handleCardDelete(card) {
    setLoading(true);
    api
      .deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== card._id);
        setCards(newCards);
        closeAllPopups();
      })
      .catch((err) => console.log(`Error ${err}`));
  }
//-----------------------------------------------------------------------------

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
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="container">
          <Header />
          <Main  
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardDelete={handleDeleteCardClick}
            onCardLike={handleCardLike}
          />
          <Footer />
        </div>

        <EditAvatarPopup
          isOpen={isPopupAvatarOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />

        <EditProfilePopup
          isOpen={isPopupEditOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />
        
        <AddPlacePopup
          isOpen={isPopupAddOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />

        <DeleteCardPopup
          card={cardDelete}
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
          isLoading={isLoading}
        />
        
        <ImagePopup
          card={selectedCard}
          isOpen={selectedCard.isOpen}
          onClose={closeAllPopups}
        />
        
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
