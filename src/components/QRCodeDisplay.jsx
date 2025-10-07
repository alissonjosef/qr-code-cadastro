import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

// Aceita o ID único (qrValue) e os dados para exibição (data)
const QRCodeDisplay = ({ qrValue, data }) => {
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', textAlign: 'center' }}>
      <h2>QR Code do Cadastro</h2>
      
      <div style={{ margin: '20px 0' }}>
        {/* Codifica APENAS o ID único que será buscado no "banco" */}
        <QRCodeSVG 
          value={qrValue} 
          size={256} 
          level="L" 
          bgColor="#ffffff"
          fgColor="#000000"
        />
      </div>

      <h3>Dados de Conferência (ID: {qrValue})</h3>
      <p>
        **Nome:** {data.nome} <br />
        **Email:** {data.email}
      </p>
    </div>
  );
};

export default QRCodeDisplay;