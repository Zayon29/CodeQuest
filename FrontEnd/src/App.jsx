import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './Login'; 
import PerfilUsuario from './PerfilUsuario';

// ARQUIVO: src/App.jsx

// --- Imports Necessários ---
import React, { useState, useEffect } from 'react';

// --- Importe seus próprios componentes. ATENÇÃO AOS CAMINHOS! ---
// Verifique se os caminhos para seus arquivos estão corretos.
// Se seus componentes estiverem dentro de uma pasta 'components', por exemplo,
// o caminho seria './components/Login.jsx'.
import Login from './Login'; 
import PerfilUsuario from './PerfilUsuario';
// import TelaDesafios from './TelaDesafios'; // Descomente se você tiver este componente

// Importe seu arquivo CSS principal.
import './App.css';

// --- Início do Componente Principal ---
function App() {
  // --- Estados do Componente (a memória do componente) ---
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [mostrarPerfil, setMostrarPerfil] = useState(false);
  const [mostrarLogin, setMostrarLogin] = useState(false);

  // --- Efeito para Recuperar o Login ---
  // Roda UMA VEZ quando o App carrega para verificar se o usuário já estava logado.
  useEffect(() => {
    const usuarioSalvo = localStorage.getItem('usuario');
    const tokenSalvo = localStorage.getItem('token');
    
    if (usuarioSalvo && tokenSalvo) {
      console.log("Sessão anterior encontrada. Restaurando usuário.");
      setUsuarioLogado(JSON.parse(usuarioSalvo));
    }
  }, []); // O array vazio [] garante que isso rode só uma vez.

  // --- Funções de Manipulação de Estado (O "Cérebro") ---

  // 1. handleLogin: Recebe os dados do componente Login e SALVA tudo.
  const handleLogin = (usuario, token) => {
    console.log("App.jsx: Salvando dados de login...");
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    setUsuarioLogado(usuario);
    setMostrarLogin(false); // Esconde o formulário de login
  };

  // 2. handleLogout: LIMPA os dados para deslogar.
  const handleLogout = () => {
    console.log("App.jsx: Deslogando...");
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setUsuarioLogado(null);
    setMostrarPerfil(false); // Esconde o perfil ao deslogar
  };

  // --- Renderização do Componente (O que aparece na tela) ---
  return (
    <div className="App">
      <header className="app-header">
        <h1>CodeQuest</h1>
        <nav>
          {usuarioLogado ? (
            // Se o usuário ESTÁ logado, mostra isso:
            <>
              <span>Olá, {usuarioLogado.nome}</span>
              <button onClick={() => setMostrarPerfil(true)}>Meu Perfil</button>
              <button onClick={handleLogout}>Sair</button>
            </>
          ) : (
            // Se o usuário NÃO ESTÁ logado, mostra isso:
            <button onClick={() => setMostrarLogin(true)}>Entrar / Cadastrar</button>
          )}
        </nav>
      </header>

      <main>
        <h2>Bem-vindo à sua jornada de desafios!</h2>
        {/* Você pode renderizar sua lista de desafios ou outras páginas aqui */}
        {/* Exemplo: <TelaDesafios /> */}
      </main>

      {/* --- Lógica para mostrar os componentes de overlay (Login e Perfil) --- */}
      
      {/* Se for para mostrar o login E o usuário não estiver logado, renderiza o Login */}
      {mostrarLogin && !usuarioLogado && (
        <Login 
          onLogin={handleLogin}
          onCancel={() => setMostrarLogin(false)} 
        />
      )}

      {/* Se for para mostrar o perfil, renderiza o PerfilUsuario */}
      {mostrarPerfil && (
        <PerfilUsuario 
          onClose={() => setMostrarPerfil(false)}
        />
      )}
    </div>
  );
}

export default App;