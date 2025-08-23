import React, { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import './App.css';

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
    <div className="app-root">
      <div className="container">
        <div className="card">
          <div className="brand">
            <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Logo" />
          </div>
          <h1>Gere seu QRcode:</h1>

          <div className="input-row">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Digite ou copie seu link..."
            />
            <button className="primary" onClick={handleGenerate}>Gerar QR Code</button>
          </div>

          {qrText && (
            <>
              <div ref={qrRef} className="qr-preview">
                <QRCodeCanvas value={qrText} size={256} />
              </div>
              <div>
                <button className="download-btn" onClick={handleDownload}>&#x2B07; Baixar QR Code</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
