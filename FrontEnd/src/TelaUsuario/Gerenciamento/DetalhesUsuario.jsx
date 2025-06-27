import React, { useState, useEffect } from 'react';
import './DetalhesUsuario.css';

function DetalhesUsuario({ usuario, onBack, onSave, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...usuario, novaSenha: '' });

  const token = localStorage.getItem('token');
  const apiUrl = 'http://localhost:5000/api/user';

  useEffect(() => {
    setFormData({ ...usuario, novaSenha: '' });
  }, [usuario]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const valorFinal = type === 'checkbox' ? checked : value;
    setFormData(prev => ({ ...prev, [name]: valorFinal }));
  };

  const handleSave = () => {
    const dadosParaSalvar = {
      nome: formData.nome,
      email: formData.email,
      isAdmin: formData.isAdmin,
    };

    if (formData.novaSenha) {
      dadosParaSalvar.senha = formData.novaSenha;
    }

    fetch(`${apiUrl}/${usuario._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dadosParaSalvar),
    })
      .then(res => res.json())
      .then(data => {
        onSave(data.usuario);
        setIsEditing(false);
      })
      .catch(err => console.error('Erro ao salvar usuário:', err));
  };

  const handleDelete = () => {
    onDelete(usuario._id);
  };

  return (
    <div className="user-detail-view-container">
      <div className="detail-header">
        <button className="btn btn-back" onClick={onBack}>
          &larr; Voltar para a Lista
        </button>
        <h2 className="detail-title">Detalhes de {usuario.nome}</h2>
      </div>

      <div className="detail-body">
        <div className="detail-field">
          <label>Nome</label>
          {isEditing ? <input type="text" name="nome" value={formData.nome} onChange={handleInputChange} /> : <span className="field-value">{usuario.nome}</span>}
        </div>

        <div className="detail-field">
          <label>Email</label>
          {isEditing ? <input type="email" name="email" value={formData.email} onChange={handleInputChange} /> : <span className="field-value">{usuario.email}</span>}
        </div>

        {isEditing && (
          <div className="detail-field">
            <label>Redefinir Senha</label>
            <input type="password" name="novaSenha" value={formData.novaSenha} onChange={handleInputChange} placeholder="Deixe em branco para não alterar" />
          </div>
        )}

        <div className="detail-field">
          <label>Pontos</label>
          <span className="field-value">{usuario.pontos}</span>
        </div>

        <div className="detail-field">
          <label>É Administrador?</label>
          {isEditing ? (
            <div className="checkbox-container">
              <input type="checkbox" name="isAdmin" id="isAdminCheckbox" className="detail-checkbox" checked={formData.isAdmin || false} onChange={handleInputChange} />
              <label htmlFor="isAdminCheckbox" className="checkbox-label">Sim</label>
            </div>
          ) : (
            <span className="field-value">{usuario.isAdmin ? 'Sim' : 'Não'}</span>
          )}
        </div>
        
        <div className="detail-field">
          <label>Desafios Resolvidos</label>
          <span className="field-value">{usuario.desafiosResolvidos ? usuario.desafiosResolvidos.length : 0}</span>
        </div>
      </div>

      <div className="detail-footer">
        {isEditing ? (
          <>
            <button className="btn btn-save" onClick={handleSave}>Salvar</button>
            <button className="btn btn-cancel" onClick={() => setIsEditing(false)}>Cancelar</button>
          </>
        ) : (
          <>
            <button className="btn btn-edit" onClick={() => setIsEditing(true)}>Editar</button>
            <button className="btn btn-delete" onClick={handleDelete}>Deletar Usuário</button>
          </>
        )}
      </div>
    </div>
  );
}

export default DetalhesUsuario;