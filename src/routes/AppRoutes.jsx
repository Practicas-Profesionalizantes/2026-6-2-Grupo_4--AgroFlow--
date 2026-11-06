import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Home from '../pages/principal/Home';
import Login from '../pages/principal/Login';
import Register from '../pages/principal/Register';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import PanelOperario from '../pages/operari/PanelOperario';
import ArmadoLotes from '../pages/operari/ArmadoLotes';
import EstadoAnimales from '../pages/operari/EstadoAnimales';
import CargaCamiones from '../pages/operari/CargaCamiones';
import PanelSupervisor from '../pages/superviso/PanelSupervisor';
import Inventario from '../pages/superviso/Inventario';
import RegistroActividades from '../pages/superviso/RegistroActividades';
import GestionOfertas from '../pages/superviso/GestionOfertas';
import ModuloOperario from '../pages/administrador/ModuloOperario';
import ModuloSupervisor from '../pages/administrador/ModuloSupervisor';
import GestionUsuarios from '../pages/administrador/GestionUsuarios';
import RegistrarAnimal from '../pages/administrador/RegistrarAnimal';
import ClienteInicio from '../pages/client/ClienteInicio';
import ClienteResumen from '../pages/client/ClienteResumen';

import {
  Home as HomeIcon,
  Boxes,
  ShoppingCart,
  ClipboardList,
  Truck,
  LayoutDashboard,
  Package,
  History,
  FileCheck,
  Users,
  PlusCircle,
  ShieldCheck
} from 'lucide-react';

const menuAdmin = [
  { texto: "Gestión de Usuarios", ruta: "/admin", icono: <Users size={20} /> },
  { texto: "Registrar Animal", ruta: "/admin/registrar-animal", icono: <PlusCircle size={20} /> },
  { texto: "Módulo Operario", ruta: "/admin/operario", icono: <ClipboardList size={20} /> },
  { texto: "Módulo Supervisor", ruta: "/admin/supervisor", icono: <ShieldCheck size={20} /> }
];

const menuOperario = [
  { texto: "Inicio / Dashboard", ruta: "/operario", icono: <LayoutDashboard size={20} /> },
  { texto: "Estado de Animales", ruta: "/operario/estado-animales", icono: <ClipboardList size={20} /> },
  { texto: "Armado de Lotes", ruta: "/operario/armado-lotes", icono: <Package size={20} /> },
  { texto: "Carga de Camiones", ruta: "/operario/carga-camiones", icono: <Truck size={20} /> },
];

const menuSupervisor = [
  { texto: "Inicio", ruta: "/supervisor", icono: <LayoutDashboard size={20} /> },
  { texto: "Inventario de Ganado", ruta: "/supervisor/inventario", icono: <Boxes size={20} /> },
  { texto: "Gestionar Ofertas", ruta: "/supervisor/ofertas", icono: <FileCheck size={20} /> },
  { texto: "Registro Actividades", ruta: "/supervisor/actividades", icono: <History size={20} /> }
];

const menuCliente = [
  { texto: "Catálogo de Ganado", ruta: "/cliente", icono: <Boxes size={20} /> },
  { texto: "Resumen", ruta: "/cliente/resumen", icono: <ClipboardList size={20} /> }
];

const LayoutPublico = () => (
  <>
    <Header />
    <Outlet />
  </>
);

const LayoutPrivado = ({ opcionesMenu, children }) => (
  <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F4F6F8' }}>
    <Sidebar opcionesMenu={opcionesMenu} />
    <main
      style={{
        flexGrow: 1,
        marginLeft: '50px',
        padding: '30px 40px',
        backgroundColor: '#F4F6F8',
        minHeight: '100vh',
        boxSizing: 'border-box',
        transition: 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      {children}
    </main>
  </div>
);

function AppRoutes() {
  return (
    <Router>
      <Routes>

        <Route element={<LayoutPublico />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route path="/admin/*" element={
          <LayoutPrivado opcionesMenu={menuAdmin}>
            <Routes>
              <Route path="/" element={<GestionUsuarios />} />
              <Route path="/registrar-animal" element={<RegistrarAnimal />} />
              <Route path="/operario" element={<ModuloOperario />} />
              <Route path="/supervisor" element={<ModuloSupervisor />} />
            </Routes>
          </LayoutPrivado>
        } />

        <Route path="/operario/*" element={
          <LayoutPrivado opcionesMenu={menuOperario}>
            <Routes>
              <Route path="/" element={<PanelOperario />} />
              <Route path="/estado-animales" element={<EstadoAnimales />} />
              <Route path="/armado-lotes" element={<ArmadoLotes />} />
              <Route path="/carga-camiones" element={<CargaCamiones />} />
            </Routes>
          </LayoutPrivado>
        } />

        <Route path="/supervisor/*" element={
          <LayoutPrivado opcionesMenu={menuSupervisor}>
            <Routes>
              <Route path="/" element={<PanelSupervisor />} />
              <Route path="/inventario" element={<Inventario />} />
              <Route path="/ofertas" element={<GestionOfertas />} />
              <Route path="/actividades" element={<RegistroActividades />} />
            </Routes>
          </LayoutPrivado>
        } />

        <Route path="/cliente/*" element={
          <LayoutPrivado opcionesMenu={menuCliente}>
            <Routes>
              <Route path="/" element={<ClienteInicio />} />
              <Route path="/resumen" element={<ClienteResumen />} />
            </Routes>
          </LayoutPrivado>
        } />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;