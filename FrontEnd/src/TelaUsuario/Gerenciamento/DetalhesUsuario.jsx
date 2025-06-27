// src/components/Gerenciamento/DetalhesUsuario.jsx
// Adicionamos className="field-value" aos spans

import React, { useState, useEffect } from 'react';
import './DetalhesUsuario.css';

function DetalhesUsuario({ usuario, onBack, onSave, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...usuario, novaSenha: '' });

  useEffect(() => {
    setFormData({ ...usuario, novaSenha: '' });
  }, [usuario]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const valorFinal = type === 'checkbox' ? checked : value;
    setFormData(prev => ({ ...prev, [name]: valorFinal }));
  };

  const handleSave = () => {
    const dadosParaSalvar = { ...formData };
    if (!dadosParaSalvar.novaSenha) {
      delete dadosParaSalvar.novaSenha;
    }
    onSave(dadosParaSalvar);
    setIsEditing(false);
  };

  const handleDelete = () => {
   
    onDelete(usuario.id);
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
          {isEditing ? <input type="number" name="pontos" value={formData.pontos} onChange={handleInputChange} /> : <span className="field-value">{usuario.pontos}</span>}
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