import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({ card, onCardLike, onCardDelete, onCardClick }) {
  const { currentUser } = useContext(CurrentUserContext);
  const { name, link, likes = [] } = card;

  const isLiked = likes.includes(currentUser._id);

  function handleLikeClick() {
    onCardLike(card);
  }

  return (
    <li className="element__item">
      {/* DELETE */}
      <button
        className="element__delete-button"
        onClick={() => onCardDelete(card)}
      >
        <img
          className="element__delete-button-img"
          src="/images/delete.svg"
          alt="Delete"
        />
      </button>

      {/* IMAGE */}
      <img
        src={link}
        alt={name}
        className="element__item-img"
        onClick={() => onCardClick(card)}
      />

      {/* INFO */}
      <div className="element__item-info">
        <h2 className="element__item-info-text">{name}</h2>

        {/* LIKE */}
        <button
          className={`element__button ${
            isLiked ? "element__button_active" : ""
          }`}
          onClick={handleLikeClick}
        >
          <img
            className="element__like-img"
            src="/images/like.svg"
            alt="Like"
          />
        </button>
      </div>
    </li>
  );
}

export default Card;
