import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../components/Home';
import FormularioLogin from '../components/FormularioLogin';

const DashboardAdmin = () => <div style={{ padding: '20px' }}><h2>Panel de Administrador (CRM AgroFlow)</h2></div>;
const PanelOperario = () => <div style={{ padding: '20px' }}><h2>Panel de Operario (Registros de Campo)</h2></div>;
const PanelSupervisor = () => <div style={{ padding: '20px' }}><h2>Panel de Supervisor (Validaciones y Stock)</h2></div>;
const PortalCliente = () => <div style={{ padding: '20px' }}><h2>Portal del Cliente (Ofertas Ganaderas)</h2></div>;

function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Ahora el proyecto arranca en tu landing page del Home */}
        <Route path="/" element={<Home />} />
        
        {/* Ruta para el formulario de login */}
        <Route path="/login" element={<FormularioLogin />} />

        {/* Paneles privados redirigidos según el rol */}
        <Route path="/admin" element={<DashboardAdmin />} />
        <Route path="/operario" element={<PanelOperario />} />
        <Route path="/supervisor" element={<PanelSupervisor />} />
        <Route path="/cliente" element={<PortalCliente />} />

        {/* Redirección por seguridad si escriben cualquier otra ruta */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
