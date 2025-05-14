import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Usuario/Register';
import Login from './components/Usuario/Login';
import Home from './components/home/Home';
import Catalog from './components/catalog/catalog';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />

          {/* Puedes agregar más rutas según vayas creando más páginas */}
        </Routes>
      </div>
    </Router>
  );
};


export default App;