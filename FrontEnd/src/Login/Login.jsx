import React, { useState } from "react";
import "./login.css";

export default function Login({ onLogin, onCancel }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  // ARQUIVO: Login.jsx

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
      // Se a resposta não for OK, joga um erro com a mensagem do backend.
      throw new Error(data.msg || "Erro ao tentar fazer login");
    }

    // --- PONTO CRÍTICO ---
    // Garante que ambos os itens sejam salvos no localStorage.
    console.log("Salvando no localStorage:", { token: data.token, usuario: data.usuario });
    localStorage.setItem('token', data.token);
    localStorage.setItem('usuario', JSON.stringify(data.usuario));
    
    // Chama a função onLogin que veio do App.js (se ela existir)
    // para que o App possa atualizar seu próprio estado.
    if (onLogin) {
      onLogin(data.usuario, data.token);
    }

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