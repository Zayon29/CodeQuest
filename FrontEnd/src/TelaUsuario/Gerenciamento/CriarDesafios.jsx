// src/components/Gerenciamento/CriarDesafios.jsx
import React, { useState } from 'react';
import './CriarDesafios.css';

function CriarDesafios({ onCreate, onCancel }) {
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    entradaExemplo: '',
    saidaExemplo: '',
    dificuldade: 'fácil',
    linguagensSuportadasStr: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Converte string de linguagens para array
    const linguagensArray = formData.linguagensSuportadasStr
      .split(',')
      .map(lang => lang.trim())
      .filter(Boolean);

    if (!formData.titulo.trim()) {
      alert('O título é obrigatório!');
      return;
    }

    onCreate({
      id: Date.now(), // ID simples baseado em timestamp
      titulo: formData.titulo,
      descricao: formData.descricao,
      entradaExemplo: formData.entradaExemplo,
      saidaExemplo: formData.saidaExemplo,
      dificuldade: formData.dificuldade,
      linguagensSuportadas: linguagensArray,
    });
  };

  return (
    <div className="criar-desafio-container">
      <h2 className="criar-title">Criar Novo Desafio</h2>
      <form className="criar-form" onSubmit={handleSubmit}>

        <label>Título *</label>
        <input
          type="text"
          name="titulo"
          value={formData.titulo}
          onChange={handleInputChange}
          required
        />

        <label>Descrição</label>
        <textarea
          name="descricao"
          rows="4"
          value={formData.descricao}
          onChange={handleInputChange}
        />

        <label>Exemplo de Entrada</label>
        <textarea
          name="entradaExemplo"
          rows="2"
          value={formData.entradaExemplo}
          onChange={handleInputChange}
        />

        <label>Exemplo de Saída</label>
        <textarea
          name="saidaExemplo"
          rows="2"
          value={formData.saidaExemplo}
          onChange={handleInputChange}
        />

        <label>Dificuldade</label>
        <select
          name="dificuldade"
          value={formData.dificuldade}
          onChange={handleInputChange}
        >
          <option value="fácil">Fácil</option>
          <option value="médio">Médio</option>
          <option value="difícil">Difícil</option>
        </select>

        <label>Linguagens Suportadas (separadas por vírgula)</label>
        <input
          type="text"
          name="linguagensSuportadasStr"
          value={formData.linguagensSuportadasStr}
          onChange={handleInputChange}
        />

        <div className="btn-group">
          <button type="submit" className="btn btn-create-save">Criar</button>
          <button type="button" className="btn btn-create-cancel" onClick={onCancel}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}

export default CriarDesafios;
