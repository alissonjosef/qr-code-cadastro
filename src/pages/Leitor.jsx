import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Scanner } from '@yudiel/react-qr-scanner';

const Leitor = () => {
  const [scanResult, setScanResult] = useState('');
  const navigate = useNavigate();

  const handleScan = (result) => {
    if (result && result.length > 0) {
        
        const rawValue = result[0].rawValue;
        setScanResult(rawValue);

        try {
            
            const cadastroLido = JSON.parse(rawValue);

            
            navigate('/detalhes', { state: { cadastro: cadastroLido } });
            
        } catch (error) {
            console.error("Erro ao processar JSON do QR Code:", error);
            alert("O código QR lido não está no formato de cadastro esperado.");
        }
    }
  };

  const handleError = () => {
   
    console.log("Erro ao inicializar o scanner. Verifique se a câmera está liberada e se a página está em HTTPS/localhost.");
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', textAlign: 'center' }}>
      <h1>2. Tela de Leitura de QR Code</h1>
      <p>Aponte a câmera para o QR Code gerado na tela anterior.</p>
      
      <div style={{ width: '100%', maxWidth: '400px', margin: '20px auto', border: '2px solid #007bff' }}>
        
        <Scanner
            onResult={handleScan}
            onError={handleError}
            
        />
      </div>
      
      {scanResult && (
        <p style={{ marginTop: '20px', wordBreak: 'break-all' }}>
            **Valor Lido (RAW):** {scanResult}
        </p>
      )}
    </div>
  );
};

export default Leitor;