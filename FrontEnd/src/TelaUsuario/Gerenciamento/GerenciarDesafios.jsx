import React, { useState } from 'react';
import DetalhesDesafio from './DetalhesDesafios'; // Corrigido: sem 's' no final
import ConfirmationPopup from '../../PopUP/ConfirmationPopup'; // 1. Importe o pop-up
import './GerenciarDesafios.css';

const desafiosIniciais = [
  { id: 1, titulo: 'Soma Simples', descricao: '...', entradaExemplo: '1 2', saidaExemplo: '3', dificuldade: 'fácil', linguagensSuportadas: ['JavaScript', 'Python'] },
  { id: 2, titulo: 'Validador de Palíndromo', descricao: '...', entradaExemplo: 'arara', saidaExemplo: 'true', dificuldade: 'médio', linguagensSuportadas: ['JavaScript', 'Python', 'Java'] },
  { id: 3, titulo: 'Busca Binária em Array', descricao: '...', entradaExemplo: '[1, 3, 5, 7], 5', saidaExemplo: '2', dificuldade: 'difícil', linguagensSuportadas: ['JavaScript', 'Python', 'Java', 'C++'] },
];

function GerenciarDesafios() {
  const [desafios, setDesafios] = useState(desafiosIniciais);
  const [desafioSelecionado, setDesafioSelecionado] = useState(null);

  // 2. Adicione os estados para controlar o pop-up
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [desafioParaDeletar, setDesafioParaDeletar] = useState(null);

  const handleSave = (desafioAtualizado) => {
    setDesafios(desafios.map(d => d.id === desafioAtualizado.id ? desafioAtualizado : d));
    setDesafioSelecionado(desafioAtualizado);
  };

  // 3. Crie o novo conjunto de funções para a exclusão
  const handleDeleteRequest = (desafioId) => {
    setDesafioParaDeletar(desafioId);
    setShowConfirmPopup(true);
  };

  const handleConfirmDelete = () => {
    setDesafios(desafios.filter(d => d.id !== desafioParaDeletar));
    setShowConfirmPopup(false);
    setDesafioSelecionado(null);
    setDesafioParaDeletar(null);
  };

  const handleCancelDelete = () => {
    setShowConfirmPopup(false);
    setDesafioParaDeletar(null);
  };

  // Se um desafio foi selecionado, mostra a tela de detalhes
  if (desafioSelecionado) {
    return (
      <DetalhesDesafio
        desafio={desafioSelecionado}
        onBack={() => setDesafioSelecionado(null)}
        onSave={handleSave}
        onDelete={handleDeleteRequest} // 4. Passe a função correta para o onDelete
      />
    );
  }

  // Senão, mostra a lista de desafios
  return (
    <div className="gerenciar-view">
      <h2 className="gerenciar-title">Gerenciamento de Desafios</h2>
      <p className="gerenciar-subtitle">Clique em um desafio para ver os detalhes e editar.</p>
      
      <div className="list-box">
        <div className="list-header">
          <span>Título do Desafio</span>
          <span>Dificuldade</span>
        </div>
        <div className="challenge-list">
          {desafios.map(desafio => (
            <div key={desafio.id} className="challenge-item" onClick={() => setDesafioSelecionado(desafio)}>
              <span className="challenge-title">{desafio.titulo}</span>
              <span className={`difficulty-badge difficulty-${desafio.dificuldade}`}>
                {desafio.dificuldade}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Renderize o pop-up quando necessário */}
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