import React from 'react';
import './Gerenciar.css';

function GerenciarDesafios({ onBack }) {
  const usuarios = [
    "Ana Silva", "Bruno Lima", "Carlos Souza", "Daniela Rocha",
    "Eduardo Alves", "Fernanda Dias", "Gabriel Costa", "Helena Moura",
    "Igor Ferreira", "Joana Martins", "Kleber Santos", "Laura Mendes",
    "Marcos Tavares", "Natalia Borges", "Otávio Ramos"
  ];

  return (
    <div className="admin-section">
      <h2 className="admin-title">Gerenciamento de Usuários</h2>

      <div className="lista-scroll">
        <ul className="lista">
          {usuarios.map((usuario, index) => (
            <li key={index} className="item">
              {usuario}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default GerenciarDesafios;
