import React from 'react';
import './TelaAdmin.css';

function TelaAdmin({ onClose }) {
  return (
    <div className="admin-overlay">
      <div className="admin-container">
        <h2 className="admin-title">Painel de Administração</h2>
        
        <div className="admin-sections">
          {/* Seção de Usuários */}
          <div className="admin-section">
            <h3 className="section-title">Gerenciar Usuários</h3>
            <div className="crud-buttons">
              <button className="admin-button create">Criar Usuário</button>
              <button className="admin-button read">Listar Usuários</button>
              <button className="admin-button update">Editar Usuário</button>
              <button className="admin-button delete">Remover Usuário</button>
            </div>
          </div>
          
          {/* Seção de Desafios */}
          <div className="admin-section">
            <h3 className="section-title">Gerenciar Desafios</h3>
            <div className="crud-buttons">
              <button className="admin-button create">Novo Desafio</button>
              <button className="admin-button read">Ver Desafios</button>
              <button className="admin-button update">Editar Desafio</button>
              <button className="admin-button delete">Excluir Desafio</button>
            </div>
          </div>
        </div>
        
        <button className="admin-close-button" onClick={onClose}>
          Voltar
        </button>
      </div>
    </div>
  );
}

export default TelaAdmin;