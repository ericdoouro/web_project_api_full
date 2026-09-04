import { useState, useEffect } from "react";

function NewCard({ onSubmit, onClose }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  const [errors, setErrors] = useState({
    name: "",
    link: "",
  });

  const [touched, setTouched] = useState({
      name: false,
      link: false,
    })

  const [isValid, setIsValid] = useState(false);

  // 🔥 VALIDAÇÃO
  useEffect(() => {
    const newErrors = {
      name: "",
      link: "",
    };

    // nome
    if (name.trim().length < 2) {
      newErrors.name = "Preencha esse campo.";
    }

    // link
    if (!link) {
      newErrors.link = "Link é obrigatório";
    } else {
      try {
        new URL(link);
      } catch {
        newErrors.link = "Digite uma URL válida";
      }
    }

    setErrors(newErrors);

    const formIsValid =
      !newErrors.name &&
      !newErrors.link &&
      name &&
      link;

    setIsValid(formIsValid);
  }, [name, link]);

    async function handleSubmit(e) {
    e.preventDefault();

    if (!isValid) return;

    await onSubmit({ name, link });

    setName("");
    setLink("");

    onClose();
  }

  return (
    <form className="popup__form" onSubmit={handleSubmit}>
      
      {/* TITLE */}
      <input
        className={`popup__input ${
          errors.name.length ? "popup__input_type_error" : ""
        }`}
        type="text"
        placeholder="Título"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setTouched({ ...touched, name: true });
        }}
      />

      {touched.name && errors.name && (
        <p className="popup__error">{errors.name}</p>
      )}

      {/* LINK */}
      <input
        className={`popup__input ${
          errors.link.length ? "popup__input_type_error" : ""
        }`}
        type="url"
        placeholder="Link da imagem"
        value={link}
        onChange={(e) => {
          setLink(e.target.value);
          setTouched({ ...touched, link: true });
        }}
      />

      {touched.link && errors.link && (
        <p className="popup__error ">{errors.link}</p>
      )}

      <button
        className={`popup__save-button ${
          !isValid ? "popup__save-button_disabled" : ""
        }`}
        type="submit"
        disabled={!isValid}
      >
        Criar
      </button>
    </form>
  );
}

export default NewCard;