import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Edicao = ({ getCadastro, saveCadastro, deleteCadastro }) => {
  const { id } = useParams(); // Pega o ID da rota /edicao/:id
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);

  // Efeito para carregar os dados na inicialização
  useEffect(() => {
    const data = getCadastro(id);
    if (data) {
      setFormData(data);
    } else {
      alert("Cadastro não encontrado!");
      navigate('/');
    }
  }, [id, getCadastro, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    // O ID já está em formData, então a função App.jsx sabe que deve ATUALIZAR
    saveCadastro(formData); 
    alert("Cadastro atualizado com sucesso!");
    navigate('/'); // Volta para a tela de cadastro
  };

  const handleDelete = () => {
    if (window.confirm("Tem certeza que deseja DELETAR este cadastro?")) {
      deleteCadastro(id);
      alert("Cadastro deletado com sucesso!");
      navigate('/'); // Volta para a tela de cadastro
    }
  };

  if (!formData) {
    return <p style={{ textAlign: 'center', marginTop: '50px' }}>Carregando dados...</p>;
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>3. Edição de Cadastro (ID: {id})</h1>
      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <label>Nome:</label>
        <input type="text" name="nome" value={formData.nome} onChange={handleChange} required style={{ padding: '10px', fontSize: '16px' }} />
        
        <label>E-mail:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ padding: '10px', fontSize: '16px' }} />
        
        <label>Telefone:</label>
        <input type="tel" name="telefone" value={formData.telefone} onChange={handleChange} required style={{ padding: '10px', fontSize: '16px' }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <button type="submit" style={{ padding: '10px 20px', fontSize: '18px', backgroundColor: '#28a745', color: 'white', border: 'none', cursor: 'pointer', flexGrow: 1, marginRight: '10px' }}>
            Salvar Alterações
          </button>
          <button type="button" onClick={handleDelete} style={{ padding: '10px 20px', fontSize: '18px', backgroundColor: '#dc3545', color: 'white', border: 'none', cursor: 'pointer' }}>
            Excluir Cadastro
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edicao;