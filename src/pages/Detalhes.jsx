import React from 'react';
import { useLocation } from 'react-router-dom';

const Detalhes = () => {
  const location = useLocation();
  const cadastro = location.state?.cadastro;

  if (!cadastro) {
    // ... (mensagem de erro, inalterada)
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>3. Detalhes do Cadastro (Lido e Buscado)</h1>
      <div style={{ border: '1px solid #007bff', padding: '20px', borderRadius: '8px' }}>
        <p><strong>ID do Registro:</strong> {cadastro.id}</p>
        <p><strong>Nome:</strong> {cadastro.nome}</p>
        <p><strong>E-mail:</strong> {cadastro.email}</p>
        <p><strong>Telefone:</strong> {cadastro.telefone}</p>
      </div>
      <button 
        onClick={() => window.history.back()} 
        style={{ marginTop: '20px', padding: '10px', fontSize: '16px', cursor: 'pointer' }}
      >
        Voltar para o Leitor
      </button>
    </div>
  );
};

export default Detalhes;