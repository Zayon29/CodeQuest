import React, { useState } from 'react';
import './TelaAdmin.css';
import GerenciarUsuarios from './Gerenciamento/GerenciarUsuarios';
import GerenciarDesafios from './Gerenciamento/GerenciarDesafios';

function TelaAdmin({ onClose }) {
  // Define a tela inicial como 'usuarios'. Não há mais uma tela 'principal'.
  const [telaAtiva, setTelaAtiva] = useState('usuarios'); 

  // Função para renderizar o conteúdo da direita baseado na telaAtiva
  const renderizarConteudo = () => {
    switch(telaAtiva) {
      case 'usuarios':
        return <GerenciarUsuarios />;
      case 'desafios':
        return <GerenciarDesafios />;
      default:
        // Como padrão, exibe a tela de usuários
        return <GerenciarUsuarios />;
    }
  };

  return (
    <div className="admin-overlay">
      <div className="admin-container">
        
        {/* Coluna da Esquerda: Barra Lateral com Botões */}
        <div className="admin-sidebar">
          <h2 className="sidebar-title">Admin</h2>
          <button 
            className={`sidebar-button ${telaAtiva === 'usuarios' ? 'active' : ''}`}
            onClick={() => setTelaAtiva('usuarios')}
          >
            <i className="button-icon">👥</i> Users
          </button>
          
          <button 
            className={`sidebar-button ${telaAtiva === 'desafios' ? 'active' : ''}`}
            onClick={() => setTelaAtiva('desafios')}
          >
            <i className="button-icon">💻</i> Desafios
          </button>

          {/* O botão de fechar fica na barra lateral para um visual mais limpo */}
          <button className="admin-close-button" onClick={onClose}>
            Fechar Painel
          </button>
        </div>

        {/* Coluna da Direita: Conteúdo Dinâmico */}
        <div className="admin-content">
          {renderizarConteudo()}
        </div>

      </div>
    </div>
  );
}

export default TelaAdmin;