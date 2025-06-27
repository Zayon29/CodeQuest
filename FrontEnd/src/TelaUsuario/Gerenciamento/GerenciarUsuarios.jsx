import React, { useState } from 'react';
import DetalhesUsuario from './DetalhesUsuario';
import ConfirmationPopup from '../../PopUP/ConfirmationPopup'; 
import './GerenciarUsuarios.css';

// Dados de exemplo para visualização inicial. 
// No futuro, você substituirá isso por uma chamada de API.
const usuariosIniciais = [
  { 
    id: 1, 
    nome: 'Alice', 
    email: 'alice@email.com', 
    pontos: 15200, 
    isAdmin: true, 
    desafiosResolvidos: ['id1', 'id2'] 
  },
  { 
    id: 2, 
    nome: 'Beto', 
    email: 'beto@email.com', 
    pontos: 9800, 
    isAdmin: false, 
    desafiosResolvidos: ['id1'] 
  },
  { 
    id: 3, 
    nome: 'Carla', 
    email: 'carla@email.com', 
    pontos: 28100, 
    isAdmin: false, 
    desafiosResolvidos: ['id1', 'id3', 'id4'] 
  },
  { 
    id: 4, 
    nome: 'Daniel Longo Nome', 
    email: 'daniel.longo@email.com', 
    pontos: 500, 
    isAdmin: false, 
    desafiosResolvidos: [] 
  },
  { 
    id: 5, 
    nome: 'Elena', 
    email: 'elena@email.com', 
    pontos: 12345, 
    isAdmin: false, 
    desafiosResolvidos: ['id1', 'id2', 'id3'] 
  },
  { 
    id: 6, 
    nome: 'Fábio', 
    email: 'fabio@email.com', 
    pontos: 6789, 
    isAdmin: true, 
    desafiosResolvidos: ['id1'] 
  },
];


function GerenciarUsuarios() {
  const [usuarios, setUsuarios] = useState(usuariosIniciais);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);

  // Estados para controlar o pop-up de confirmação
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [usuarioParaDeletar, setUsuarioParaDeletar] = useState(null);
  
  // Função para salvar as alterações feitas na tela de detalhes
  const handleSave = (usuarioAtualizado) => {
    setUsuarios(usuarios.map(u => u.id === usuarioAtualizado.id ? usuarioAtualizado : u));
    setUsuarioSelecionado(usuarioAtualizado); 
  };
  
   // PASSO 1: O botão "Deletar" na tela de detalhes chama esta função.
  const handleDeleteRequest = (usuarioId) => {
    // O PONTO-CHAVE É AQUI: Esta função só faz DUAS coisas:
    // 1. Guarda o ID do usuário que talvez será deletado.
    setUsuarioParaDeletar(usuarioId);
    // 2. Manda o pop-up aparecer.
    setShowConfirmPopup(true);
    
    // ELA NÃO CHAMA setUsuarioSelecionado(null). Por isso, a tela de detalhes continua aberta.
  };

  // PASSO 2: Se o usuário clica em "Confirmar" no pop-up, esta função é chamada.
  const handleConfirmDelete = () => {
    // Agora sim, fazemos a lógica de exclusão...
    setUsuarios(usuarios.filter(u => u.id !== usuarioParaDeletar));
    
    // ...escondemos o pop-up...
    setShowConfirmPopup(false);
    
    // ...E FINALMENTE, fechamos a tela de detalhes, voltando para a lista.
    setUsuarioSelecionado(null); 
    
    setUsuarioParaDeletar(null);
  };
  
  // PASSO 3: Se o usuário clica em "Cancelar" no pop-up, esta função é chamada.
  const handleCancelDelete = () => {
    // Apenas escondemos o pop-up. O usuário continua na tela de detalhes.
    setShowConfirmPopup(false);
    setUsuarioParaDeletar(null);
  };


  // Se um usuário foi selecionado, mostra a tela de detalhes dele
  if (usuarioSelecionado) {
    return (
      <DetalhesUsuario 
        usuario={usuarioSelecionado}
        onBack={() => setUsuarioSelecionado(null)}
        onSave={handleSave}
        onDelete={handleDeleteRequest}
      />
    );
  }

  // Se nenhum usuário foi selecionado, mostra a lista
  return (
    <div className="gerenciar-view">
      <h2 className="gerenciar-title">Gerenciar Usuários</h2>
      <p className="gerenciar-subtitle">Clique em um usuário para ver os detalhes e editar.</p>
      
      <div className="list-box">
        <div className="list-header">
          <span>Nome</span>
          <span>Email</span>
        </div>

        <div className="user-list">
          {usuarios.map(user => (
            <div key={user.id} className="user-item" onClick={() => setUsuarioSelecionado(user)}>
              <span className="user-name">
                {user.nome}
                {user.isAdmin && <span className="admin-badge">Admin</span>}
              </span>
              <span className="user-email">{user.email}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Renderiza o pop-up de confirmação apenas quando 'showConfirmPopup' for true */}
      {showConfirmPopup && (
        <ConfirmationPopup
          mensagem="Tem certeza que deseja excluir este usuário? Esta ação não pode ser desfeita."
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
}

export default GerenciarUsuarios;