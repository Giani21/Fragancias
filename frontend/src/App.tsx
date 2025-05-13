import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Usuario/Register';
import Login from './components/Usuario/Login';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {/* Puedes agregar más rutas según vayas creando más páginas */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;