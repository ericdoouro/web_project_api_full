import { useState, useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfile({ onClose }) {
  const { currentUser, handleUpdateUser } =
  useContext(CurrentUserContext);

  const [name, setName] = useState(currentUser.name || ""); // Adicione variável de estado para nome
  const [description, setDescription] = useState(currentUser.about || "");
  

  const handleNameChange = (e) => {
    setName(e.target.value); 
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    handleUpdateUser({ 
      name: name, 
      about: description,
    })
      .then(() => {
        onClose();
    })
    .catch(console.error);
  };


 return (
    <form
      className='popup__form'
      name='profile-form'
      id='edit-profile-form'
      noValidate
      onSubmit={handleSubmit}>
      <label className='popup__label'>
        <input
          className='popup__input popup__input_type_name'
          id='owner-name'
          maxLength='40'
          minLength='2'
          name='userName'
          placeholder='Name'
          required
          type='text'
          value={name || ""} // Vincular nome ao campo de entrada
          onChange={handleNameChange} // Adicionar manipulador onChange
        />
        <span className='popup__error' id='owner-name-error'></span>
      </label>
      <label className='popup__label'>
        <input
          className='popup__input popup__input_type_description'
          id='owner-description'
          maxLength='200'
          minLength='2'
          name='userDescription'
          placeholder='About me'
          required
          type='text'
          value={description || ""} // Vincular nome ao campo de entrada
          onChange={handleDescriptionChange} // Adicionar manipulador onChange
        />
        <span className='popup__error' id='owner-description-error'></span>
      </label>
      <button 
        className='popup__save-button' 
        type='submit'
        >
        Salvar
      </button>
    </form>
  );
}

export default EditProfile;