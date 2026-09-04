function ImagePopup({ card, onClose }) {
  if (!card) return null;

  return (
    <div className="popup popup_opened">
      <div className=" popup__container-image">
        <button className="popup__close-button" onClick={onClose}></button>

        <img src={card.link} alt={card.name} className="popup__image" />
        <p className="popup__caption popup__image-text">{card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;