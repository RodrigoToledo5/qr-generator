'use client';
import { useState } from 'react';

export default function Home() {
  const [text, setText] = useState('');
  const [qrCode, setQrCode] = useState('');

  const generateQRCode = async () => {
    if (!text) return;

    try {
      const response = await fetch(`/api/generate-qr?text=${encodeURIComponent(text)}`);
      const data = await response.json();

      if (data.qrCode) {
        setQrCode(data.qrCode);
        setText('')
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error('Failed to generate QR code:', error);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>QR Code Generator</h1>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text or URL"
        style={{ padding: '10px', width: '300px', marginBottom: '20px' }}
      />
      <br />
      <button onClick={generateQRCode} style={{ padding: '10px 20px', cursor: 'pointer' }}>
        Generate QR
      </button>
      <div style={{ marginTop: '20px' }}>
        {qrCode && <img src={qrCode} alt="QR Code" style={{ border: '1px solid #ddd', padding: '10px' }} />}
      </div>
    </div>
  );
}