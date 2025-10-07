import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


import Cadastro from './pages/Cadastro';
import Leitor from './pages/Leitor';
import Detalhes from './pages/Detalhes';

const App = () => {
  return (
    <Router>
      <nav style={{ padding: '10px 20px', backgroundColor: '#333', color: 'white' }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', gap: '20px' }}>
          <li>
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Cadastro & Gerador</Link>
          </li>
          <li>
            <Link to="/leitor" style={{ color: 'white', textDecoration: 'none' }}>Leitor de QR Code</Link>
          </li>
        </ul>
      </nav>
      
      <Routes>
        <Route path="/" element={<Cadastro />} />
        <Route path="/leitor" element={<Leitor />} />
        <Route path="/detalhes" element={<Detalhes />} />
      </Routes>
    </Router>
  );
};

export default App;