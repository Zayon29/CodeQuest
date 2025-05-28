import React, { useState } from 'react';
import './login.css';

export default function Login({ onLogin, onCancel }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === 'user@retrowave.com' && senha === '123456') {
      setErro('');
      onLogin?.({ email });
    } else {
      setErro('Email ou senha inválidos');
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
          onChange={e => setEmail(e.target.value)}
          required
          autoFocus
        />

        <input
          className="input-field"
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          required
        />

        <button className="btn-login" type="submit">
          Entrar
        </button>

        {/* Botão Cancelar */}
        <button
          type="button"
          className="btn-cancel"
          onClick={() => onCancel?.()}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
}
