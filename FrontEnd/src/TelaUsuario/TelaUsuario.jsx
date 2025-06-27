import React, { useState } from 'react';
import './TelaUsuario.css';

const mapaLinguagens = {
  45: "Assembly",
  50: "C-9.2.0",
  54: "C++-9.2.0",
  91: "Java-JDK17.0.6",
  93: "JavaScript-22.08.0",
  71: "Python-3.8.1"
};

function PerfilUsuario({ onClose }) {
  const [usuario] = useState(() => {
    const dadosSalvos = localStorage.getItem('usuario');
    return dadosSalvos ? JSON.parse(dadosSalvos) : null;
  });

  const desafiosResolvidos = usuario?.desafiosResolvidos || [];

  if (!usuario) {
    return (
      <div className="perfil-overlay">
        <div className="perfil-container">
          <h2>Erro</h2>
          <p>Não foi possível carregar os dados do usuário. Tente fazer o login novamente.</p>
          <button className="perfil-close-button" onClick={onClose}>Fechar</button>
        </div>
      </div>
    );
  }

  return (
    <div className="perfil-overlay">
      <div className="perfil-container">
        <h2>Meu Perfil</h2>

        <div className="perfil-info">
          <div className="info-item">
            <span>Nome: </span>
            <span className="info-value">{usuario.nome}</span>
          </div>
          <div className="info-item">
            <span>Email: </span>
            <span className="info-value">{usuario.email}</span>
          </div>
          <div className="info-item">
            <span>Desafios Completos: </span>
            <span className="info-value">{desafiosResolvidos.length}</span>
          </div>
          <div className="info-item">
            <span>Pontuação do Usuário: </span>
            <span className="info-value">{usuario.pontos}</span>
          </div>
        </div>

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
                desafiosResolvidos.map((desafio, index) => (
                  <tr key={desafio.desafioId || index}>
                    <td>{desafio.titulo}</td>
                    <td className={`dificuldade-${desafio.dificuldade}`}>
                      {desafio.dificuldade}
                    </td>
                    <td>
                      {mapaLinguagens[desafio.linguagemUtilizada] ||
                        `ID ${desafio.linguagemUtilizada}`}
                    </td>
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
