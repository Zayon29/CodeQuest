import React, { useState, useEffect } from 'react';
import './DetalhesDesafios.css';

function DetalhesDesafio({ desafio, onBack, onSave, onDelete }) {
  // --- MUDANÇA 1: O estado inicial de 'isEditing' agora depende do desafio
  const [isEditing, setIsEditing] = useState(!desafio.id); 

  const [formData, setFormData] = useState({
    ...desafio,
    linguagensSuportadasStr: desafio.linguagensSuportadas.join(', '),
  });

  // Este useEffect garante que, se um novo desafio for aberto, o formulário reinicie
  // E também entra no modo de edição se for um novo desafio (sem ID)
  useEffect(() => {
    setFormData({
      ...desafio,
      linguagensSuportadasStr: desafio.linguagensSuportadas.join(', '),
    });
    // Se o desafio não tem ID, é novo, então força o modo de edição.
    if (!desafio.id) {
      setIsEditing(true);
    }
  }, [desafio]);

  const handleInputChange = (e) => { /* ...código existente... */ };

  const handleSave = () => {
    const linguagensArray = formData.linguagensSuportadasStr.split(',').map(lang => lang.trim()).filter(Boolean);
    const dadosParaSalvar = { ...formData, linguagensSuportadas: linguagensArray };
    delete dadosParaSalvar.linguagensSuportadasStr;
    onSave(dadosParaSalvar);
    // Após salvar, saímos do modo de edição (seja criando ou atualizando)
    setIsEditing(false);
  };
  
  const handleDelete = () => { onDelete(desafio.id); };

  // --- MUDANÇA 2: Lógica do botão de cancelar melhorada ---
  const handleCancel = () => {
    // Se estiver criando (sem ID), o cancelar volta para a lista.
    if (!desafio.id) {
      onBack();
    } else {
      // Se estiver editando, apenas sai do modo de edição.
      setIsEditing(false);
    }
  };

  return (
    <div className="challenge-detail-view-container">
      <div className="detail-header">
        <button className="btn btn-back" onClick={onBack}>&larr; Voltar para a Lista</button>
        <h2 className="detail-title">{isEditing ? (desafio.id ? 'Editando Desafio' : 'Criar Novo Desafio') : `Detalhes de ${desafio.titulo}`}</h2>
      </div>

      <div className="detail-body">
        {/* ... JSX dos campos do formulário ... */}
      </div>

      <div className="detail-footer">
        {isEditing ? (
          <>
            <button className="btn btn-save" onClick={handleSave}>Salvar</button>
            <button className="btn btn-cancel" onClick={handleCancel}>Cancelar</button> {/* Usa o novo handleCancel */}
          </>
        ) : (
          <>
            <button className="btn btn-edit" onClick={() => setIsEditing(true)}>Editar</button>
            {/* --- MUDANÇA 3: Ocultar botão de deletar ao criar --- */}
            {desafio.id && (
              <button className="btn btn-delete" onClick={handleDelete}>Deletar Desafio</button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// função handleInputChange completa para referência
// const handleInputChange = (e) => { const { name, value } = e.target; setFormData(prev => ({ ...prev, [name]: value })); };

export default DetalhesDesafio;