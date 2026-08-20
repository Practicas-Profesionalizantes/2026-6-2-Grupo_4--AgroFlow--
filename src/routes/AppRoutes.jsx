import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

// 1. Contenedor para las páginas públicas que SÍ llevan el Header arriba
const LayoutPublico = () => (
  <>
    <Header />
    <Outlet /> {/* Aquí se renderizan el Home, Login o Register debajo del Header */}
  </>
);

// 2. Contenedor para los paneles privados que NO llevan Header y usan el Sidebar
const LayoutPrivado = ({ children }) => (
  <div style={{ display: 'flex' }}>
    <Sidebar />
    <main style={{ flexGrow: 1, padding: '40px', backgroundColor: '#F4F6F8', minHeight: '100vh' }}>
      {children}
    </main>
  </div>
);

function AppRoutes() {
  return (
    <Router>
      <Routes>
        
        {/* GRUPO PÚBLICO: Lleva el Header de forma automática */}
        <Route element={<LayoutPublico />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* GRUPO PRIVADO: Sin Header, con Sidebar interactivo a la izquierda */}
        <Route path="/admin" element={<LayoutPrivado><h2>Panel de Administrador (CRM)</h2></LayoutPrivado>} />
        <Route path="/operario" element={<LayoutPrivado><h2>Panel de Operario (Registros)</h2></LayoutPrivado>} />
        <Route path="/supervisor" element={<LayoutPrivado><h2>Panel de Supervisor (Stock)</h2></LayoutPrivado>} />
        <Route path="/cliente" element={<LayoutPrivado><h2>Portal del Cliente (Ganado)</h2></LayoutPrivado>} />

        {/* Redirección por seguridad */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
