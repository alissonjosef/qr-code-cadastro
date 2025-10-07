import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Scanner } from '@yudiel/react-qr-scanner';

// Recebe a função 'getCadastro' do App.jsx
const Leitor = ({ getCadastro }) => { 
  const [scanResult, setScanResult] = useState('');
  const navigate = useNavigate();

  const handleScan = (result) => {
    if (result && result.length > 0) {
        // O valor lido agora é o ID do cadastro (ex: "user-1719946800000")
        const scannedId = result[0].rawValue;
        setScanResult(scannedId);

        // 1. Busca o cadastro completo na store usando o ID lido
        const cadastroLido = getCadastro(scannedId);

        if (cadastroLido) {
            // 2. Se encontrado, navega para Detalhes, passando o objeto completo no 'state'
            navigate('/detalhes', { state: { cadastro: cadastroLido } });
        } else {
             // Se não encontrado na memória
            alert(`Cadastro com ID ${scannedId} não encontrado!`);
        }
    }
  };

  const handleError = () => {
    console.log("Erro ao inicializar o scanner. Verifique se a câmera está liberada e se a página está em HTTPS/localhost.");
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', textAlign: 'center' }}>
      <h1>2. Tela de Leitura de QR Code</h1>
      <p>Aponte a câmera para o QR Code gerado.</p>
      
      <div style={{ width: '100%', maxWidth: '400px', margin: '20px auto', border: '2px solid #007bff' }}>
        <Scanner
            onResult={handleScan}
            onError={handleError}
            // scanDelay={500}
        />
      </div>
      
      {scanResult && (
        <p style={{ marginTop: '20px', wordBreak: 'break-all' }}>
            **ID Escaneado:** {scanResult}
        </p>
      )}
    </div>
  );
};

export default Leitor;