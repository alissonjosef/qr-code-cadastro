import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Scanner } from '@yudiel/react-qr-scanner';

const Leitor = ({ getCadastro }) => { 
  const [isScanned, setIsScanned] = useState(false); // Flag de controle
  const navigate = useNavigate();

  const handleScan = (result) => {
    // Verifica se há resultado E se a leitura ainda não foi processada
    if (result && result.length > 0 && !isScanned) { 
        setIsScanned(true); // Bloqueia novas chamadas até o fim da função

        const scannedId = result[0].rawValue;

        // 1. Busca o cadastro completo na store usando o ID lido
        const cadastroLido = getCadastro(scannedId);

        if (cadastroLido) {
            // 2. Se encontrado, navega para a tela de Edição/Detalhes com o ID
            navigate(`/edicao/${scannedId}`); 
        } else {
            // Se não encontrado, informa e libera o scanner para nova tentativa
            alert(`Cadastro com ID ${scannedId} não encontrado!`);
            setIsScanned(false); 
        }
    }
  };

  const handleError = () => {
    // Você pode ignorar este erro, geralmente é permissão de câmera
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', textAlign: 'center' }}>
      <h1>2. Tela de Leitura de QR Code</h1>
      
      {isScanned ? (
        <p style={{ color: '#007bff', fontSize: '1.2em' }}>QR Code lido! Buscando dados...</p>
      ) : (
        <>
          <p>Aponte a câmera para o QR Code gerado.</p>
          <div style={{ width: '100%', maxWidth: '400px', margin: '20px auto', border: '2px solid #007bff' }}>
            <Scanner
                onResult={handleScan}
                onError={handleError}
            />
          </div>
        </>
      )}
      <button 
        onClick={() => setIsScanned(false)} 
        style={{ marginTop: '20px', padding: '10px', fontSize: '16px', cursor: 'pointer' }}
      >
        Reiniciar Scanner (Se Travar)
      </button>
    </div>
  );
};

export default Leitor;