import React from 'react';
import './ResultadoPopup.css'; // você pode criar um CSS específico

function ResultadoPopup({ resultado, onClose }) {
  return (
    <div className="resultado-overlay">
      <div className="resultado-popup">
        <h2>Resultado da Execução</h2>

        <div className="resultado-status">
          <strong>Status:</strong> {resultado.status}
        </div>

        <div className="resultado-detalhes">
          <p><strong>Saída Obtida:</strong></p>
          <pre>{resultado.detalhes.saidaObtida}</pre>

          <p><strong>Saída Esperada:</strong></p>
          <pre>{resultado.detalhes.saidaEsperada}</pre>

          <p><strong>Tempo de Execução:</strong> {resultado.tempoExecucao}</p>
          <p><strong>Memória Usada:</strong> {resultado.memoria}</p>
        </div>

        <button className="btn-fechar-resultado" onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
}

export default ResultadoPopup;
