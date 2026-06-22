import { Routes, Route } from 'react-router-dom'

// Layout
import MainLayout from './components/layout/MainLayout'

// Pages
import Home from './pages/Home'
import Servicios from './pages/Servicios'
import Clientes from './pages/Clientes'
import Nosotros from './pages/Nosotros'
import Contacto from './pages/Contacto'
import Admin from './pages/Admin'

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="servicios" element={<Servicios />} />
        <Route path="clientes" element={<Clientes />} />
        <Route path="nosotros" element={<Nosotros />} />
        <Route path="contacto" element={<Contacto />} />
      </Route>
      <Route path="admin" element={<Admin />} />
      <Route path="admin/metricas" element={<Admin />} />
    </Routes>
  )
}

export default App
