import "./TelaInicial.css";
import Login from "../Login/Login";
import Cadastro from "../Login/Cadastro";
import React, { useState, useEffect } from "react";

function TelaInicial() {
  const [leftWidth, setLeftWidth] = useState(400);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(""); // linguagem escolhida
  const [code, setCode] = useState(""); // código do editor

  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [mostrarCadastro, setMostrarCadastro] = useState(false);

  const abrirCadastro = () => setMostrarCadastro(true);
  const fecharCadastro = () => setMostrarCadastro(false);

  // Funções de drag para ajustar largura da caixa esquerda
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

  // Menu seleção linguagem
  const handleOptionClick = (option) => {
    setSelectedLanguage(option);
    setMenuOpen(false);
  };

  // Enviar código
  const handleSubmit = async () => {
    if (!selectedLanguage || !code.trim()) {
      alert("Selecione uma linguagem e escreva algum código antes de realizar o envio.");
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

    const desafioId = "6824cc9366c4b2f992d3e2e2";

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

      if (!response.ok) throw new Error("Erro ao enviar");

      const result = await response.json();
      alert("Código enviado com sucesso!\nResposta do servidor: " + JSON.stringify(result));
    } catch (error) {
      alert("Erro ao enviar código: " + error.message);
    }
  };

  // Função para abrir a tela de login
  const abrirLogin = () => setMostrarLogin(true);

  // Função para fechar a tela de login (cancelar)
  const fecharLogin = () => setMostrarLogin(false);

  // Função chamada no login bem-sucedido
  const handleLogin = (usuario) => {
    setUsuarioLogado(usuario);
    setMostrarLogin(false);
  };

  return (
    <>
      {/* Header */}
      <header className="header">
        <h1 className="title">CodeQuest</h1>

        {!usuarioLogado && (
  <div>
    <button className="cadastro-button" onClick={abrirCadastro}>Cadastro</button>
    <button className="login-button" onClick={abrirLogin}>
      Login
    </button>
  </div>
)}
        {usuarioLogado && <div className="welcome-message">Olá, {usuarioLogado.email}</div>}
      </header>

      {/* Container principal */}
      <div className="center-container">
        {/* Caixa esquerda */}
        <div className="box left-box" style={{ width: leftWidth }}>
          <h2>Texto</h2>
          <p>Esse é um texto estático na caixa da esquerda.</p>
        </div>

        {/* Divisor de drag */}
        <div className="divider" onMouseDown={handleMouseDown}></div>

        {/* Caixa direita - editor */}
        <div className="editor-box right-box" style={{ width: `calc(100% - ${leftWidth + 10}px)` }}>
          <div className="editor-header">
            <h2 className="editor-title">Editor</h2>
            <div className="menu-container">
              <button className="menu-button" onClick={() => setMenuOpen((open) => !open)}>
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
            placeholder={`Digite seu código em ${selectedLanguage || "alguma linguagem"}...`}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
          />

          <button className="submit-button" onClick={handleSubmit}>
            Enviar Código
          </button>
        </div>
      </div>

      {/* Overlay do login */}
      {mostrarLogin && (
        <div className="login-overlay">
          <Login onLogin={handleLogin} onCancel={fecharLogin} />
        </div>
      )}

      {/* Overlay do cadastro */}
      {mostrarCadastro && (
  <div className="login-overlay">
    <Cadastro onLogin={handleLogin} onCancel={fecharCadastro} />
  </div>
)}


      {/* Footer */}
      <footer className="footer">
        <p>Desenvolvido por Vitor, Zayon e Thomas • CodeQuest © 2025</p>
      </footer>
    </>
  );
}

export default TelaInicial;
