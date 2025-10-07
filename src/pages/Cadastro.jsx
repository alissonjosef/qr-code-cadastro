import React, { useState } from 'react';
import QRCodeDisplay from '../components/QRCodeDisplay';

// Recebe a função 'saveCadastro' do App.jsx
const Cadastro = ({ saveCadastro }) => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: ''
  });
  const [cadastroId, setCadastroId] = useState(null);
  const [cadastroData, setCadastroData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 1. Salva os dados completos na store e recebe o ID único.
    // Passamos os dados completos, e a função em App.jsx cria o ID.
    const savedId = saveCadastro(formData); 
    
    // 2. Armazena o ID e os dados para exibição do QR Code
    setCadastroId(savedId);
    setCadastroData(formData);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>1. Tela de Cadastro e Geração de QR Code</h1>
      
      {!cadastroId ? (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input type="text" name="nome" placeholder="Nome Completo" value={formData.nome} onChange={handleChange} required style={{ padding: '10px', fontSize: '16px' }} />
          <input type="email" name="email" placeholder="E-mail" value={formData.email} onChange={handleChange} required style={{ padding: '10px', fontSize: '16px' }} />
          <input type="tel" name="telefone" placeholder="Telefone" value={formData.telefone} onChange={handleChange} required style={{ padding: '10px', fontSize: '16px' }} />
          <button type="submit" style={{ padding: '10px', fontSize: '18px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>
            Finalizar Cadastro e Gerar QR Code
          </button>
        </form>
      ) : (
        <>
          <h3 style={{ color: 'green' }}>Cadastro Concluído! Utilize o QR Code no leitor.</h3>
          <QRCodeDisplay qrValue={cadastroId} data={cadastroData} />
          <button 
             onClick={() => setCadastroId(null)}
             style={{ marginTop: '20px', padding: '10px', fontSize: '16px', cursor: 'pointer' }}
          >
            Novo Cadastro
          </button>
        </>
      )}
    </div>
  );
};

export default Cadastro;