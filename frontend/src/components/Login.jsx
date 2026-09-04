import { useState } from "react";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    onLogin({
      email,
      password,
    });
  }

  return (
    <main className="auth">
      <div className="auth__container">
        <h1 className="auth__title">Entrar</h1>

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
            Entrar
          </button>
        </form>

        <p className="auth__question">
          Ainda não é membro?{" "}
          <a className="auth__link" href="/signup">
            Inscreva-se aqui
          </a>
        </p>
      </div>
    </main>
  );
}

export default Login;