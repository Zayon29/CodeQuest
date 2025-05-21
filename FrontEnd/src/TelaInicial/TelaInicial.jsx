import './TelaInicial.css'

function App() {
  return (
    <div>
      <h1 className="title">CodeQuest</h1>

      <div className="center-container">
        <div className="box editor-box">
          <h2>Editor</h2>
          <textarea placeholder="Digite aqui..." />
        </div>

        <div className="box text-box">
          <h2>Texto de Exemplo</h2>
          <p>
            Este é um texto exibido no segundo quadro. Você pode colocar qualquer conteúdo aqui!
          </p>
        </div>
      </div>
    </div>
  )
}

export default App