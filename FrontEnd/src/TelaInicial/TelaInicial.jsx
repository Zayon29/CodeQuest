import './TelaInicial.css'

import { useState } from "react";

function App() {
  const [leftWidth, setLeftWidth] = useState(400);
  const [isDragging, setIsDragging] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      // Calcula a largura do lado esquerdo baseada na posição do mouse
      const newWidth = e.clientX - 0; // assumindo margem esquerda 0
      if (newWidth > 200 && newWidth < window.innerWidth - 200) {
        setLeftWidth(newWidth);
      }
    }
  };

  const handleOptionClick = (option) => {
    alert(`Você escolheu: ${option}`);
    setMenuOpen(false);
  };

  // Escuta global para parar o drag
  window.onmouseup = handleMouseUp;
  window.onmousemove = handleMouseMove;

  return (
    <>
      <h1 className="title">CodeQuest</h1>

      <div className="center-container">
        <div className="box left-box" style={{ width: leftWidth }}>
          <h2>Texto</h2>
          <p>Esse é um texto estático na caixa da esquerda.</p>
        </div>

        <div className="divider" onMouseDown={handleMouseDown}></div>

        <div
          className="box editor-box right-box"
          style={{ width: `calc(100% - ${leftWidth + 10}px)` }}
        >
          <div className="editor-header">
            <button
              className="menu-button"
              onClick={() => setMenuOpen((open) => !open)}
            >
              codeQuest
            </button>
            {menuOpen && (
              <div className="dropdown-menu">
                <button onClick={() => handleOptionClick("Opção 1")}>
                  Opção 1
                </button>
                <button onClick={() => handleOptionClick("Opção 2")}>
                  Opção 2
                </button>
              </div>
            )}
          </div>

          <h2>Editor</h2>
          <textarea placeholder="Digite aqui..." />
        </div>
      </div>
    </>
  );
}

export default App;
