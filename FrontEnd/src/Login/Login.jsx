import React, { useState } from "react";
import "./login.css";

export default function Login({ onLogin, onCancel }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!email || !senha) {
    setErro("Preencha todos os campos");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Erro ao logar");
    }

    localStorage.setItem('token', data.token);
    
    // Chama onLogin passando apenas os dados necessários
    onLogin?.(data.usuario);

  } catch (error) {
    setErro(error.message);
    console.error("Erro no login:", error);
  }
};

  return (
    <div className="login-container">
      <h2>Login</h2>

      {erro && <div className="error-message">{erro}</div>}

      <form onSubmit={handleSubmit}>
        <input
          className="input-field"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoFocus
        />

        <input
          className="input-field"
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />

        <button className="btn-login" type="submit">
          Entrar
        </button>

        <button type="button" className="btn-cancel" onClick={() => onCancel?.()}>
          Cancelar
        </button>
      </form>
    </div>
  );
}
