function InfoTooltip({ isOpen, onClose, isSuccess }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="tooltip">
      <div className="tooltip__container">
        <button
          className="tooltip__close"
          type="button"
          aria-label="Fechar"
          onClick={onClose}
        >
          <img src="/images/close.png" alt="Fechar" />
        </button>

        <div className="tooltip__content">
          <div
            className={`tooltip__icon ${
              !isSuccess ? "tooltip__icon_error" : ""
            }`}
          >
            {isSuccess ? "✓" : "×"}
          </div>

          <h2 className="tooltip__title">
            {isSuccess
              ? "Você foi registrado com sucesso!"
              : "Ops, algo saiu deu errado! Por favor, tente novamente."}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;