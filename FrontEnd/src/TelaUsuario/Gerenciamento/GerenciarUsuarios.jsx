// src/components/Gerenciamento/GerenciarUsuarios.jsx
import React, { useState } from 'react';
import DetalhesUsuario from './DetalhesUsuario';
import ConfirmationPopup from '../../PopUP/ConfirmationPopup';
import './GerenciarUsuarios.css';

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

  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [usuarioParaDeletar, setUsuarioParaDeletar] = useState(null);

  const handleSave = (usuarioAtualizado) => {
    setUsuarios(usuarios.map(u => u.id === usuarioAtualizado.id ? usuarioAtualizado : u));
    setUsuarioSelecionado(usuarioAtualizado);
  };

  const handleDeleteRequest = (usuarioId) => {
    setUsuarioParaDeletar(usuarioId);
    setShowConfirmPopup(true);
  };

  const handleConfirmDelete = () => {
    setUsuarios(usuarios.filter(u => u.id !== usuarioParaDeletar));
    setShowConfirmPopup(false);
    setUsuarioSelecionado(null);
    setUsuarioParaDeletar(null);
  };

  const handleCancelDelete = () => {
    setShowConfirmPopup(false);
    setUsuarioParaDeletar(null);
  };

  if (usuarioSelecionado) {
    return (
      <>
        <DetalhesUsuario 
          usuario={usuarioSelecionado}
          onBack={() => setUsuarioSelecionado(null)}
          onSave={handleSave}
          onDelete={handleDeleteRequest}
        />
        
        {showConfirmPopup && (
          <ConfirmationPopup
            mensagem={`Tem certeza que deseja excluir o usuário "${usuarios.find(u => u.id === usuarioParaDeletar)?.nome}"? Esta ação não pode ser desfeita.`}
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
          />
        )}
      </>
    );
  }

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
            <div
              key={user.id}
              className="user-item"
              onClick={() => setUsuarioSelecionado(user)}
            >
              <span className="user-name">
                {user.nome}
                {user.isAdmin && <span className="admin-badge">Admin</span>}
              </span>
              <span className="user-email">{user.email}</span>
            </div>
          ))}
        </div>
      </div>

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
