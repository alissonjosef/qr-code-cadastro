import React from 'react';
import { QRCodeSVG } from 'qrcode.react';


const QRCodeDisplay = ({ qrValue, data }) => {
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', textAlign: 'center' }}>
      <h2>QR Code do Cadastro</h2>
      
      <div style={{ margin: '20px 0' }}>
        
        <QRCodeSVG 
          value={qrValue} 
          size={256} 
          level="L" 
          bgColor="#ffffff"
          fgColor="#000000"
        />
      </div>

      <h3>Dados do Cadastro (ID: {qrValue})</h3>
      <p>
        **Nome:** {data.nome} <br />
        **Email:** {data.email}
      </p>
      
      <p style={{ fontSize: '12px', color: '#666' }}>
        *Este código contém o ID único ({qrValue}) para busca.*
      </p>
    </div>
  );
};

export default QRCodeDisplay;