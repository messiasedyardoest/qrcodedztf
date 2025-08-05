import React, { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';


function App() {
  const [text, setText] = useState('');
  const [qrText, setQrText] = useState('');
  const qrRef = useRef(null);

  const handleGenerate = () => {
    setQrText(text);
  };

  const handleDownload = () => {
    const canvas = qrRef.current.querySelector('canvas');
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = 'qrcode.png';
    a.click();
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
      fontFamily: 'Arial, sans-serif',
      boxShadow: '5px',
      padding: '20px',
      textAlign: 'center'
       }}>
       <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Logo" style={{ width: '150px', marginBottom: '20px' }} />
      <h1 style={{color: '#333', marginBottom: '20px'}}>Gere seu QRcode: </h1>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Digite ou copie seu link..."
        style={{
             padding: '10px',
             width: '300px',
             border: '2px solid red',     
             borderRadius: '5px',          
             outline: 'none'
            }}
      />
      <br /><br />
      <button onClick={handleGenerate} style={{ padding: '10px 20px',
          marginBottom: '20px',
          borderRadius: '8px',
          border: 'none',
          backgroundColor: '#DC143C',
          color: '#fff',
          fontSize: '16px',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease'}}>
        Gerar QR Code
      </button>
      {qrText && (
        <>
          <div ref={qrRef}
           style={{ 
              marginTop: '20px',
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
            <QRCodeCanvas value={qrText} size={256} />
          </div>
          <br />
          <button onClick={handleDownload} 
          style={{ 
            padding: '10px 20px',
             border: '2px solid red',     
             borderRadius: '5px',          
             outline: 'none',
            }}>
            &#x2B07; Baixar QR Code
          </button>
        </>
      )}
    </div>
  );
}

export default App;
