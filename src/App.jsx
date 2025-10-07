import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Importa as Telas
import Cadastro from './pages/Cadastro';
import Leitor from './pages/Leitor';
import Edicao from './pages/Edicao';

const App = () => {
  // Simulação do Banco de Dados em Memória
  const [cadastroStore, setCadastroStore] = useState({});

  // FUNÇÃO DE CRIAR OU ATUALIZAR (CRUD - C e U)
  const saveOrUpdateCadastro = (data) => {
    // Se o objeto de dados JÁ tem um ID, é uma ATUALIZAÇÃO. Se não, é uma CRIAÇÃO.
    let id = data.id;
    if (!id) {
        id = `user-${Date.now()}`;
    }
    
    const newCadastro = { ...data, id };
    
    setCadastroStore(prevStore => ({
        ...prevStore,
        [id]: newCadastro // Sobrescreve se o ID existe, ou adiciona novo
    }));

    // Retorna o ID, que será usado para o QR Code ou para confirmação
    return id;
  };

  // FUNÇÃO DE BUSCAR (CRUD - R)
  const getCadastro = (id) => {
    return cadastroStore[id];
  };

  // FUNÇÃO DE DELETAR (CRUD - D)
  const deleteCadastro = (id) => {
    setCadastroStore(prevStore => {
      // Cria um novo objeto, excluindo a chave [id]
      const { [id]: _, ...rest } = prevStore;
      return rest;
    });
  };

  return (
    <Router>
      <nav style={{ padding: '10px 20px', backgroundColor: '#333', color: 'white' }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', gap: '20px' }}>
          <li>
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>1. Cadastro & Gerador</Link>
          </li>
          <li>
            <Link to="/leitor" style={{ color: 'white', textDecoration: 'none' }}>2. Leitor de QR Code</Link>
          </li>
        </ul>
      </nav>
      
      <Routes>
        {/* Rota 1: Cadastro - Passa a função para criar novos registros */}
        <Route path="/" element={<Cadastro saveCadastro={saveOrUpdateCadastro} />} />
        
        {/* Rota 2: Leitor - Passa a função para buscar o registro pelo ID */}
        <Route path="/leitor" element={<Leitor getCadastro={getCadastro} />} />
        
        {/* Rota 3: Edição - Recebe o ID da URL e as funções de CRUD */}
        <Route 
          path="/edicao/:id" 
          element={
            <Edicao 
              getCadastro={getCadastro} 
              saveCadastro={saveOrUpdateCadastro} 
              deleteCadastro={deleteCadastro} 
            />
          } 
        />
      </Routes>
    </Router>
  );
};

export default App;