import React, { useState } from 'react';
import './Cadastro.css';

export default function Cadastro({ onRegister, onCancel }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nome.trim() || !email.trim() || !senha.trim()) {
      setErro('Por favor, preencha todos os campos.');
      return;
    }

    setErro('');
    onRegister?.({ nome, email });
  };

  return (
    <div className="Cadastro-container">
      <h2>Cadastro</h2>

      {erro && <div className="error-message">{erro}</div>}

      <form onSubmit={handleSubmit}>
        <input
          className="input-field"
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={e => setNome(e.target.value)}
          required
          autoFocus
        />

        <input
          className="input-field"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
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
          Cadastrar
        </button>

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


