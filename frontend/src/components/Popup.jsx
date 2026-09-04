function Popup({ title, children, onClose }) {

  return (
    <div className="popup popup_opened">
      <div
        className={`popup__container ${
          !title ? "popup__container-image" : ""
        }`}
      >
        <button
          className="popup__close-button"
          onClick={onClose}
        ></button>

        {title && <h3 className="popup__title">{title}</h3>}

        {children}
      </div>
    </div>
  );
}

export default Popup;