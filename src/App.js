import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Lab from './pages/Lab';
import Fungi from './pages/Fungi';
import Pack from './pages/Pacak';
import './App.css';

function App() {
  return (
    <div className="App">
      <header style={headerStyle}>
        <h1>CITTRO</h1>
        <nav style={navStyle}>
          <Link style={linkStyle} to="/">Inicio</Link>
          <Link style={linkStyle} to="/lab">LAB</Link>
          <Link style={linkStyle} to="/fungi">FUNGI</Link>
          <Link style={linkStyle} to="/pack">PACAK</Link>
        </nav>
      </header>
      <div style={{ padding: '2rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lab" element={<Lab />} />
          <Route path="/fungi" element={<Fungi />} />
          <Route path="/pack" element={<Pack />} />
        </Routes>
      </div>
    </div>
  );
}

const headerStyle = {
  backgroundColor: '#282c34',
  padding: '1rem',
  color: 'white',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
};

const navStyle = {
  display: 'flex',
  gap: '1rem'
};

const linkStyle = {
  color: 'white',
  textDecoration: 'none'
};

export default App;

