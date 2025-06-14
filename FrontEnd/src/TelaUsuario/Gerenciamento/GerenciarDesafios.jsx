import React, { useState } from 'react';
import './Gerenciar.css';

function GerenciarDesafios({ onBack }) {
  const [desafios, setDesafios] = useState([
    "Desafio 1: Lógica",
    "Desafio 2: React",
    "Desafio 3: Banco de Dados",
    "Desafio 4: Integração API",
    "Desafio 5: CSS Criativo"
  ]);

  const criarDesafio = () => {
    const novo = prompt("Digite o nome do novo desafio:");
    if (novo) {
      setDesafios([...desafios, novo]);
    }
  };

  return (
    <div className="admin-section">
      <h2 className="admin-title">Gerenciamento de Desafios</h2>

      <div className="lista-scroll">
        <ul className="lista">
          {desafios.map((desafio, index) => (
            <li key={index} className="item">{desafio}</li>
          ))}
        </ul>
      </div>

      <button className="menu-button" style={{ marginTop: '20px' }} onClick={criarDesafio}>
        Criar Desafio
      </button>
    </div>
  );
}

export default GerenciarDesafios;
