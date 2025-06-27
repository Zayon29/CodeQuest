import React, { useState, useEffect } from 'react';
import DetalhesUsuario from './DetalhesUsuario';
import ConfirmationPopup from '../../PopUP/ConfirmationPopup';
import './GerenciarUsuarios.css';

function GerenciarUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);

  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [usuarioParaDeletar, setUsuarioParaDeletar] = useState(null);

  const token = localStorage.getItem('token');
  const apiUrl = 'http://localhost:5000/api/user';

  useEffect(() => {
    fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setUsuarios(data))
      .catch(err => console.error('Erro ao buscar usuários:', err));
  }, []);

  const handleSave = (usuarioAtualizado) => {
    fetch(`${apiUrl}/${usuarioAtualizado._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(usuarioAtualizado),
    })
      .then(res => res.json())
      .then(data => {
        const usuarioAtualizado = data.usuario;
        setUsuarios(usuarios.map(u => u._id === usuarioAtualizado._id ? usuarioAtualizado : u));
        setUsuarioSelecionado(usuarioAtualizado);
      })
      .catch(err => console.error('Erro ao atualizar usuário:', err));
  };

  const handleDeleteRequest = (usuarioId) => {
    setUsuarioParaDeletar(usuarioId);
    setShowConfirmPopup(true);
  };

  const handleConfirmDelete = () => {
    fetch(`${apiUrl}/${usuarioParaDeletar}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        setUsuarios(usuarios.filter(u => u._id !== usuarioParaDeletar));
        setShowConfirmPopup(false);
        setUsuarioSelecionado(null);
        setUsuarioParaDeletar(null);
      })
      .catch(err => console.error('Erro ao deletar usuário:', err));
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
            mensagem={`Tem certeza que deseja excluir o usuário "${usuarios.find(u => u._id === usuarioParaDeletar)?.nome}"? Esta ação não pode ser desfeita.`}
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
              key={user._id}
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
    </div>
  );
}

export default GerenciarUsuarios;