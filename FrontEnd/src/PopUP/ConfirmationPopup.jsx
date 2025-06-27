import React from 'react';
import './ConfirmationPopup.css'; // Terá seu próprio CSS

function ConfirmationPopup({ mensagem, onConfirm, onCancel }) {
  return (
    <div className="confirm-overlay">
      <div className="confirm-popup">
        <div className="confirm-icon">❓</div>
        <h3 className="confirm-title">Confirmação</h3>
        <p className="confirm-message">{mensagem}</p>
        <div className="confirm-actions">
          <button className="btn-cancel-confirm" onClick={onCancel}>
            Cancelar
          </button>
          <button className="btn-confirm-action" onClick={onConfirm}>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationPopup;