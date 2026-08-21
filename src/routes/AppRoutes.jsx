import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

import { 
  Home as HomeIcon, 
  Boxes, 
  ShoppingCart, 
  ClipboardList, 
  Truck, 
  Settings, 
  LogOut, 
  Menu 
} from 'lucide-react';

const menuAdmin = [
  { texto: "Home", ruta: "/admin", icono: <HomeIcon size={20} /> },
  { texto: "Inventory", ruta: "/inventario", icono: <Boxes size={20} /> },
  { texto: "Orders", ruta: "/ordenes", icono: <ShoppingCart size={20} /> }
];

const menuOperario = [
  { texto: "Home", ruta: "/operario", icono: <HomeIcon size={20} /> },
  { texto: "Medical History", ruta: "/historial-medico", icono: <ClipboardList size={20} /> },
  { texto: "Distribution", ruta: "/distribucion", icono: <Truck size={20} /> }
];

const menuSupervisor = [
  { texto: "Home", ruta: "/supervisor", icono: <HomeIcon size={20} /> },
  { texto: "Inventory", ruta: "/inventario", icono: <Boxes size={20} /> }
];

const menuCliente = [
  { texto: "Home", ruta: "/cliente", icono: <HomeIcon size={20} /> },
  { texto: "Orders", ruta: "/ordenes", icono: <ShoppingCart size={20} /> }
];

const LayoutPublico = () => (
  <>
    <Header />
    <Outlet /> 
  </>
);

const LayoutPrivado = ({ opcionesMenu, children }) => (
  <div style={{ display: 'flex' }}>
    <Sidebar opcionesMenu={opcionesMenu} />
    <main style={{ flexGrow: 1, padding: '40px', backgroundColor: '#F4F6F8', minHeight: '100vh' }}>
      {children}
    </main>
  </div>
);

const RutaProtegida = ({ rolPermitido, opcionesMenu, children }) => {
  const usuarioGuardado = localStorage.getItem('usuario');
  
  if (!usuarioGuardado) {
    return <Navigate to="/login" replace />;
  }

  const usuario = JSON.parse(usuarioGuardado);

  if (usuario.rol !== rolPermitido) {
    return <Navigate to="/" replace />;
  }

  return <LayoutPrivado opcionesMenu={opcionesMenu}>{children}</LayoutPrivado>;
};

function AppRoutes() {
  return (
    <Router>
      <Routes>
        
        <Route element={<LayoutPublico />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route path="/admin" element={
          <RutaProtegida rolPermitido="Administrador" opcionesMenu={menuAdmin}>
            <h2>Panel de Administrador (CRM)</h2>
          </RutaProtegida>
        } />
        
        <Route path="/operario" element={
          <RutaProtegida rolPermitido="Operario" opcionesMenu={menuOperario}>
            <h2>Panel de Operario (Registros)</h2>
          </RutaProtegida>
        } />
        
        <Route path="/supervisor" element={
          <RutaProtegida rolPermitido="Supervisor" opcionesMenu={menuSupervisor}>
            <h2>Panel de Supervisor (Stock)</h2>
          </RutaProtegida>
        } />
        
        <Route path="/cliente" element={
          <RutaProtegida rolPermitido="Cliente" opcionesMenu={menuCliente}>
            <h2>Portal del Cliente (Ganado)</h2>
          </RutaProtegida>
        } />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
