function RemoveCard({ onSubmit, }) {

  return (
        <form 
          className="popup__form" 
          onSubmit={onSubmit}>

          <button 
            className="popup__save-button"
            type="submit">
              Sim
          </button>
        </form>
      );
    }

export default RemoveCard;