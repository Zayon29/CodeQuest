import React from 'react';
import './ErrorPopup.css';

function ErrorPopup({ mensagem, onClose }) {  // ← Mude de 'message' para 'mensagem'
  return (
    <div className="error-overlay">
      <div className="error-popup">
        <div className="error-icon">⚠️</div>
        <h3 className="error-title">ERRO</h3>
        <p className="error-message">{mensagem}</p>  {/* ← Aqui também */}
        <button className="error-button" onClick={onClose}>
          Fechar
        </button>
      </div>
    </div>
  );
}

export default ErrorPopup;