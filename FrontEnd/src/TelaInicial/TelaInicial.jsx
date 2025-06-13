import "./TelaInicial.css";
import Login from "../Login/Login";
import Cadastro from "../Login/Cadastro";
import PerfilUsuario from "../TelaUsuario/TelaUsuario";
import PerfilAdmin from "../TelaUsuario/TelaAdmin"
import ErrorPopup from '../PopUP/ErrorPopup';
import React, { useState, useEffect } from "react";

function TelaInicial() {
  const [leftWidth, setLeftWidth] = useState(400);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [code, setCode] = useState("");

  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [mostrarCadastro, setMostrarCadastro] = useState(false);

  const [mostrarPopupCadastro, setMostrarPopupCadastro] = useState(false);
  const [mensagemPopup, setMensagemPopup] = useState("");

  const [mostrarPerfil, setMostrarPerfil] = useState(false);

  const [mostrarPerfilAdmin, setMostrarPerfilAdmin] = useState(false)

  const [desafioAtual, setDesafioAtual] = useState(null);

  const [mostrarErro, setMostrarErro] = useState(false);
  const [mensagemErro, setMensagemErro] = useState('');

  const abrirCadastro = () => setMostrarCadastro(true);
  const fecharCadastro = () => setMostrarCadastro(false);
  const abrirLogin = () => setMostrarLogin(true);
  const fecharLogin = () => setMostrarLogin(false);
  const abrirPerfilAdmin = () => setMostrarPerfilAdmin(true);
  const fecharPerfilAdmin = () => setMostrarPerfilAdmin(false);

  const mostrarError = (mensagem) => {
  setMensagemErro(mensagem);
  setMostrarErro(true);
  
  // Fecha após 2 segundos
  setTimeout(() => {
    setMostrarErro(false);
  }, 5000);
};

  const handleLogin = (usuario) => {
    setUsuarioLogado(usuario);
    setMostrarLogin(false);
  };

  const handleLogout = () => {
    setUsuarioLogado(null);
    // Você pode adicionar aqui qualquer limpeza adicional necessária
    // como remover tokens de autenticação do localStorage, etc.
  };

  const handleCadastro = async (usuario) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: usuario.nome,
          email: usuario.email,
          senha: usuario.senha,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Erro ao cadastrar");
      }

      setMensagemPopup(
        `Cadastro realizado com sucesso! Bem-vindo, ${usuario.nome}!`
      );
      setMostrarPopupCadastro(true);

      setUsuarioLogado({
        email: usuario.email,
        nome: usuario.nome,
      });

      // Fecha o formulário de cadastro após 2 segundos
      setTimeout(() => {
        setMostrarCadastro(false);
      }, 2000);
    } catch (error) {
      mostrarError("Erro ao cadastrar: " + error.message);
    }

    setMostrarCadastro(false);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragOffset(e.clientX - leftWidth);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        const newWidth = e.clientX - dragOffset;
        const minWidth = 200;
        const maxWidth = window.innerWidth - 200;

        if (newWidth >= minWidth && newWidth <= maxWidth) {
          setLeftWidth(newWidth);
        }
      }
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  const handleOptionClick = (option) => {
    setSelectedLanguage(option);
    setMenuOpen(false);
  };

  useEffect(() => {
    const buscarDesafio = async () => {
      try {
        const resposta = await fetch(
          "http://localhost:5000/api/desafios/atual"
        );
        if (!resposta.ok) {
          throw new Error("Erro ao buscar o desafio");
        }
        const dados = await resposta.json();
        setDesafioAtual(dados);
      } catch (erro) {
        mostrarError("Erro ao carregar desafio:", erro.message);
      }
    };

    buscarDesafio();
  }, []);

  const handleSubmit = async () => {
    if (!selectedLanguage || !code.trim()) {
      mostrarError(
        "Selecione uma linguagem e escreva algum código antes de realizar o envio."
      );
      return;
    }

    let selectedLanguageId;
    switch (selectedLanguage) {
      case "Assembly":
        selectedLanguageId = 45;
        break;
      case "C-9.2.0":
        selectedLanguageId = 50;
        break;
      case "C++-9.2.0":
        selectedLanguageId = 54;
        break;
      case "Java-JDK17.0.6":
        selectedLanguageId = 91;
        break;
      case "JavaScript-22.08.0":
        selectedLanguageId = 93;
        break;
      case "Python-3.8.1":
        selectedLanguageId = 71;
        break;
      default:
        selectedLanguageId = null;
    }

    const desafioId = desafioAtual._id

    try {

      const response = await fetch("http://localhost:5000/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          source_code: code,
          language_id: selectedLanguageId,
          desafioId: desafioId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao enviar código");
      }

      const result = await response.json();
      alert(
        "Código enviado com sucesso!\nResposta do servidor: " +
          JSON.stringify(result)
      );
    } catch (error) {
      mostrarError("Erro ao enviar código: " + error.message);
    }
  };

  return (
    <>
      <header className="header">
        <h1 className="title">CodeQuest</h1>

        {!usuarioLogado && (
          <div>
            <button className="cadastro-button" onClick={abrirCadastro}>
              Cadastro
            </button>
            <button className="login-button" onClick={abrirLogin}>
              Login
            </button>
          </div>
        )}
        {usuarioLogado && (
          <div className="user-container">
            <div className="welcome-message">
              Olá, {usuarioLogado.nome || usuarioLogado.email}
            </div>
            <button
              className="perfil-button"
              onClick={() => setMostrarPerfil(true)}
            >
              Meu Perfil
            </button>
            {usuarioLogado.isAdmin && (
              <button
              className="admin-button"
              onClick={() => setMostrarPerfilAdmin(true)}
            >
              PerfilAdmin
            </button>
            )}
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </header>

      <div className="center-container">
        <div className="box left-box" style={{ width: leftWidth }}>
          <h2>{desafioAtual ? desafioAtual.titulo : "Carregando desafio..."}</h2>
          <p>{desafioAtual ? desafioAtual.descricao : "Aguarde enquanto o desafio é carregado."}</p>
          <h4>Dificuldade do desafio: {desafioAtual ? desafioAtual.dificuldade : "Carregando dificuldade do desafio"}</h4>
        </div>

        <div className="divider" onMouseDown={handleMouseDown}></div>

        <div
          className="editor-box right-box"
          style={{ width: `calc(100% - ${leftWidth + 10}px)` }}
        >
          <div className="editor-header">
            <h2 className="editor-title">Editor</h2>
            <div className="menu-container">
              <button
                className="menu-button"
                onClick={() => setMenuOpen((open) => !open)}
              >
                {selectedLanguage || "Linguagens"}
              </button>
              {menuOpen && (
                <div className="dropdown-menu">
                  {[
                    "Assembly",
                    "C-9.2.0",
                    "C++-9.2.0",
                    "Java-JDK17.0.6",
                    "JavaScript-22.08.0",
                    "Python-3.8.1",
                  ].map((lang) => (
                    <button key={lang} onClick={() => handleOptionClick(lang)}>
                      {lang}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <textarea
            className="code-editor"
            placeholder={`Digite seu código em ${
              selectedLanguage || "alguma linguagem"
            }...`}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
          />

          <button className="submit-button" onClick={handleSubmit}>
            Enviar Código
          </button>
        </div>
      </div>

      {mostrarLogin && (
        <div className="login-overlay">
          <Login onLogin={handleLogin} onCancel={fecharLogin} />
        </div>
      )}

      {mostrarCadastro && (
        <div className="login-overlay">
          <Cadastro onRegister={handleCadastro} onCancel={fecharCadastro} />
        </div>
      )}

      {mostrarPopupCadastro && (
        <div className="cadastro-popup">
          <p>{mensagemPopup}</p>
          <button onClick={() => setMostrarPopupCadastro(false)}>OK</button>
        </div>
      )}

      {mostrarPerfil && (
        <PerfilUsuario
          usuario={usuarioLogado}
          onClose={() => setMostrarPerfil(false)}
        />
      )}

      {mostrarPerfilAdmin && (
        <PerfilAdmin
          onClose={() => setMostrarPerfilAdmin(false)}
        />
      )}

   {mostrarErro && (
  <ErrorPopup 
    mensagem={mensagemErro}  // ← Mantenha 'mensagem' aqui
    onClose={() => setMostrarErro(false)} 
  />
)}

      <footer className="footer">
        <p>Desenvolvido por Vitor, Zayon e Thomas • CodeQuest © 2025</p>
      </footer>
    </>
  );
}

export default TelaInicial;
