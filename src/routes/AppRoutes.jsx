import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../components/Home';
import FormularioLogin from '../components/FormularioLogin';
import FormRegister from '../components/FormRegister'; // Importamos el registro
import Header from '../components/Header';

function AppRoutes() {
  return (
    <Router>
      <Header /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<FormularioLogin />} />
        <Route path="/register" element={<FormRegister />} /> {/* Nueva ruta pública */}

        <Route path="/admin" element={() => <div style={{ padding: '20px' }}><h2>Panel Admin</h2></div>} />
        <Route path="/operario" element={() => <div style={{ padding: '20px' }}><h2>Panel Operario</h2></div>} />
        <Route path="/supervisor" element={() => <div style={{ padding: '20px' }}><h2>Panel Supervisor</h2></div>} />
        <Route path="/cliente" element={() => <div style={{ padding: '20px' }}><h2>Portal Cliente</h2></div>} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
