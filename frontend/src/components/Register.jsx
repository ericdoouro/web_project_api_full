import { useState } from "react";

function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    onRegister({
      email,
      password,
    });
  }

  return (
    <main className="auth">
      <div className="auth__container">
        <h1 className="auth__title">Inscrever-se</h1>

        <form className="auth__form" onSubmit={handleSubmit}>
          <input
            className="auth__input"
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="auth__input"
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="auth__button" type="submit">
            Inscrever-se
          </button>
        </form>

        <p className="auth__question">
          Já é membro?{" "}
          <a className="auth__link" href="/signin">
            Faça login aqui
          </a>
        </p>
      </div>
    </main>
  );
}

export default Register;