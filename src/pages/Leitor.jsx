import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// A biblioteca de scanner que estamos usando
import { Scanner } from '@yudiel/react-qr-scanner'; 

// Recebe a função 'getCadastro' do App.jsx
const Leitor = ({ getCadastro }) => { 
  // O estado 'scanResultId' armazena o ID se a leitura for bem-sucedida.
  const [scanResultId, setScanResultId] = useState(null); 
  const navigate = useNavigate();

  const handleScan = (result) => {
    // Garante que só processamos uma leitura por vez
    if (result && result.length > 0 && !scanResultId) {
        
        const scannedId = result[0].rawValue;
        setScanResultId(scannedId); // Armazena o ID e desativa o scanner (pelo DOM)

        // 1. Busca o cadastro completo na store usando o ID lido
        const cadastroLido = getCadastro(scannedId);

        if (cadastroLido) {
            // 2. Se encontrado, NAVEGA IMEDIATAMENTE. O componente é desmontado
            navigate(`/edicao/${scannedId}`); 
        } else {
            // Se não encontrado, informa e limpa o ID para tentar de novo
            alert(`Cadastro com ID ${scannedId} não encontrado!`);
            setScanResultId(null); 
        }
    }
  };

  const handleError = () => {
    // Pode ignorar este erro, geralmente é permissão de câmera
    // console.log("Erro ao inicializar o scanner:", error);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', textAlign: 'center' }}>
      <h1>2. Tela de Leitura de QR Code</h1>
      
      {/* AJUSTE PRINCIPAL: O Scanner só é renderizado (montado) se scanResultId for null. 
        Assim que handleScan armazena o ID, o Scanner é DESMONTADO, liberando a câmera 
        e permitindo que a navegação ocorra sem travamentos.
      */}
      {!scanResultId ? (
        <>
          <p>Aponte a câmera para o QR Code gerado.</p>
          <div style={{ width: '100%', maxWidth: '400px', margin: '20px auto', border: '2px solid #007bff' }}>
            <Scanner
                onResult={handleScan}
                onError={handleError}
                // Adicionando um pequeno delay para estabilizar a leitura
                scanDelay={500} 
            />
          </div>
          <p style={{marginTop: '10px', color: '#888'}}>Aguardando leitura...</p>
        </>
      ) : (
        <p style={{ color: '#007bff', fontSize: '1.2em', marginTop: '50px' }}>
          ID lido: **{scanResultId}**. Redirecionando...
        </p>
      )}
      
      <button 
        onClick={() => setScanResultId(null)} 
        style={{ marginTop: '30px', padding: '10px', fontSize: '16px', cursor: 'pointer' }}
      >
        Reiniciar Scanner
      </button>
    </div>
  );
};

export default Leitor;