import './TelaInicial.css'

import { useState, useRef } from 'react'

function App() {
  const [leftWidth, setLeftWidth] = useState(320) // largura inicial do box esquerdo
  const containerRef = useRef(null)
  const isDragging = useRef(false)

  function onMouseDown() {
    isDragging.current = true
  }

  function onMouseUp() {
    isDragging.current = false
  }

  function onMouseMove(e) {
    if (!isDragging.current) return

    const container = containerRef.current
    if (!container) return

    // Calcula posição relativa do mouse dentro do container
    const rect = container.getBoundingClientRect()
    let newWidth = e.clientX - rect.left

    // Define limites mínimos e máximos para largura
    const minWidth = 100
    const maxWidth = rect.width - 100

    if (newWidth < minWidth) newWidth = minWidth
    if (newWidth > maxWidth) newWidth = maxWidth

    setLeftWidth(newWidth)
  }

  return (
    <div>
      <h1 className="title">CodeQuest</h1>

      <div
        className="center-container"
        ref={containerRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseUp}
        onMouseUp={onMouseUp}
      >
        <div
          className="box text-box left-box"
          style={{ width: leftWidth }}
        >
          <h2>Texto de Exemplo</h2>
          <p>
            Este é um texto exibido no segundo quadro. Você pode colocar qualquer conteúdo aqui!
          </p>
        </div>

        {/* Divisor arrastável */}
        <div
          className="divider"
          onMouseDown={onMouseDown}
        />

        <div
          className="box editor-box right-box"
          style={{ width: `calc(100% - ${leftWidth + 10}px)` }} // 10px do divisor
        >
          <h2>Editor</h2>
          <textarea placeholder="Digite aqui..." />
        </div>
      </div>
    </div>
  )
}

export default App