// ARQUIVO: PerfilUsuario.jsx
// VERSÃO FINAL E SIMPLIFICADA

import React, { useState } from 'react'; // Agora só precisamos do useState
import './TelaUsuario.css'; // Confirme se o caminho para o seu CSS está correto

// A única prop que este componente precisa é a função para fechar o modal.
// Ele não precisa mais receber o objeto 'usuario' como prop.
function PerfilUsuario({ onClose }) {
  
  // 1. O ESTADO É INICIALIZADO LENDO DIRETAMENTE DO LOCALSTORAGE
  // Não precisamos mais de 'erro' ou 'setDesafiosResolvidos' como estados separados.
  const [usuario] = useState(() => {
    const dadosSalvos = localStorage.getItem('usuario');
    // JSON.parse transforma a string de volta em um objeto JavaScript
    return dadosSalvos ? JSON.parse(dadosSalvos) : null;
  });

  // 2. A LISTA DE DESAFIOS VEM DIRETO DO OBJETO 'USUARIO'
  // O '|| []' garante que, se não houver desafios, será uma lista vazia, evitando erros.
  const desafiosResolvidos = usuario?.desafiosResolvidos || [];

  // 3. O 'useEffect' E O 'fetch' FORAM COMPLETAMENTE REMOVIDOS!
  // Não há mais chamada de rede aqui.

  // Se, por algum motivo, não houver dados no localStorage, mostramos uma mensagem de segurança.
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

  // 4. O RESTO DO COMPONENTE APENAS RENDERIZA OS DADOS DO ESTADO 'usuario'
  return (
    <div className="perfil-overlay">
      <div className="perfil-container">
        <h2>Meu Perfil</h2>

        {/* O JSX para mostrar as informações do usuário continua igual */}
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

        {/* O JSX para a tabela de desafios continua igual, usando a nossa variável 'desafiosResolvidos' */}
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
                  <tr key={desafio.desafioId || index}> {/* Usar um ID único é melhor */}
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