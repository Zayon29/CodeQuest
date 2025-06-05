import React, { useState } from "react";
import "./TelaUsuario.css";

function PerfilUsuario({ usuario, onClose }) {
  return (
    <div className="perfil-overlay">
      <div className="perfil-container">
        <h2>Meu Perfil</h2>
        
        <div className="perfil-info">
          <div className="info-item">
            <span className="info-label">Nome:</span>
            <span className="info-value">{usuario.nome}</span>
          </div>
          
          <div className="info-item">
            <span className="info-label">Email:</span>
            <span className="info-value">{usuario.email}</span>
          </div>
          
          {/* Adicione mais informações conforme necessário */}
        </div>
        
        <button className="perfil-close-button" onClick={onClose}>
          Fechar
        </button>
      </div>
    </div>
  );
}

export default PerfilUsuario;