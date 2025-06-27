// src/components/TelaInicial/ResultadoDesafio.jsx
import React from 'react';
import './ResultadoDesafio.css';

function ResultadoDesafio({ sucesso, mensagem, onClose }) {
  return (
    <div className="resultado-overlay">
      <div className="resultado-container">
        <h2 className={sucesso ? 'resultado-sucesso' : 'resultado-falha'}>
          {sucesso ? 'Parabéns! Código Correto!' : 'Ops! Código Incorreto!'}
        </h2>
        <pre className="resultado-mensagem">{mensagem}</pre>
        <button className="btn-fechar" onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
}

export default ResultadoDesafio;
