import { Routes, Route, Navigate } from 'react-router-dom'

// Layout
import MainLayout from './components/layout/MainLayout'
import MetaTagsInjector from './components/common/MetaTagsInjector'

// Pages
import Home from './pages/Home'
import Servicios from './pages/Servicios'
import Clientes from './pages/Clientes'
import Nosotros from './pages/Nosotros'
import Contacto from './pages/Contacto'
import Admin from './pages/Admin'
import Login from './pages/Login'
import Register from './pages/Register'
import PoliticaPrivacidad from './pages/PoliticaPrivacidad'
import AvisoLegal from './pages/AvisoLegal'
import TerminosCondiciones from './pages/TerminosCondiciones'
import NotFound from './pages/NotFound'

/** Redirige a /login si no hay sesión activa. */
function RequireAuth({ children }: { children: JSX.Element }) {
  const isAuth = localStorage.getItem('volcan_admin_auth') === 'true'
  return isAuth ? children : <Navigate to="/login" replace />
}

function App() {
  return (
    <>
      <MetaTagsInjector />
      <Routes>
      {/* Public site */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="servicios" element={<Servicios />} />
        <Route path="clientes" element={<Clientes />} />
        <Route path="nosotros" element={<Nosotros />} />
        <Route path="contacto" element={<Contacto />} />
        <Route path="politica-de-privacidad" element={<PoliticaPrivacidad />} />
        <Route path="aviso-legal" element={<AvisoLegal />} />
        <Route path="terminos-y-condiciones" element={<TerminosCondiciones />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected admin */}
      <Route
        path="/admin"
        element={
          <RequireAuth>
            <Admin />
          </RequireAuth>
        }
      />
      <Route
        path="/admin/metricas"
        element={
          <RequireAuth>
            <Admin />
          </RequireAuth>
        }
      />

      {/* Legacy /admin without leading slash — redirect */}
      <Route path="admin" element={<Navigate to="/admin" replace />} />
      </Routes>
    </>
  )
}

export default App
