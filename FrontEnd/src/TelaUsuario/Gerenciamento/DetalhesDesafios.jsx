// src/components/Gerenciamento/DetalhesDesafio.jsx

import React, { useState, useEffect } from 'react';
import './DetalhesDesafios.css'; // Usaremos um CSS próprio

function DetalhesDesafio({ desafio, onBack, onSave, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  
  // O estado do formulário lida com linguagens como uma string separada por vírgulas para facilitar a edição
  const [formData, setFormData] = useState({
    ...desafio,
    linguagensSuportadasStr: desafio.linguagensSuportadas.join(', '),
  });

  useEffect(() => {
    setFormData({
      ...desafio,
      linguagensSuportadasStr: desafio.linguagensSuportadas.join(', '),
    });
  }, [desafio]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Antes de salvar, converte a string de linguagens de volta para um array
    const linguagensArray = formData.linguagensSuportadasStr
      .split(',')
      .map(lang => lang.trim())
      .filter(Boolean); // Remove strings vazias

    const dadosParaSalvar = { ...formData, linguagensSuportadas: linguagensArray };
    delete dadosParaSalvar.linguagensSuportadasStr; // Remove o campo auxiliar

    onSave(dadosParaSalvar);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm(`Tem certeza que deseja excluir o desafio "${desafio.titulo}"?`)) {
      onDelete(desafio.id);
    }
  };

  return (
    <div className="challenge-detail-view-container">
      <div className="detail-header">
        <button className="btn btn-back" onClick={onBack}>&larr; Voltar para a Lista</button>
        <h2 className="detail-title">{isEditing ? 'Editando Desafio' : `Detalhes de ${desafio.titulo}`}</h2>
      </div>

      <div className="detail-body">
        <div className="detail-field-full">
          <label>Título</label>
          {isEditing ? <input type="text" name="titulo" value={formData.titulo} onChange={handleInputChange} /> : <span className="field-value">{desafio.titulo}</span>}
        </div>

        <div className="detail-field-full">
          <label>Descrição</label>
          {isEditing ? <textarea name="descricao" rows="4" value={formData.descricao} onChange={handleInputChange}></textarea> : <p className="field-value-multiline">{desafio.descricao}</p>}
        </div>

        <div className="detail-field-full">
          <label>Exemplo de Entrada</label>
          {isEditing ? <textarea name="entradaExemplo" rows="2" value={formData.entradaExemplo} onChange={handleInputChange}></textarea> : <pre className="field-value-code">{desafio.entradaExemplo}</pre>}
        </div>
        
        <div className="detail-field-full">
          <label>Exemplo de Saída</label>
          {isEditing ? <textarea name="saidaExemplo" rows="2" value={formData.saidaExemplo} onChange={handleInputChange}></textarea> : <pre className="field-value-code">{desafio.saidaExemplo}</pre>}
        </div>

        <div className="detail-field">
          <label>Dificuldade</label>
          {isEditing ? (
            <select name="dificuldade" value={formData.dificuldade} onChange={handleInputChange}>
              <option value="fácil">Fácil</option>
              <option value="médio">Médio</option>
              <option value="difícil">Difícil</option>
            </select>
          ) : <span className="field-value">{desafio.dificuldade}</span>}
        </div>

        <div className="detail-field-full">
          <label>Linguagens Suportadas (separadas por vírgula)</label>
          {isEditing ? <input type="text" name="linguagensSuportadasStr" value={formData.linguagensSuportadasStr} onChange={handleInputChange} /> : <span className="field-value">{desafio.linguagensSuportadas.join(', ')}</span>}
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
            <button className="btn btn-delete" onClick={handleDelete}>Deletar Desafio</button>
          </>
        )}
      </div>
    </div>
  );
}

export default DetalhesDesafio;