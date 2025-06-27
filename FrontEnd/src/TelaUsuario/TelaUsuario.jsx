import React, { useEffect, useState } from "react";
import "./TelaUsuario.css";

function PerfilUsuario({ usuario, onClose }) {
  const [desafiosResolvidos, setDesafiosResolvidos] = useState([]);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const fetchDesafios = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log(token)
        const response = await fetch(`http://localhost:5000/api/user/perfil`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Erro ao buscar perfil");
        }

        const data = await response.json();

        setDesafiosResolvidos(data.desafiosResolvidos || []);
      } catch (error) {
        setErro(error.message);
        console.error("Erro ao carregar perfil:", error);
      }
    };

    fetchDesafios();
  }, []);

  return (
    <div className="perfil-overlay">
      <div className="perfil-container">
        <h2>Meu Perfil</h2>

        {erro && <p className="erro">Erro: {erro}</p>}

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
                  <tr key={index}>
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