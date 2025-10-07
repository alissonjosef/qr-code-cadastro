import React, { useState } from 'react';
import QRCodeDisplay from '../components/QRCodeDisplay';

const Cadastro = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: ''
  });
  const [cadastroFinalizado, setCadastroFinalizado] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const novoCadastro = { ...formData, id: Date.now() }; 
    
    
    setCadastroFinalizado(novoCadastro);

    
    
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>1. Tela de Cadastro e Geração de QR Code</h1>
      
      {!cadastroFinalizado ? (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input
            type="text"
            name="nome"
            placeholder="Nome Completo"
            value={formData.nome}
            onChange={handleChange}
            required
            style={{ padding: '10px', fontSize: '16px' }}
          />
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ padding: '10px', fontSize: '16px' }}
          />
          <input
            type="tel"
            name="telefone"
            placeholder="Telefone"
            value={formData.telefone}
            onChange={handleChange}
            required
            style={{ padding: '10px', fontSize: '16px' }}
          />
          <button type="submit" style={{ padding: '10px', fontSize: '18px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>
            Finalizar Cadastro e Gerar QR Code
          </button>
        </form>
      ) : (
        <>
          <h3 style={{ color: 'green' }}>Cadastro Concluído!</h3>
          <QRCodeDisplay data={cadastroFinalizado} />
        </>
      )}
    </div>
  );
};

export default Cadastro;