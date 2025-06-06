import React from 'react';
import './DesafioResolvido.css';

function DesafioResolvido({ onClose, desafio }) {
  return (
    <div className="resolvido-overlay">
      <div className="resolvido-container">
        {/* Ícone de confirmação */}
        <div className="resolvido-icon">✓</div>
        
        <h2 className="resolvido-title">DESAFIO CONCLUÍDO!</h2>
        
        <div className="resolvido-details">
          <div className="detail-item">
            <span className="detail-label">Desafio:</span>
            <span className="detail-value">{desafio.titulo}</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Dificuldade:</span>
            <span className={`detail-value dificuldade-${desafio.dificuldade.toLowerCase()}`}>
              {desafio.dificuldade}
            </span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Pontos ganhos:</span>
            <span className="detail-value pontos">+{desafio.pontos || 100}</span>
          </div>
        </div>
        
        <div className="resolvido-actions">
          <button className="resolvido-button" onClick={onClose}>
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
}

export default DesafioResolvido;