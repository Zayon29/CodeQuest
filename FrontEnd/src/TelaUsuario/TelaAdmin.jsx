import React, { useState } from 'react';
import './TelaAdmin.css';
import GerenciarUsuarios from './Gerenciamento/GerenciarUsuarios';
import GerenciarDesafios from './Gerenciamento/GerenciarDesafios';

function TelaAdmin({ onClose }) {
  const [telaAtiva, setTelaAtiva] = useState('principal'); // 'principal', 'usuarios', 'desafios'

  const renderizarConteudo = () => {
    switch(telaAtiva) {
      case 'usuarios':
        return <GerenciarUsuarios onBack={() => setTelaAtiva('principal')} />;
      case 'desafios':
        return <GerenciarDesafios onBack={() => setTelaAtiva('principal')} />;
      default:
        return (
          <>
            <h2 className="admin-title">Painel de Administração</h2>
            <div className="admin-buttons-container">
              <button 
                className="admin-main-button"
                onClick={() => setTelaAtiva('usuarios')}
              >
                <i className="button-icon">👥</i>
                Gerenciar Usuários
              </button>
              
              <button 
                className="admin-main-button"
                onClick={() => setTelaAtiva('desafios')}
              >
                <i className="button-icon">💻</i>
                Gerenciar Desafios
              </button>
            </div>
          </>
        );
    }
  };

  return (
    <div className="admin-overlay">
      <div className="admin-container">
        {renderizarConteudo()}
        
        {/* Botão Voltar funciona diferente dependendo da tela */}
        {telaAtiva === 'principal' ? (
          <button className="admin-close-button" onClick={onClose}>
            Voltar
          </button>
        ) : (
          <button 
            className="admin-close-button" 
            onClick={() => setTelaAtiva('principal')}
          >
            Voltar ao Painel
          </button>
        )}
      </div>
    </div>
  );
}

export default TelaAdmin;