import React, { useState } from "react";
import "./TelaUsuario.css";
function PerfilUsuario({ usuario, onClose }) {
  // Estado inicial com array vazio (será preenchido depois via backend)
  const [desafiosResolvidos, setDesafiosResolvidos] = useState([]);

  return (
    <div className="perfil-overlay">
      <div className="perfil-container">
        <h2>Meu Perfil</h2>
        
        <div className="perfil-info">
          <div className="info-item">
            <span className="info-label">Nome:</span>
            <span className="info-value">{usuario.nome}</span>
          </div>
          
          <div className="info-item">
            <span className="info-label">Email:</span>
            <span className="info-value">{usuario.email}</span>
          </div>
          
          <div className="info-item">
            <span className="info-label">Desafios Completos:</span>
            <span className="info-value">{desafiosResolvidos.length}</span>
          </div>
        </div>

        {/* Tabela de Desafios Resolvidos */}
        <div className="tabela-desafios">
          <h3>Desafios Resolvidos</h3>
          
          <table className="desafios-table">
            <thead>
              <tr>
                <th>Título</th>
                <th>Dificuldade</th>
                <th>Linguagem</th>
              </tr>
            </thead>
            <tbody>
              {desafiosResolvidos.length > 0 ? (
                desafiosResolvidos.map((desafio) => (
                  <tr key={desafio._id}>
                    <td>{desafio.titulo}</td>
                    <td className={`dificuldade-${desafio.dificuldade}`}>
                      {desafio.dificuldade}
                    </td>
                    <td>{desafio.linguagemUtilizada}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="sem-desafios">
                    Nenhum desafio resolvido ainda
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <button className="perfil-close-button" onClick={onClose}>
          Fechar
        </button>
      </div>
    </div>
  );
}

export default PerfilUsuario;