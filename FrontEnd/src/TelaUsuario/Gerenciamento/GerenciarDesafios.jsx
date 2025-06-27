import React, { useState } from 'react';
import DetalhesDesafio from './DetalhesDesafios'; // CORRIGIDO: sem o "s"
import ConfirmationPopup from '../../PopUP/ConfirmationPopup';
import './GerenciarDesafios.css';

const desafiosIniciais = [
  {
    id: 1,
    titulo: 'Exemplo de Desafio',
    descricao: 'Descreva o problema aqui.',
    entradaExemplo: 'Entrada exemplo',
    saidaExemplo: 'Saída esperada',
    dificuldade: 'fácil',
    linguagensSuportadas: ['JavaScript', 'Python'],
  },
];

function GerenciarDesafios() {
  const [desafios, setDesafios] = useState(desafiosIniciais);
  const [desafioSelecionado, setDesafioSelecionado] = useState(null);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [desafioParaDeletar, setDesafioParaDeletar] = useState(null);

  const handleSave = (desafioSalvo) => {
    if (desafioSalvo.id) {
      setDesafios(desafios.map(d => d.id === desafioSalvo.id ? desafioSalvo : d));
      setDesafioSelecionado(desafioSalvo);
    } else {
      const novoDesafioComId = { ...desafioSalvo, id: Date.now() };
      setDesafios([...desafios, novoDesafioComId]);
      setDesafioSelecionado(novoDesafioComId);
    }
  };

  const handleCreateNewChallenge = () => {
    const novoDesafio = {
      id: null,
      titulo: '',
      descricao: '',
      entradaExemplo: '',
      saidaExemplo: '',
      dificuldade: 'fácil',
      linguagensSuportadas: [],
    };
    setDesafioSelecionado(novoDesafio);
  };

  const handleDeleteRequest = (desafioId) => {
    setShowConfirmPopup(true);
    setDesafioParaDeletar(desafioId);
  };

  const handleConfirmDelete = () => {
    setDesafios(desafios.filter(d => d.id !== desafioParaDeletar));
    setDesafioSelecionado(null);
    setShowConfirmPopup(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmPopup(false);
    setDesafioParaDeletar(null);
  };

  if (desafioSelecionado) {
    return (
      <DetalhesDesafio
        desafio={desafioSelecionado}
        onBack={() => setDesafioSelecionado(null)}
        onSave={handleSave}
        onDelete={handleDeleteRequest}
      />
    );
  }

  return (
    <div className="gerenciar-view">
      <div className="view-header">
        <h2 className="gerenciar-title">Gerenciamento de Desafios</h2>
        <button className="btn-create" onClick={handleCreateNewChallenge}>
          + Criar Desafio
        </button>
      </div>

      <p className="gerenciar-subtitle">Clique em um desafio para ver os detalhes e editar.</p>
      
      <div className="list-box">
        <div className="challenge-list">
          {desafios.map((desafio) => (
            <div
              key={desafio.id}
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
          mensagem="Tem certeza que deseja excluir este desafio?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
}

export default GerenciarDesafios;
