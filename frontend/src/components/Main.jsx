import { useContext, useState } from "react";

import Card from "./Card";
import Popup from "./Popup";
import NewCard from "./NewCard";
import EditProfile from "./EditProfilePopup";
import EditAvatar from "./EditAvatarPopup";
import ImagePopup from "./ImagePopup";
import RemoveCard from "./RemoveCard";

import CurrentUserContext from "../contexts/CurrentUserContext";

function Main({ 
  cards,
  onCardLike,
  onCardDelete,
  onAddPlaceSubmit,
  popup,
  onOpenPopup,
  onClosePopup,
  cardToDelete,
  onConfirmDelete,
}) {

  // STATES
  const { currentUser } = useContext(CurrentUserContext);
  const [selectedCard, setSelectedCard] = useState(null);

  // ===== HANDLERS =====

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  // ===== POPUPS =====

  const editAvatarPopup = {
    title: "Editar Avatar",
    children: (
      <EditAvatar
        onClose={onClosePopup}
      />
    ),
  };

  const editProfilePopup = { 
    title: "Edita Perfil",
    children: (
      <EditProfile 
        onClose={onClosePopup} 
      />
    ),
  };

  const addCardPopup = {
    title: "Novo Card",
    children: (
      <NewCard
        onSubmit={onAddPlaceSubmit}
        onClose={onClosePopup}
      />
    )
  }

  return (
    <main className="content">
      
      {/* PROFILE */}
      <section className="profile">
        <div className="profile__avatar-container">
          <button
            className="profile__avatar-edit"
            onClick={() => onOpenPopup(editAvatarPopup)}
          >
            <img src="/images/edit.png" alt="Edit" />
          </button>

          <img
            className="profile__avatar"
            src={currentUser.avatar || null}
            alt="Perfil"
          />
        </div>

        <div className="profile__info">
          <div className="profile__info-text">
            <h2 className="profile__info-name">{currentUser.name}</h2>
            <button
              className="popup__edit-profile-button"
              onClick={() => onOpenPopup(editProfilePopup)}
            >
              <img src="/images/edit.png" alt="Edit" />
            </button>
          </div>

          <p className="profile__info-profession">{currentUser.about}</p>
        </div>

        <button
          className="profile__add"
          onClick={() => onOpenPopup(addCardPopup)}
        >
          <img src="/images/add.png" alt="Add" />
        </button>
      </section>

      {/* CARDS */}
      <section className="elements__container">
        <ul className="elements">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={handleCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>

      {/* POPUP PADRÃO */}
      {popup && (
        <Popup 
          title={popup.title} 
          onClose={onClosePopup}>
          {popup.children}
        </Popup>
      )}

      {/* POPUP DE IMAGEM */}
      {selectedCard && (
        <ImagePopup
          card={selectedCard}
          onClose={() => setSelectedCard(null)}
        />
      )}

      {cardToDelete && (
    <Popup
      title="Tem certeza?"
      onClose={() => 
        onCardDelete(null)}
    >
    
    <RemoveCard
        onSubmit={(e) => {
          e.preventDefault();
          onConfirmDelete();
        }}
      />
    </Popup>
  )}
    </main>
  );
}

export default Main;