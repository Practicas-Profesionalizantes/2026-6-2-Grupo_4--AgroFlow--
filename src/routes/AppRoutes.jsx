import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import FormularioLogin from '../pages/FormularioLogin';
import FormRegister from '../pages/Register';
import Header from '../pages/Header'; 

function AppRoutes() {
  return (
    <Router>
      <Header /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<FormularioLogin />} />
        <Route path="/register" element={<FormRegister />} />

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
