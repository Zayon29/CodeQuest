// src/components/Gerenciamento/GerenciarDesafios.jsx
import React, { useState, useEffect } from 'react';
import DetalhesDesafio from './DetalhesDesafios';
import ConfirmationPopup from '../../PopUP/ConfirmationPopup';
import CriarDesafios from './CriarDesafios';
import './GerenciarDesafios.css';

function GerenciarDesafios() {
  const [desafios, setDesafios] = useState([]);
  const [desafioSelecionado, setDesafioSelecionado] = useState(null);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [desafioParaDeletar, setDesafioParaDeletar] = useState(null);
  const [criandoDesafio, setCriandoDesafio] = useState(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch('http://localhost:5000/api/desafios')
      .then(res => res.json())
      .then(data => setDesafios(data))
      .catch(err => console.error('Erro ao carregar desafios:', err));
  }, []);

  const handleSave = async (desafioAtualizado) => {
    try {
      const response = await fetch(`http://localhost:5000/api/desafios/${desafioAtualizado._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(desafioAtualizado)
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setDesafios(desafios.map(d => d._id === data._id ? data : d));
      setDesafioSelecionado(data);
    } catch (error) {
      console.error('Erro ao atualizar desafio:', error);
      alert('Erro ao atualizar desafio');
    }
  };

  const handleDeleteRequest = (desafioId) => {
    setDesafioParaDeletar(desafioId);
    setShowConfirmPopup(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await fetch(`http://localhost:5000/api/desafios/${desafioParaDeletar}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setDesafios(desafios.filter(d => d._id !== desafioParaDeletar));
      setShowConfirmPopup(false);
      setDesafioSelecionado(null);
      setDesafioParaDeletar(null);
    } catch (error) {
      console.error('Erro ao deletar desafio:', error);
      alert('Erro ao deletar desafio');
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmPopup(false);
    setDesafioParaDeletar(null);
  };

  const handleCreateNewDesafio = async (novoDesafio) => {
    try {
      const response = await fetch('http://localhost:5000/api/desafios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(novoDesafio)
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setDesafios(prev => [...prev, data]);
      setCriandoDesafio(false);
      setDesafioSelecionado(data);
    } catch (error) {
      console.error('Erro ao criar desafio:', error);
      alert('Erro ao criar desafio');
    }
  };

  if (desafioSelecionado) {
    return (
      <>
        <DetalhesDesafio
          desafio={desafioSelecionado}
          onBack={() => setDesafioSelecionado(null)}
          onSave={handleSave}
          onDelete={handleDeleteRequest}
        />

        {showConfirmPopup && (
          <ConfirmationPopup
            mensagem="Tem certeza que deseja excluir este desafio? Os dados relacionados a ele podem ser perdidos."
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
          />
        )}
      </>
    );
  }

  if (criandoDesafio) {
    return (
      <CriarDesafios
        onCreate={handleCreateNewDesafio}
        onCancel={() => setCriandoDesafio(false)}
      />
    );
  }

  return (
    <div className="gerenciar-view">
      <div className="view-header">
        <h2 className="gerenciar-title">Gerenciamento de Desafios</h2>
        <button className="btn-create" onClick={() => setCriandoDesafio(true)}>+ Novo Desafio</button>
      </div>

      <p className="gerenciar-subtitle">Clique em um desafio para ver os detalhes e editar.</p>

      <div className="list-box">
        <div className="list-header">
          <span>Título do Desafio</span>
          <span>Dificuldade</span>
        </div>
        <div className="challenge-list">
          {desafios.map(desafio => (
            <div
              key={desafio._id}
              className="challenge-item"
              onClick={() => setDesafioSelecionado(desafio)}
            >
              <span className="challenge-title">{desafio.titulo}</span>
              <span className={`difficulty-badge difficulty-${desafio.dificuldade}`}>
                {desafio.dificuldade}
              </span>
            </div>
          ))}
        </div>
      </div>

      {showConfirmPopup && (
        <ConfirmationPopup
          mensagem="Tem certeza que deseja excluir este desafio? Os dados relacionados a ele podem ser perdidos."
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
}

export default GerenciarDesafios;
