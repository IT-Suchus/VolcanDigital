import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  fetchAdminLeads, updateLeadStatus, Lead,
  fetchAdminClientes, createCliente, updateCliente, deleteCliente, Cliente,
  fetchPlanes, createPlan, updatePlan, deletePlan, Plan,
  fetchEquipo, createIntegrante, updateIntegrante, deleteIntegrante, Integrante,
  uploadClienteImagen, uploadIntegranteImagen,
  fetchResumenMetricas, fetchLeadsPorMes, fetchLeadsPorEstado, fetchLeadsPorPlan,
  fetchMetricasTecnicasResumen, fetchMetricasTecnicasTiempoRespuesta, fetchMetricasTecnicasRequestsPorEndpoint,
  ResumenMetricas, LeadsPorMes, LeadsPorEstado, LeadsPorPlan,
  MetricasTecnicasResumen, MetricasTecnicasTiempoRespuesta, MetricasTecnicasRequestsPorEndpoint,
  fetchAdminUsuarios, updateUsuarioEstado, deleteUsuario, Usuario
} from '../lib/api';
import { 
  LogOut, FileText, Users, Briefcase, Plus, Edit, Trash2, CheckCircle2, 
  AlertCircle, ExternalLink, RefreshCw, X, Save, Eye, BarChart3, ShieldCheck, ShieldX, UserCog
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, Cell
} from 'recharts';

export default function Admin() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState('');
  const [loggedInRole, setLoggedInRole] = useState('');
  const [loggedInNombre, setLoggedInNombre] = useState('');
  const [activeTab, setActiveTab] = useState<'leads' | 'clientes' | 'planes' | 'equipo' | 'usuarios' | 'metricas'>('leads');

  // Usuarios state
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loadingUsuarios, setLoadingUsuarios] = useState(false);

  // Leads state
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loadingLeads, setLoadingLeads] = useState(false);

  // Clients state
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loadingClientes, setLoadingClientes] = useState(false);
  const [editingCliente, setEditingCliente] = useState<Cliente | null>(null);
  const [showClienteModal, setShowClienteModal] = useState(false);
  const [clienteForm, setClienteForm] = useState({
    nombre: '',
    sitio_url: '',
    rubro: '',
    testimonio: '',
    resultado_destacado: '',
    orden: 0,
    activo: true,
    color_primario: '',
    color_secundario: ''
  });
  const [clienteFile, setClienteFile] = useState<File | null>(null);
  const [clientePreview, setClientePreview] = useState<string>('');

  // Métricas state
  const [resumenMetricas, setResumenMetricas] = useState<ResumenMetricas | null>(null);
  const [leadsPorMes, setLeadsPorMes] = useState<LeadsPorMes[]>([]);
  const [leadsPorEstado, setLeadsPorEstado] = useState<LeadsPorEstado[]>([]);
  const [leadsPorPlan, setLeadsPorPlan] = useState<LeadsPorPlan[]>([]);
  const [metricasTecnicasResumen, setMetricasTecnicasResumen] = useState<MetricasTecnicasResumen | null>(null);
  const [metricasTecnicasTiempoRespuesta, setMetricasTecnicasTiempoRespuesta] = useState<MetricasTecnicasTiempoRespuesta[]>([]);
  const [metricasTecnicasRequestsPorEndpoint, setMetricasTecnicasRequestsPorEndpoint] = useState<MetricasTecnicasRequestsPorEndpoint[]>([]);
  const [loadingMetricas, setLoadingMetricas] = useState(false);

  useEffect(() => {
    if (location.pathname.includes('/metricas')) {
      setActiveTab('metricas');
    } else {
      if (activeTab === 'metricas') {
        setActiveTab('leads');
      }
    }
  }, [location.pathname]);

  const handleTabChange = (tab: 'leads' | 'clientes' | 'planes' | 'equipo' | 'usuarios' | 'metricas') => {
    setActiveTab(tab);
    if (tab === 'metricas') {
      navigate('/admin/metricas');
    } else {
      navigate('/admin');
    }
  };

  // Plans state
  const [planes, setPlanes] = useState<Plan[]>([]);
  const [loadingPlanes, setLoadingPlanes] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [planForm, setPlanForm] = useState({
    nombre: '',
    precio_promo: 0,
    precio_regular: 0,
    duracion_promo_meses: 0,
    descripcion: '',
    incluyeRaw: '',
    no_incluyeRaw: '',
    orden: 0
  });

  // Team state
  const [equipo, setEquipo] = useState<Integrante[]>([]);
  const [loadingEquipo, setLoadingEquipo] = useState(false);
  const [editingMember, setEditingMember] = useState<Integrante | null>(null);
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [memberForm, setMemberForm] = useState({
    nombre: '',
    rol: '',
    orden: 0
  });
  const [memberFile, setMemberFile] = useState<File | null>(null);
  const [memberPreview, setMemberPreview] = useState<string>('');

  const handleClienteFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setClienteFile(file);
      setClientePreview(URL.createObjectURL(file));
    }
  };

  const handleMemberFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setMemberFile(file);
      setMemberPreview(URL.createObjectURL(file));
    }
  };

  const clienteImageUrl = editingCliente?.tiene_imagen
    ? `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/clientes/${editingCliente.id}/imagen`
    : '';

  const memberImageUrl = editingMember?.tiene_imagen
    ? `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/equipo/${editingMember.id}/imagen`
    : '';

  // Detail Modal for leads
  const [viewingLead, setViewingLead] = useState<Lead | null>(null);

  // General message state
  const [feedbackMessage, setFeedbackMessage] = useState({ text: '', type: 'success' });

  useEffect(() => {
    const authStatus = localStorage.getItem('volcan_admin_auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      setLoggedInUser(localStorage.getItem('volcan_auth_user') || '');
      setLoggedInRole(localStorage.getItem('volcan_auth_role') || '');
      setLoggedInNombre(localStorage.getItem('volcan_auth_nombre') || '');
    } else {
      // Should be handled by RequireAuth in App.tsx, but just in case
      navigate('/login');
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated, activeTab]);

  // Usuarios handlers
  const handleApproveUsuario = async (id: number) => {
    try {
      await updateUsuarioEstado(id, { estado: 'activo' });
      showFeedback('Usuario aprobado correctamente');
      setUsuarios(prev => prev.map(u => u.id === id ? { ...u, estado: 'activo' } : u));
    } catch (err) {
      showFeedback('Error al aprobar usuario', 'error');
    }
  };

  const handleRejectUsuario = async (id: number) => {
    try {
      await updateUsuarioEstado(id, { estado: 'rechazado' });
      showFeedback('Usuario rechazado');
      setUsuarios(prev => prev.map(u => u.id === id ? { ...u, estado: 'rechazado' } : u));
    } catch (err) {
      showFeedback('Error al rechazar usuario', 'error');
    }
  };

  const handleChangeRol = async (id: number, rol: string) => {
    try {
      await updateUsuarioEstado(id, { rol });
      showFeedback('Rol actualizado');
      setUsuarios(prev => prev.map(u => u.id === id ? { ...u, rol } : u));
    } catch (err) {
      showFeedback('Error al cambiar rol', 'error');
    }
  };

  const handleDeleteUsuario = async (id: number) => {
    if (!window.confirm('¿Seguro que deseas eliminar este usuario? Esta acción es irreversible.')) return;
    try {
      await deleteUsuario(id);
      showFeedback('Usuario eliminado');
      setUsuarios(prev => prev.filter(u => u.id !== id));
    } catch (err: any) {
      showFeedback(err.response?.data?.detail || 'Error al eliminar usuario', 'error');
    }
  };

  const loadData = () => {
    showFeedback('', 'success');
    if (activeTab === 'leads') {
      setLoadingLeads(true);
      fetchAdminLeads()
        .then(data => {
          if (Array.isArray(data)) setLeads(data);
          else throw new Error("API no devolvió un array");
        })
        .catch(err => {
          console.error(err);
          showFeedback('Error al cargar leads (Revisar VITE_API_URL)', 'error');
          setLeads([]);
        })
        .finally(() => setLoadingLeads(false));
    } else if (activeTab === 'clientes') {
      setLoadingClientes(true);
      fetchAdminClientes()
        .then(data => {
          if (Array.isArray(data)) setClientes(data);
          else throw new Error("API no devolvió un array");
        })
        .catch(err => {
          console.error(err);
          showFeedback('Error al cargar clientes', 'error');
          setClientes([]);
        })
        .finally(() => setLoadingClientes(false));
    } else if (activeTab === 'planes') {
      setLoadingPlanes(true);
      fetchPlanes()
        .then(data => {
          if (Array.isArray(data)) setPlanes(data);
          else throw new Error("API no devolvió un array");
        })
        .catch(err => {
          console.error(err);
          showFeedback('Error al cargar planes', 'error');
          setPlanes([]);
        })
        .finally(() => setLoadingPlanes(false));
    } else if (activeTab === 'equipo') {
      setLoadingEquipo(true);
      fetchEquipo()
        .then(data => {
          if (Array.isArray(data)) setEquipo(data);
          else throw new Error("API no devolvió un array");
        })
        .catch(err => {
          console.error(err);
          showFeedback('Error al cargar integrantes del equipo', 'error');
          setEquipo([]);
        })
        .finally(() => setLoadingEquipo(false));
    } else if (activeTab === 'usuarios') {
      setLoadingUsuarios(true);
      fetchAdminUsuarios()
        .then(data => {
          if (Array.isArray(data)) setUsuarios(data);
          else throw new Error("API no devolvió un array");
        })
        .catch(err => {
          console.error(err);
          showFeedback('Error al cargar usuarios', 'error');
          setUsuarios([]);
        })
        .finally(() => setLoadingUsuarios(false));
    } else if (activeTab === 'metricas') {
      setLoadingMetricas(true);
      Promise.all([
        fetchResumenMetricas(),
        fetchLeadsPorMes(),
        fetchLeadsPorEstado(),
        fetchLeadsPorPlan(),
        fetchMetricasTecnicasResumen(),
        fetchMetricasTecnicasTiempoRespuesta(),
        fetchMetricasTecnicasRequestsPorEndpoint()
      ]).then(([resumen, porMes, porEstado, porPlan, techResumen, techTiempo, techRequests]) => {
        setResumenMetricas(resumen);
        setLeadsPorMes(porMes);
        setLeadsPorEstado(porEstado);
        setLeadsPorPlan(porPlan);
        setMetricasTecnicasResumen(techResumen);
        setMetricasTecnicasTiempoRespuesta(techTiempo);
        setMetricasTecnicasRequestsPorEndpoint(techRequests);
      }).catch(err => {
        console.error(err);
        showFeedback('Error al cargar métricas', 'error');
      }).finally(() => setLoadingMetricas(false));
    }
  };

  const showFeedback = (text: string, type: 'success' | 'error' = 'success') => {
    setFeedbackMessage({ text, type });
    if (text) {
      setTimeout(() => {
        setFeedbackMessage({ text: '', type: 'success' });
      }, 5000);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('volcan_auth_token');
    localStorage.removeItem('volcan_auth_user');
    localStorage.removeItem('volcan_auth_role');
    localStorage.removeItem('volcan_auth_nombre');
    localStorage.removeItem('volcan_admin_auth');
    navigate('/login');
  };

  // Leads handlers
  const handleStatusChange = async (leadId: number, newStatus: string) => {
    try {
      await updateLeadStatus(leadId, newStatus);
      showFeedback('Estado del lead actualizado');
      // Update local state
      setLeads(prev => prev.map(l => l.id === leadId ? { ...l, estado: newStatus } : l));
      if (viewingLead && viewingLead.id === leadId) {
        setViewingLead(prev => prev ? { ...prev, estado: newStatus } : null);
      }
    } catch (err) {
      console.error(err);
      showFeedback('Error al cambiar el estado', 'error');
    }
  };

  // Client handlers
  const openNewCliente = () => {
    setEditingCliente(null);
    setClienteForm({
      nombre: '',
      sitio_url: '',
      rubro: '',
      testimonio: '',
      resultado_destacado: '',
      orden: 0,
      activo: true,
      color_primario: '',
      color_secundario: ''
    });
    setClienteFile(null);
    setClientePreview('');
    setShowClienteModal(true);
  };

  const openEditCliente = (c: Cliente) => {
    setEditingCliente(c);
    setClienteForm({
      nombre: c.nombre,
      sitio_url: c.sitio_url || '',
      rubro: c.rubro || '',
      testimonio: c.testimonio || '',
      resultado_destacado: c.resultado_destacado || '',
      orden: c.orden,
      activo: c.activo,
      color_primario: c.color_primario || '',
      color_secundario: c.color_secundario || ''
    });
    setClienteFile(null);
    setClientePreview('');
    setShowClienteModal(true);
  };

  const handleSaveCliente = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let savedCliente: Cliente;
      const clientData = {
        nombre: clienteForm.nombre,
        sitio_url: clienteForm.sitio_url || null,
        rubro: clienteForm.rubro || null,
        testimonio: clienteForm.testimonio || null,
        resultado_destacado: clienteForm.resultado_destacado || null,
        orden: clienteForm.orden,
        activo: clienteForm.activo,
        color_primario: clienteForm.color_primario || null,
        color_secundario: clienteForm.color_secundario || null
      };

      if (editingCliente) {
        savedCliente = await updateCliente(editingCliente.id, clientData);
      } else {
        savedCliente = await createCliente(clientData);
      }

      if (clienteFile) {
        try {
          await uploadClienteImagen(savedCliente.id, clienteFile);
          showFeedback(editingCliente ? 'Cliente e imagen actualizados' : 'Cliente creado con imagen');
        } catch (uploadErr: any) {
          console.error(uploadErr);
          const errorMsg = uploadErr.response?.data?.detail || 'Error al subir la imagen (formato inválido o supera los 5MB)';
          showFeedback(`Cliente guardado, pero falló la imagen: ${errorMsg}`, 'error');
        }
      } else {
        showFeedback(editingCliente ? 'Cliente actualizado correctamente' : 'Cliente creado correctamente');
      }

      setShowClienteModal(false);
      loadData();
    } catch (err) {
      console.error(err);
      showFeedback('Error al guardar cliente', 'error');
    }
  };

  const handleDeleteCliente = async (id: number) => {
    if (window.confirm('¿Seguro que deseas eliminar este cliente?')) {
      try {
        await deleteCliente(id);
        showFeedback('Cliente eliminado');
        loadData();
      } catch (err) {
        console.error(err);
        showFeedback('Error al eliminar cliente', 'error');
      }
    }
  };

  // Plans handlers
  const openNewPlan = () => {
    setEditingPlan(null);
    setPlanForm({
      nombre: '',
      precio_promo: 0,
      precio_regular: 0,
      duracion_promo_meses: 0,
      descripcion: '',
      incluyeRaw: '',
      no_incluyeRaw: '',
      orden: 0
    });
    setShowPlanModal(true);
  };

  const openEditPlan = (p: Plan) => {
    setEditingPlan(p);
    setPlanForm({
      nombre: p.nombre,
      precio_promo: p.precio_promo || 0,
      precio_regular: p.precio_regular || 0,
      duracion_promo_meses: p.duracion_promo_meses || 0,
      descripcion: p.descripcion || '',
      incluyeRaw: p.incluye ? p.incluye.join('\n') : '',
      no_incluyeRaw: p.no_incluye ? p.no_incluye.join('\n') : '',
      orden: p.orden
    });
    setShowPlanModal(true);
  };

  const handleSavePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    const incluye = planForm.incluyeRaw.split('\n').map(x => x.trim()).filter(Boolean);
    const no_incluye = planForm.no_incluyeRaw.split('\n').map(x => x.trim()).filter(Boolean);
    
    const payload = {
      nombre: planForm.nombre,
      precio_promo: planForm.precio_promo || null,
      precio_regular: planForm.precio_regular || null,
      duracion_promo_meses: planForm.duracion_promo_meses || null,
      descripcion: planForm.descripcion || null,
      incluye: incluye.length ? incluye : null,
      no_incluye: no_incluye.length ? no_incluye : null,
      orden: planForm.orden
    };

    try {
      if (editingPlan) {
        await updatePlan(editingPlan.id, payload);
        showFeedback('Plan actualizado correctamente');
      } else {
        await createPlan(payload);
        showFeedback('Plan creado correctamente');
      }
      setShowPlanModal(false);
      loadData();
    } catch (err) {
      console.error(err);
      showFeedback('Error al guardar plan', 'error');
    }
  };

  const handleDeletePlan = async (id: number) => {
    if (window.confirm('¿Seguro que deseas eliminar este plan?')) {
      try {
        await deletePlan(id);
        showFeedback('Plan eliminado');
        loadData();
      } catch (err) {
        console.error(err);
        showFeedback('Error al eliminar plan', 'error');
      }
    }
  };

  // Team handlers
  const openNewMember = () => {
    setEditingMember(null);
    setMemberForm({
      nombre: '',
      rol: '',
      orden: 0
    });
    setMemberFile(null);
    setMemberPreview('');
    setShowMemberModal(true);
  };

  const openEditMember = (m: Integrante) => {
    setEditingMember(m);
    setMemberForm({
      nombre: m.nombre,
      rol: m.rol,
      orden: m.orden
    });
    setMemberFile(null);
    setMemberPreview('');
    setShowMemberModal(true);
  };

  const handleSaveMember = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let savedMember: Integrante;
      const memberData = {
        nombre: memberForm.nombre,
        rol: memberForm.rol,
        orden: memberForm.orden
      };

      if (editingMember) {
        savedMember = await updateIntegrante(editingMember.id, memberData);
      } else {
        savedMember = await createIntegrante(memberData);
      }

      if (memberFile) {
        try {
          await uploadIntegranteImagen(savedMember.id, memberFile);
          showFeedback(editingMember ? 'Integrante e imagen actualizados' : 'Integrante creado con imagen');
        } catch (uploadErr: any) {
          console.error(uploadErr);
          const errorMsg = uploadErr.response?.data?.detail || 'Error al subir la imagen (formato inválido o supera los 5MB)';
          showFeedback(`Integrante guardado, pero falló la imagen: ${errorMsg}`, 'error');
        }
      } else {
        showFeedback(editingMember ? 'Integrante del equipo actualizado' : 'Integrante del equipo creado');
      }

      setShowMemberModal(false);
      loadData();
    } catch (err) {
      console.error(err);
      showFeedback('Error al guardar integrante', 'error');
    }
  };

  const handleDeleteMember = async (id: number) => {
    if (window.confirm('¿Seguro que deseas eliminar este integrante?')) {
      try {
        await deleteIntegrante(id);
        showFeedback('Integrante del equipo eliminado');
        loadData();
      } catch (err) {
        console.error(err);
        showFeedback('Error al eliminar integrante', 'error');
      }
    }
  };

  if (!isAuthenticated) {
    return null; // RequireAuth in App.tsx handles redirect to /login
  }

  return (
    <div className="min-h-screen bg-volcan-cream flex flex-col font-sans text-volcan-night">
      {/* Admin Navbar */}
      <nav className="bg-volcan-night text-white border-b border-volcan-taupe/20 px-6 py-4 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-3">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-volcan-ember">
            <path d="m8 3 4 8 5-5 5 15H2L8 3z"/>
          </svg>
          <span className="font-serif font-black text-xl tracking-tight text-white">Volcán Digital</span>
          <span className="bg-volcan-ember/25 text-volcan-ember border border-volcan-ember/40 text-xs px-2.5 py-0.5 rounded-full font-bold ml-2 uppercase tracking-wider">Admin</span>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-volcan-taupe/80 text-volcan-cream hover:text-white px-4 py-2 rounded-xl text-sm font-medium border border-volcan-taupe/20 hover:bg-volcan-taupe/20 transition-all"
        >
          <LogOut size={16} />
          Salir
        </button>
      </nav>

      <div className="flex flex-col lg:flex-row flex-grow">
        {/* Sidebar tabs */}
        <aside className="w-full lg:w-64 bg-volcan-night border-b lg:border-b-0 lg:border-r border-volcan-taupe/20 py-6 flex flex-col gap-2 shrink-0">
          <button
            onClick={() => handleTabChange('leads')}
            className={`flex items-center gap-3 px-6 py-3 text-left font-medium transition-all ${
              activeTab === 'leads' 
                ? 'text-volcan-ember bg-volcan-taupe/25 border-l-4 border-volcan-ember' 
                : 'text-volcan-cream/70 hover:text-white hover:bg-volcan-taupe/10 border-l-4 border-transparent'
            }`}
          >
            <FileText size={20} />
            <span>Leads (Contactos)</span>
          </button>
          <button
            onClick={() => handleTabChange('clientes')}
            className={`flex items-center gap-3 px-6 py-3 text-left font-medium transition-all ${
              activeTab === 'clientes' 
                ? 'text-volcan-ember bg-volcan-taupe/25 border-l-4 border-volcan-ember' 
                : 'text-volcan-cream/70 hover:text-white hover:bg-volcan-taupe/10 border-l-4 border-transparent'
            }`}
          >
            <Briefcase size={20} />
            <span>Clientes</span>
          </button>
          <button
            onClick={() => handleTabChange('planes')}
            className={`flex items-center gap-3 px-6 py-3 text-left font-medium transition-all ${
              activeTab === 'planes' 
                ? 'text-volcan-ember bg-volcan-taupe/25 border-l-4 border-volcan-ember' 
                : 'text-volcan-cream/70 hover:text-white hover:bg-volcan-taupe/10 border-l-4 border-transparent'
            }`}
          >
            <FileText size={20} />
            <span>Planes Comerciales</span>
          </button>
          <button
            onClick={() => handleTabChange('equipo')}
            className={`flex items-center gap-3 px-6 py-3 text-left font-medium transition-all ${
              activeTab === 'equipo' 
                ? 'text-volcan-ember bg-volcan-taupe/25 border-l-4 border-volcan-ember' 
                : 'text-volcan-cream/70 hover:text-white hover:bg-volcan-taupe/10 border-l-4 border-transparent'
            }`}
          >
            <Users size={20} />
            <span>Equipo</span>
          </button>
          <button
            onClick={() => handleTabChange('metricas')}
            className={`flex items-center gap-3 px-6 py-3 text-left font-medium transition-all ${
              activeTab === 'metricas' 
                ? 'text-volcan-ember bg-volcan-taupe/25 border-l-4 border-volcan-ember' 
                : 'text-volcan-cream/70 hover:text-white hover:bg-volcan-taupe/10 border-l-4 border-transparent'
            }`}
          >
            <BarChart3 size={20} />
            <span>Métricas</span>
          </button>

          {/* Usuarios tab — solo admins */}
          {loggedInRole === 'administrador' && (
            <button
              onClick={() => handleTabChange('usuarios')}
              className={`flex items-center gap-3 px-6 py-3 text-left font-medium transition-all ${
                activeTab === 'usuarios'
                  ? 'text-volcan-ember bg-volcan-taupe/25 border-l-4 border-volcan-ember'
                  : 'text-volcan-cream/70 hover:text-white hover:bg-volcan-taupe/10 border-l-4 border-transparent'
              }`}
            >
              <UserCog size={20} />
              <span>Usuarios</span>
            </button>
          )}

          <div className="mt-auto px-6 py-4 text-xs text-volcan-taupe/40 border-t border-volcan-taupe/20 hidden lg:block space-y-1">
            {loggedInNombre && <div>Nombre: <span className="text-volcan-cream/85 font-semibold">{loggedInNombre}</span></div>}
            <div>Email: <span className="text-volcan-ember font-semibold">{loggedInUser}</span></div>
            <div>Rol: <span className="text-volcan-cream/85 capitalize font-medium">{loggedInRole}</span></div>
            <div className="pt-1 text-[10px] text-volcan-taupe/30">Conectado a base de datos.</div>
          </div>
        </aside>

        {/* Content panel */}
        <main className="flex-grow p-6 sm:p-8 overflow-y-auto">
          {/* Feedback alerts */}
          {feedbackMessage.text && (
            <div className={`mb-6 p-4 rounded-xl border flex items-center gap-3 animate-fade-in ${
              feedbackMessage.type === 'error' 
                ? 'bg-red-50 border-red-200 text-red-800' 
                : 'bg-green-50 border-green-200 text-green-800'
            }`}>
              {feedbackMessage.type === 'error' ? <AlertCircle size={20} /> : <CheckCircle2 size={20} />}
              <span className="font-medium text-sm">{feedbackMessage.text}</span>
            </div>
          )}

          {/* Heading with Refresh */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-volcan-night capitalize flex items-center gap-2">
              {activeTab === 'equipo' ? 'Nuestro Equipo' : activeTab}
            </h1>
            <button 
              onClick={loadData}
              className="p-2.5 rounded-xl border border-volcan-taupe/20 bg-white hover:bg-volcan-cream transition-colors text-volcan-night flex items-center justify-center shadow-sm"
              title="Recargar datos"
            >
              <RefreshCw size={18} />
            </button>
          </div>

          {/* -------------------- TAB: LEADS -------------------- */}
          {activeTab === 'leads' && (
            <div className="bg-white rounded-2xl border border-volcan-taupe/20 shadow-sm overflow-hidden">
              {loadingLeads ? (
                <div className="py-20 text-center text-volcan-taupe">Cargando leads...</div>
              ) : leads.length === 0 ? (
                <div className="py-20 text-center text-volcan-taupe">No se encontraron leads registrados.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-volcan-taupe/20">
                    <thead className="bg-volcan-cream">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-bold text-volcan-taupe uppercase tracking-wider">Nombre</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-volcan-taupe uppercase tracking-wider">Contacto</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-volcan-taupe uppercase tracking-wider">Negocio</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-volcan-taupe uppercase tracking-wider">Interés</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-volcan-taupe uppercase tracking-wider">Fecha</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-volcan-taupe uppercase tracking-wider">Estado</th>
                        <th className="px-6 py-4 text-center text-xs font-bold text-volcan-taupe uppercase tracking-wider">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-volcan-taupe/20 bg-white text-sm">
                      {leads.map((l) => (
                        <tr key={l.id} className="hover:bg-volcan-cream/30">
                          <td className="px-6 py-4 whitespace-nowrap font-semibold text-volcan-night">{l.nombre}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-volcan-night/85">
                            <div>{l.email}</div>
                            {l.telefono && <div className="text-xs text-volcan-taupe">{l.telefono}</div>}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-volcan-night/85">{l.negocio || '-'}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-xs">
                            <span className="bg-volcan-taupe/15 text-volcan-night px-2 py-1 rounded-md font-medium">
                              {l.plan_interes || 'General'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-xs text-volcan-taupe">
                            {new Date(l.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                              l.estado === 'nuevo' ? 'bg-blue-100 text-blue-800' :
                              l.estado === 'en_proceso' ? 'bg-amber-100 text-amber-800' :
                              l.estado === 'contactado' ? 'bg-green-100 text-green-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {l.estado}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center text-xs space-x-2">
                            <button
                              onClick={() => setViewingLead(l)}
                              className="text-volcan-night hover:text-volcan-night p-1 rounded hover:bg-volcan-taupe/15 inline-flex items-center justify-center"
                              title="Ver detalles"
                            >
                              <Eye size={16} />
                            </button>
                            <select
                              value={l.estado}
                              onChange={(e) => handleStatusChange(l.id, e.target.value)}
                              className="text-xs border border-volcan-taupe/20 rounded bg-white p-1 focus:ring-volcan-ember focus:outline-none"
                            >
                              <option value="nuevo">Nuevo</option>
                              <option value="en_proceso">En Proceso</option>
                              <option value="contactado">Contactado</option>
                              <option value="descartado">Descartado</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* -------------------- TAB: CLIENTES -------------------- */}
          {activeTab === 'clientes' && (
            <div>
              <div className="mb-6 flex justify-start">
                <button
                  onClick={openNewCliente}
                  className="flex items-center gap-2 btn-gradient-whatsapp text-white px-5 py-3 rounded-xl font-bold hover:scale-[1.02] shadow-md transition-all text-sm"
                >
                  <Plus size={18} />
                  Agregar Cliente
                </button>
              </div>

              {loadingClientes ? (
                <div className="py-20 text-center text-volcan-taupe">Cargando clientes...</div>
              ) : clientes.length === 0 ? (
                <div className="py-20 text-center text-volcan-taupe bg-white rounded-2xl border border-volcan-taupe/20">No hay clientes cargados.</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {clientes.map((c) => (
                    <div 
                      key={c.id} 
                      className={`bg-white p-6 rounded-2xl border border-volcan-taupe/20 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative ${!c.activo && 'opacity-60 bg-gray-50'}`}
                      style={{ borderTop: `4px solid ${c.color_primario || '#D3A784'}` }}
                    >
                      {!c.activo && (
                        <span className="absolute top-4 right-4 bg-gray-200 text-gray-800 text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider">Inactivo</span>
                      )}
                      <div>
                        <div className="flex justify-between items-start mb-4">
                          <span className="text-xs text-volcan-taupe font-bold">Orden: {c.orden}</span>
                          <span 
                            className="text-xs font-semibold bg-volcan-ember/10 px-2 py-0.5 rounded-md"
                            style={{ color: c.color_primario || '#D3A784', backgroundColor: `${c.color_primario || '#D3A784'}1A` }}
                          >
                            {c.rubro || 'Sin rubro'}
                          </span>
                        </div>
                        <h3 className="font-serif font-bold text-xl text-volcan-night mb-2">{c.nombre}</h3>
                        
                        <div className="my-3 flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-volcan-cream border border-volcan-taupe/20 flex items-center justify-center overflow-hidden shrink-0">
                            {c.tiene_imagen ? (
                              <img 
                                src={`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/clientes/${c.id}/imagen`} 
                                alt={c.nombre}
                                className="w-full h-full object-contain p-1"
                              />
                            ) : (
                              <span className="text-volcan-taupe/40 font-serif font-bold text-lg">{c.nombre.charAt(0)}</span>
                            )}
                          </div>
                          <div>
                            <span className="text-xs text-volcan-taupe font-semibold block">Logo del Cliente</span>
                            <span className="text-[10px] text-volcan-taupe/70">
                              {c.tiene_imagen ? 'Almacenado en BD' : 'Sin imagen cargada'}
                            </span>
                          </div>
                        </div>

                        {c.resultado_destacado && (
                          <div className="mt-3 text-sm text-green-700 bg-green-50 p-2.5 rounded-lg border border-green-100 font-medium">
                            🎯 {c.resultado_destacado}
                          </div>
                        )}

                        {c.testimonio && (
                          <p className="mt-3 text-sm italic text-volcan-night/80 line-clamp-3">
                            "{c.testimonio}"
                          </p>
                        )}
                      </div>

                      <div className="mt-6 pt-4 border-t border-volcan-taupe/20 flex justify-between items-center bg-white">
                        {c.sitio_url ? (
                          <a 
                            href={c.sitio_url} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="text-xs inline-flex items-center gap-1 font-semibold transition-colors"
                            style={{ color: c.color_primario || '#D3A784' }}
                          >
                            Web <ExternalLink size={12} />
                          </a>
                        ) : <span className="text-xs text-volcan-taupe/70">Sin web</span>}

                        <div className="flex gap-2">
                          <button
                            onClick={() => openEditCliente(c)}
                            className="p-2 border border-volcan-taupe/20 rounded-xl bg-white hover:bg-volcan-cream text-volcan-night hover:text-volcan-night transition-colors"
                            title="Editar"
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            onClick={() => handleDeleteCliente(c.id)}
                            className="p-2 border border-red-200 rounded-xl bg-white hover:bg-red-50 text-red-600 hover:text-red-700 transition-colors"
                            title="Eliminar"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* -------------------- TAB: PLANES -------------------- */}
          {activeTab === 'planes' && (
            <div>
              <div className="mb-6 flex justify-start">
                <button
                  onClick={openNewPlan}
                  className="flex items-center gap-2 btn-gradient-whatsapp text-white px-5 py-3 rounded-xl font-bold hover:scale-[1.02] shadow-md transition-all text-sm"
                >
                  <Plus size={18} />
                  Agregar Plan
                </button>
              </div>

              {loadingPlanes ? (
                <div className="py-20 text-center text-volcan-taupe">Cargando planes...</div>
              ) : planes.length === 0 ? (
                <div className="py-20 text-center text-volcan-taupe bg-white rounded-2xl border border-volcan-taupe/20">No hay planes cargados.</div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {planes.map((p) => (
                    <div key={p.id} className="bg-white p-6 rounded-2xl border border-volcan-taupe/20 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                      <div>
                        <div className="flex justify-between items-start mb-4">
                          <span className="text-xs text-volcan-taupe font-bold">Orden: {p.orden}</span>
                          <span className="text-xs text-volcan-ember font-bold bg-volcan-ember/15 px-2 py-0.5 rounded-md">ID: {p.id}</span>
                        </div>
                        <h3 className="font-serif font-bold text-2xl text-volcan-night mb-2">{p.nombre}</h3>
                        
                        <div className="flex gap-4 my-3 bg-volcan-cream p-3 rounded-xl text-xs">
                          <div>
                            <span className="block font-semibold text-volcan-taupe">Regular:</span>
                            <span className="font-bold text-sm text-volcan-night">{p.precio_regular ? `$${p.precio_regular.toLocaleString()}` : '-'}</span>
                          </div>
                          <div>
                            <span className="block font-semibold text-volcan-taupe">Promo:</span>
                            <span className="font-bold text-sm text-volcan-ember">{p.precio_promo ? `$${p.precio_promo.toLocaleString()}` : '-'}</span>
                          </div>
                          {p.duracion_promo_meses ? (
                            <div>
                              <span className="block font-semibold text-volcan-taupe">Duración:</span>
                              <span className="font-bold text-sm text-volcan-night">{p.duracion_promo_meses} meses</span>
                            </div>
                          ) : null}
                        </div>

                        {p.descripcion && <p className="text-sm text-volcan-night/85 mb-4">{p.descripcion}</p>}

                        <div className="grid grid-cols-2 gap-4 text-xs mt-4">
                          <div>
                            <h4 className="font-bold text-green-700 mb-2">✓ Incluye:</h4>
                            {p.incluye && p.incluye.length ? (
                              <ul className="space-y-1 list-disc pl-4 text-volcan-night/85">
                                {p.incluye.map((inc, i) => <li key={i}>{inc}</li>)}
                              </ul>
                            ) : <span className="text-volcan-taupe/70">Nada</span>}
                          </div>
                          <div>
                            <h4 className="font-bold text-red-700 mb-2">✗ No incluye:</h4>
                            {p.no_incluye && p.no_incluye.length ? (
                              <ul className="space-y-1 list-disc pl-4 text-volcan-night/85">
                                {p.no_incluye.map((noinc, i) => <li key={i}>{noinc}</li>)}
                              </ul>
                            ) : <span className="text-volcan-taupe/70">Nada</span>}
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-volcan-taupe/20 flex justify-end gap-2 bg-white">
                        <button
                          onClick={() => openEditPlan(p)}
                          className="p-2 border border-volcan-taupe/20 rounded-xl bg-white hover:bg-volcan-cream text-volcan-night hover:text-volcan-night transition-colors flex items-center gap-1.5 text-xs font-semibold"
                        >
                          <Edit size={14} />
                          Editar
                        </button>
                        <button
                          onClick={() => handleDeletePlan(p.id)}
                          className="p-2 border border-red-200 rounded-xl bg-white hover:bg-red-50 text-red-600 hover:text-red-700 transition-colors flex items-center gap-1.5 text-xs font-semibold"
                        >
                          <Trash2 size={14} />
                          Eliminar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* -------------------- TAB: EQUIPO -------------------- */}
          {activeTab === 'equipo' && (
            <div>
              <div className="mb-6 flex justify-start">
                <button
                  onClick={openNewMember}
                  className="flex items-center gap-2 btn-gradient-whatsapp text-white px-5 py-3 rounded-xl font-bold hover:scale-[1.02] shadow-md transition-all text-sm"
                >
                  <Plus size={18} />
                  Agregar Integrante
                </button>
              </div>

              {loadingEquipo ? (
                <div className="py-20 text-center text-volcan-taupe">Cargando equipo...</div>
              ) : equipo.length === 0 ? (
                <div className="py-20 text-center text-volcan-taupe bg-white rounded-2xl border border-volcan-taupe/20">No hay integrantes en el equipo.</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {equipo.map((m) => (
                    <div key={m.id} className="bg-white p-6 rounded-2xl border border-volcan-taupe/20 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                      <div>
                        <div className="flex justify-between items-start mb-4">
                          <span className="text-xs text-volcan-taupe font-bold">Orden: {m.orden}</span>
                          <span className="text-xs text-volcan-ember font-bold bg-volcan-ember/15 px-2 py-0.5 rounded-md">ID: {m.id}</span>
                        </div>
                        <h3 className="font-serif font-bold text-xl text-volcan-night mb-1">{m.nombre}</h3>
                        <p className="text-sm font-semibold text-volcan-taupe mb-4">{m.rol}</p>
                        
                        <div className="my-3 flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-volcan-cream border border-volcan-taupe/20 flex items-center justify-center overflow-hidden shrink-0">
                            {m.tiene_imagen ? (
                              <img 
                                src={`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/equipo/${m.id}/imagen`} 
                                alt={m.nombre}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="text-volcan-taupe/40 font-serif font-bold text-lg">{m.nombre.charAt(0)}</span>
                            )}
                          </div>
                          <div>
                            <span className="text-xs text-volcan-taupe font-semibold block">Foto del Integrante</span>
                            <span className="text-[10px] text-volcan-taupe/70">
                              {m.tiene_imagen ? 'Almacenada en BD' : 'Sin foto cargada'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-volcan-taupe/20 flex justify-end gap-2 bg-white">
                        <button
                          onClick={() => openEditMember(m)}
                          className="p-2 border border-volcan-taupe/20 rounded-xl bg-white hover:bg-volcan-cream text-volcan-night hover:text-volcan-night transition-colors"
                          title="Editar"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteMember(m.id)}
                          className="p-2 border border-red-200 rounded-xl bg-white hover:bg-red-50 text-red-600 hover:text-red-700 transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* -------------------- TAB: USUARIOS -------------------- */}
          {activeTab === 'usuarios' && (
            <div className="animate-fade-in">
              <div className="bg-white rounded-2xl border border-volcan-taupe/20 shadow-sm overflow-hidden">
                {loadingUsuarios ? (
                  <div className="py-20 text-center text-volcan-taupe">Cargando usuarios...</div>
                ) : usuarios.length === 0 ? (
                  <div className="py-20 text-center text-volcan-taupe">No hay usuarios registrados.</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-volcan-taupe/20">
                      <thead className="bg-volcan-cream">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-bold text-volcan-taupe uppercase tracking-wider">Nombre</th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-volcan-taupe uppercase tracking-wider">Email</th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-volcan-taupe uppercase tracking-wider">Rol</th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-volcan-taupe uppercase tracking-wider">Estado</th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-volcan-taupe uppercase tracking-wider">Registro</th>
                          <th className="px-6 py-4 text-center text-xs font-bold text-volcan-taupe uppercase tracking-wider">Acciones</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-volcan-taupe/20 bg-white text-sm">
                        {usuarios.map((u) => (
                          <tr key={u.id} className="hover:bg-volcan-cream/30">
                            <td className="px-6 py-4 whitespace-nowrap font-semibold text-volcan-night">
                              {u.nombre || <span className="text-volcan-taupe/50 italic">Sin nombre</span>}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-volcan-night/85">{u.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <select
                                value={u.rol}
                                onChange={(e) => handleChangeRol(u.id, e.target.value)}
                                disabled={u.email === loggedInUser}
                                className="border border-volcan-taupe/20 rounded-lg px-2 py-1 text-xs font-semibold bg-white text-volcan-night focus:ring-2 focus:ring-volcan-ember focus:outline-none disabled:opacity-50"
                              >
                                <option value="administrador">Administrador</option>
                                <option value="desarrollador">Desarrollador</option>
                                <option value="colaborador">Colaborador</option>
                              </select>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold capitalize ${
                                u.estado === 'activo' ? 'bg-green-100 text-green-800' :
                                u.estado === 'pendiente' ? 'bg-amber-100 text-amber-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {u.estado === 'activo' ? <CheckCircle2 size={11} /> :
                                 u.estado === 'pendiente' ? <AlertCircle size={11} /> :
                                 <X size={11} />}
                                {u.estado}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-volcan-taupe/70 text-xs">
                              {u.created_at ? new Date(u.created_at).toLocaleDateString('es-AR') : '—'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center justify-center gap-2">
                                {u.estado !== 'activo' && (
                                  <button
                                    onClick={() => handleApproveUsuario(u.id)}
                                    title="Aprobar acceso"
                                    className="p-2 rounded-xl bg-green-50 border border-green-200 text-green-700 hover:bg-green-100 transition-colors"
                                  >
                                    <ShieldCheck size={14} />
                                  </button>
                                )}
                                {u.estado !== 'rechazado' && u.email !== loggedInUser && (
                                  <button
                                    onClick={() => handleRejectUsuario(u.id)}
                                    title="Rechazar acceso"
                                    className="p-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 hover:bg-amber-100 transition-colors"
                                  >
                                    <ShieldX size={14} />
                                  </button>
                                )}
                                {u.email !== loggedInUser && (
                                  <button
                                    onClick={() => handleDeleteUsuario(u.id)}
                                    title="Eliminar usuario"
                                    className="p-2 rounded-xl bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 transition-colors"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'metricas' && (
            <div className="space-y-8 animate-fade-in text-sm text-volcan-night">
              {loadingMetricas ? (
                <div className="py-20 text-center text-volcan-taupe">Cargando métricas...</div>
              ) : (
                <>
                  {/* Resumen Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-2xl border border-volcan-taupe/20 shadow-sm text-center">
                      <div className="text-4xl font-serif font-black text-volcan-ember mb-1">
                        {resumenMetricas?.total_leads ?? 0}
                      </div>
                      <div className="text-volcan-taupe text-xs font-bold uppercase tracking-wider">Total de Leads</div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-volcan-taupe/20 shadow-sm text-center">
                      <div className="text-4xl font-serif font-black text-volcan-ember mb-1">
                        {resumenMetricas?.tasa_conversion ?? 0}%
                      </div>
                      <div className="text-volcan-taupe text-xs font-bold uppercase tracking-wider">Tasa de Conversión</div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-volcan-taupe/20 shadow-sm text-center">
                      <div className="text-4xl font-serif font-black text-volcan-ember mb-1">
                        {resumenMetricas?.clientes_activos ?? 0}
                      </div>
                      <div className="text-volcan-taupe text-xs font-bold uppercase tracking-wider">Clientes Activos</div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-volcan-taupe/20 shadow-sm text-center truncate">
                      <div className="text-2xl font-serif font-bold text-volcan-night mb-2 truncate" title={resumenMetricas?.lead_mas_reciente || 'Ninguno'}>
                        {resumenMetricas?.lead_mas_reciente || '-'}
                      </div>
                      <div className="text-volcan-taupe text-xs font-bold uppercase tracking-wider">Último Lead Recibido</div>
                    </div>
                  </div>

                  {/* Charts Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Leads por Mes */}
                    <div className="bg-white p-6 rounded-2xl border border-volcan-taupe/20 shadow-sm">
                      <h3 className="text-lg font-serif font-bold text-volcan-night mb-4">Evolución Mensual (Leads)</h3>
                      <div className="h-80">
                        {leadsPorMes.length === 0 ? (
                           <div className="h-full flex items-center justify-center text-sm text-volcan-taupe/70">Sin datos registrados</div>
                        ) : (
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={leadsPorMes} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#F0EBE6" />
                              <XAxis dataKey="mes" stroke="#4B5563" fontSize={12} />
                              <YAxis stroke="#4B5563" fontSize={12} allowDecimals={false} />
                              <Tooltip contentStyle={{ backgroundColor: '#FCFBF9', border: '1px solid #9E8B7D', borderRadius: '12px' }} />
                              <Legend />
                              <Line type="monotone" dataKey="cantidad" name="Leads" stroke="#D3A784" strokeWidth={3} activeDot={{ r: 8 }} />
                            </LineChart>
                          </ResponsiveContainer>
                        )}
                      </div>
                    </div>

                    {/* Leads por Estado */}
                    <div className="bg-white p-6 rounded-2xl border border-volcan-taupe/20 shadow-sm">
                      <h3 className="text-lg font-serif font-bold text-volcan-night mb-4">Leads por Estado</h3>
                      <div className="h-80">
                        {leadsPorEstado.length === 0 ? (
                          <div className="h-full flex items-center justify-center text-sm text-volcan-taupe/70">Sin datos registrados</div>
                        ) : (
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={leadsPorEstado} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#F0EBE6" />
                              <XAxis dataKey="estado" stroke="#4B5563" fontSize={12} />
                              <YAxis stroke="#4B5563" fontSize={12} allowDecimals={false} />
                              <Tooltip contentStyle={{ backgroundColor: '#FCFBF9', border: '1px solid #9E8B7D', borderRadius: '12px' }} />
                              <Legend />
                              <Bar dataKey="cantidad" name="Leads" fill="#684036">
                                {leadsPorEstado.map((_, index) => {
                                  const colors = ['#D3A784', '#684036', '#9E8B7D', '#231F20', '#555555'];
                                  return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
                                })}
                              </Bar>
                            </BarChart>
                          </ResponsiveContainer>
                        )}
                      </div>
                    </div>

                    {/* Leads por Plan */}
                    <div className="bg-white p-6 rounded-2xl border border-volcan-taupe/20 shadow-sm lg:col-span-2">
                      <h3 className="text-lg font-serif font-bold text-volcan-night mb-4">Interés por Plan Comercial</h3>
                      <div className="h-80">
                        {leadsPorPlan.length === 0 ? (
                          <div className="h-full flex items-center justify-center text-sm text-volcan-taupe/70">Sin datos registrados</div>
                        ) : (
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={leadsPorPlan} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#F0EBE6" />
                              <XAxis dataKey="plan" stroke="#4B5563" fontSize={12} />
                              <YAxis stroke="#4B5563" fontSize={12} allowDecimals={false} />
                              <Tooltip contentStyle={{ backgroundColor: '#FCFBF9', border: '1px solid #9E8B7D', borderRadius: '12px' }} />
                              <Legend />
                              <Bar dataKey="cantidad" name="Leads" fill="#D3A784" radius={[8, 8, 0, 0]} />
                            </BarChart>
                          </ResponsiveContainer>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Estado Técnico */}
                  <div className="mt-12 pt-8 border-t border-volcan-taupe/20">
                    <h2 className="text-2xl font-serif font-black text-volcan-night mb-6">Estado Técnico del Sitio</h2>
                    
                    {/* KPI Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                      <div className="bg-white p-6 rounded-2xl border border-volcan-taupe/20 shadow-sm text-center">
                        <div className="text-4xl font-serif font-black text-volcan-ember mb-1">
                          {metricasTecnicasResumen?.tiempo_respuesta_promedio ?? 0} ms
                        </div>
                        <div className="text-volcan-taupe text-xs font-bold uppercase tracking-wider">Tiempo Promedio (24h)</div>
                      </div>
                      <div className="bg-white p-6 rounded-2xl border border-volcan-taupe/20 shadow-sm text-center">
                        <div className="text-4xl font-serif font-black text-volcan-ember mb-1">
                          {metricasTecnicasResumen?.cantidad_total ?? 0}
                        </div>
                        <div className="text-volcan-taupe text-xs font-bold uppercase tracking-wider">Peticiones Totales (24h)</div>
                      </div>
                      <div className="bg-white p-6 rounded-2xl border border-volcan-taupe/20 shadow-sm text-center">
                        <div className={`text-4xl font-serif font-black mb-1 ${metricasTecnicasResumen?.tasa_error && metricasTecnicasResumen.tasa_error > 5 ? 'text-red-500' : 'text-volcan-ember'}`}>
                          {metricasTecnicasResumen?.tasa_error ?? 0}%
                        </div>
                        <div className="text-volcan-taupe text-xs font-bold uppercase tracking-wider">Tasa de Error (24h)</div>
                      </div>
                    </div>

                    {/* Technical Charts Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Tiempo de Respuesta Line Chart */}
                      <div className="bg-white p-6 rounded-2xl border border-volcan-taupe/20 shadow-sm">
                        <h3 className="text-lg font-serif font-bold text-volcan-night mb-4">Tiempo de Respuesta Promedio (ms)</h3>
                        <div className="h-80">
                          {metricasTecnicasTiempoRespuesta.length === 0 ? (
                            <div className="h-full flex items-center justify-center text-sm text-volcan-taupe/70">Sin datos registrados</div>
                          ) : (
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart data={metricasTecnicasTiempoRespuesta} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#F0EBE6" />
                                <XAxis dataKey="hora" stroke="#4B5563" fontSize={12} />
                                <YAxis stroke="#4B5563" fontSize={12} allowDecimals={true} unit=" ms" />
                                <Tooltip contentStyle={{ backgroundColor: '#FCFBF9', border: '1px solid #9E8B7D', borderRadius: '12px' }} />
                                <Legend />
                                <Line type="monotone" dataKey="tiempo_promedio" name="Tiempo Promedio" stroke="#D3A784" strokeWidth={3} activeDot={{ r: 8 }} />
                              </LineChart>
                            </ResponsiveContainer>
                          )}
                        </div>
                      </div>

                      {/* Requests por Endpoint Bar Chart */}
                      <div className="bg-white p-6 rounded-2xl border border-volcan-taupe/20 shadow-sm">
                        <h3 className="text-lg font-serif font-bold text-volcan-night mb-4">Peticiones por Endpoint (Top 10)</h3>
                        <div className="h-80">
                          {metricasTecnicasRequestsPorEndpoint.length === 0 ? (
                            <div className="h-full flex items-center justify-center text-sm text-volcan-taupe/70">Sin datos registrados</div>
                          ) : (
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart data={metricasTecnicasRequestsPorEndpoint} layout="vertical" margin={{ top: 10, right: 30, left: 40, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#F0EBE6" />
                                <XAxis type="number" stroke="#4B5563" fontSize={12} allowDecimals={false} />
                                <YAxis type="category" dataKey="endpoint" stroke="#4B5563" fontSize={10} width={120} />
                                <Tooltip contentStyle={{ backgroundColor: '#FCFBF9', border: '1px solid #9E8B7D', borderRadius: '12px' }} />
                                <Legend />
                                <Bar dataKey="cantidad" name="Peticiones" fill="#684036" radius={[0, 4, 4, 0]} />
                              </BarChart>
                            </ResponsiveContainer>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </main>
      </div>

      {/* -------------------- DETAIL MODAL: LEAD -------------------- */}
      {viewingLead && (
        <div className="fixed inset-0 bg-volcan-night/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full border border-volcan-taupe/20 shadow-2xl p-6 relative">
            <button
              onClick={() => setViewingLead(null)}
              className="absolute top-4 right-4 text-volcan-taupe hover:text-volcan-night p-1 rounded-lg hover:bg-volcan-cream transition-colors"
            >
              <X size={20} />
            </button>
            <h3 className="text-xl font-serif font-bold text-volcan-night mb-4">Detalle de Lead</h3>
            
            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4 bg-volcan-cream p-4 rounded-xl">
                <div>
                  <span className="block text-xs font-semibold text-volcan-taupe uppercase">Nombre:</span>
                  <span className="font-bold text-volcan-night text-base">{viewingLead.nombre}</span>
                </div>
                <div>
                  <span className="block text-xs font-semibold text-volcan-taupe uppercase">Negocio / Marca:</span>
                  <span className="font-bold text-volcan-night text-base">{viewingLead.negocio || 'No especifica'}</span>
                </div>
                <div>
                  <span className="block text-xs font-semibold text-volcan-taupe uppercase">Email:</span>
                  <a href={`mailto:${viewingLead.email}`} className="text-volcan-ember hover:underline font-medium">{viewingLead.email}</a>
                </div>
                <div>
                  <span className="block text-xs font-semibold text-volcan-taupe uppercase">Teléfono:</span>
                  {viewingLead.telefono ? (
                    <a href={`tel:${viewingLead.telefono}`} className="text-volcan-night font-medium hover:underline">{viewingLead.telefono}</a>
                  ) : <span className="text-volcan-taupe/70">No especifica</span>}
                </div>
                <div>
                  <span className="block text-xs font-semibold text-volcan-taupe uppercase">Plan de Interés:</span>
                  <span className="bg-volcan-taupe/15 text-volcan-night px-2 py-0.5 rounded font-medium text-xs">
                    {viewingLead.plan_interes || 'General'}
                  </span>
                </div>
                <div>
                  <span className="block text-xs font-semibold text-volcan-taupe uppercase">Fecha de Envío:</span>
                  <span className="font-medium text-volcan-night">{new Date(viewingLead.created_at).toLocaleString()}</span>
                </div>
              </div>

              <div>
                <span className="block text-xs font-semibold text-volcan-taupe uppercase mb-2">Mensaje del Cliente:</span>
                <div className="bg-volcan-cream/40 border border-volcan-taupe/20 p-4 rounded-xl whitespace-pre-wrap leading-relaxed text-volcan-night/90">
                  {viewingLead.mensaje}
                </div>
              </div>

              <div className="pt-4 border-t border-volcan-taupe/20 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-volcan-taupe">ESTADO ACTUAL:</span>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold capitalize ${
                    viewingLead.estado === 'nuevo' ? 'bg-blue-100 text-blue-800' :
                    viewingLead.estado === 'en_proceso' ? 'bg-amber-100 text-amber-800' :
                    viewingLead.estado === 'contactado' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {viewingLead.estado}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => { handleStatusChange(viewingLead.id, 'en_proceso'); }}
                    className="px-3 py-1.5 bg-amber-50 text-amber-700 hover:bg-amber-100 text-xs font-semibold rounded-lg border border-amber-200 transition-colors"
                  >
                    Marcar En Proceso
                  </button>
                  <button 
                    onClick={() => { handleStatusChange(viewingLead.id, 'contactado'); }}
                    className="px-3 py-1.5 bg-green-50 text-green-700 hover:bg-green-100 text-xs font-semibold rounded-lg border border-green-200 transition-colors"
                  >
                    Marcar Contactado
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* -------------------- MODAL: CLIENTE FORM -------------------- */}
      {showClienteModal && (
        <div className="fixed inset-0 bg-volcan-night/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleSaveCliente} className="bg-white rounded-2xl max-w-lg w-full border border-volcan-taupe/20 shadow-2xl p-6 relative">
            <button
              type="button"
              onClick={() => setShowClienteModal(false)}
              className="absolute top-4 right-4 text-volcan-taupe hover:text-volcan-night p-1 rounded-lg hover:bg-volcan-cream transition-colors"
            >
              <X size={20} />
            </button>
            <h3 className="text-xl font-serif font-bold text-volcan-night mb-4">
              {editingCliente ? 'Editar Cliente' : 'Agregar Cliente'}
            </h3>

            <div className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-bold text-volcan-taupe uppercase mb-1">Nombre Comercial *</label>
                <input 
                  type="text" 
                  required
                  value={clienteForm.nombre}
                  onChange={(e) => setClienteForm(prev => ({ ...prev, nombre: e.target.value }))}
                  className="w-full border border-volcan-taupe/20 bg-white rounded-xl p-3 focus:ring-2 focus:ring-volcan-ember focus:outline-none"
                  placeholder="Ej: Alma Flora"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-volcan-taupe uppercase mb-1">Rubro</label>
                  <input 
                    type="text" 
                    value={clienteForm.rubro}
                    onChange={(e) => setClienteForm(prev => ({ ...prev, rubro: e.target.value }))}
                    className="w-full border border-volcan-taupe/20 bg-white rounded-xl p-3 focus:ring-2 focus:ring-volcan-ember focus:outline-none"
                    placeholder="Ej: Gastronomía"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-volcan-taupe uppercase mb-1">Resultado Destacado</label>
                  <input 
                    type="text" 
                    value={clienteForm.resultado_destacado}
                    onChange={(e) => setClienteForm(prev => ({ ...prev, resultado_destacado: e.target.value }))}
                    className="w-full border border-volcan-taupe/20 bg-white rounded-xl p-3 focus:ring-2 focus:ring-volcan-ember focus:outline-none"
                    placeholder="Ej: +45% ventas"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-volcan-taupe uppercase mb-1">Sitio Web / URL enlace</label>
                <input 
                  type="url" 
                  value={clienteForm.sitio_url}
                  onChange={(e) => setClienteForm(prev => ({ ...prev, sitio_url: e.target.value }))}
                  className="w-full border border-volcan-taupe/20 bg-white rounded-xl p-3 focus:ring-2 focus:ring-volcan-ember focus:outline-none"
                  placeholder="https://ejemplo.com"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-volcan-taupe uppercase mb-1">Logo del Cliente (JPG/PNG/WEBP, máx 5MB)</label>
                <div className="mt-1 flex items-center gap-4 p-3 border border-dashed border-volcan-taupe/20 rounded-xl bg-volcan-cream/30">
                  <div className="w-16 h-16 rounded-xl bg-white border border-volcan-taupe/20 flex items-center justify-center overflow-hidden shrink-0">
                    {clientePreview ? (
                      <img src={clientePreview} alt="Preview" className="w-full h-full object-contain p-1" />
                    ) : clienteImageUrl ? (
                      <img src={clienteImageUrl} alt="Current" className="w-full h-full object-contain p-1" />
                    ) : (
                      <span className="text-volcan-taupe/40 font-bold text-2xl">?</span>
                    )}
                  </div>
                  <div className="flex-grow">
                    <input 
                      type="file" 
                      accept="image/png, image/jpeg, image/webp"
                      onChange={handleClienteFileChange}
                      className="block w-full text-xs text-volcan-night file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-volcan-ember/15 file:text-volcan-ember hover:file:bg-volcan-ember/25 cursor-pointer"
                    />
                    <p className="mt-1 text-[10px] text-volcan-taupe">
                      {clienteFile ? `Archivo seleccionado: ${clienteFile.name} (${(clienteFile.size / 1024).toFixed(1)} KB)` : 'Seleccioná un archivo para cargar/reemplazar'}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-volcan-taupe uppercase mb-1">Testimonio (Reseña)</label>
                <textarea 
                  value={clienteForm.testimonio}
                  onChange={(e) => setClienteForm(prev => ({ ...prev, testimonio: e.target.value }))}
                  className="w-full border border-volcan-taupe/20 bg-white rounded-xl p-3 focus:ring-2 focus:ring-volcan-ember focus:outline-none h-20 resize-none"
                  placeholder="Texto del testimonio..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4 items-center">
                <div>
                  <label className="block text-xs font-bold text-volcan-taupe uppercase mb-1">Orden de Visualización</label>
                  <input 
                    type="number" 
                    value={clienteForm.orden}
                    onChange={(e) => setClienteForm(prev => ({ ...prev, orden: parseInt(e.target.value) || 0 }))}
                    className="w-full border border-volcan-taupe/20 bg-white rounded-xl p-3 focus:ring-2 focus:ring-volcan-ember focus:outline-none"
                  />
                </div>
                <div className="flex items-center gap-2 pt-4">
                  <input 
                    type="checkbox" 
                    id="activo"
                    checked={clienteForm.activo}
                    onChange={(e) => setClienteForm(prev => ({ ...prev, activo: e.target.checked }))}
                    className="rounded border-volcan-taupe/20 text-volcan-ember focus:ring-volcan-ember h-4 w-4"
                  />
                  <label htmlFor="activo" className="text-xs font-bold text-volcan-taupe uppercase select-none">Cliente Activo</label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-volcan-taupe uppercase mb-1">Color Primario (Marca)</label>
                  <div className="flex items-center gap-2">
                    <input 
                      type="color" 
                      value={clienteForm.color_primario || '#D3A784'}
                      onChange={(e) => setClienteForm(prev => ({ ...prev, color_primario: e.target.value }))}
                      className="w-10 h-10 border border-volcan-taupe/20 rounded-xl cursor-pointer p-1 bg-white shrink-0"
                    />
                    <input 
                      type="text" 
                      value={clienteForm.color_primario}
                      onChange={(e) => setClienteForm(prev => ({ ...prev, color_primario: e.target.value }))}
                      placeholder="Ej: #D3A784"
                      className="flex-grow border border-volcan-taupe/20 bg-white rounded-xl p-2.5 focus:ring-2 focus:ring-volcan-ember focus:outline-none text-xs font-mono"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-volcan-taupe uppercase mb-1">Color Secundario (Acento)</label>
                  <div className="flex items-center gap-2">
                    <input 
                      type="color" 
                      value={clienteForm.color_secundario || '#684036'}
                      onChange={(e) => setClienteForm(prev => ({ ...prev, color_secundario: e.target.value }))}
                      className="w-10 h-10 border border-volcan-taupe/20 rounded-xl cursor-pointer p-1 bg-white shrink-0"
                    />
                    <input 
                      type="text" 
                      value={clienteForm.color_secundario}
                      onChange={(e) => setClienteForm(prev => ({ ...prev, color_secundario: e.target.value }))}
                      placeholder="Opcional"
                      className="flex-grow border border-volcan-taupe/20 bg-white rounded-xl p-2.5 focus:ring-2 focus:ring-volcan-ember focus:outline-none text-xs font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-volcan-taupe/20 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowClienteModal(false)}
                  className="px-5 py-2.5 border border-volcan-taupe/20 text-volcan-night hover:bg-volcan-cream rounded-xl text-sm font-semibold transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 btn-gradient-whatsapp text-white rounded-xl text-sm font-bold shadow transition-all flex items-center gap-1.5"
                >
                  <Save size={16} />
                  Guardar
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* -------------------- MODAL: PLAN FORM -------------------- */}
      {showPlanModal && (
        <div className="fixed inset-0 bg-volcan-night/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleSavePlan} className="bg-white rounded-2xl max-w-xl w-full border border-volcan-taupe/20 shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setShowPlanModal(false)}
              className="absolute top-4 right-4 text-volcan-taupe hover:text-volcan-night p-1 rounded-lg hover:bg-volcan-cream transition-colors"
            >
              <X size={20} />
            </button>
            <h3 className="text-xl font-serif font-bold text-volcan-night mb-4">
              {editingPlan ? 'Editar Plan' : 'Agregar Plan'}
            </h3>

            <div className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-bold text-volcan-taupe uppercase mb-1">Nombre del Plan *</label>
                <input 
                  type="text" 
                  required
                  value={planForm.nombre}
                  onChange={(e) => setPlanForm(prev => ({ ...prev, nombre: e.target.value }))}
                  className="w-full border border-volcan-taupe/20 bg-white rounded-xl p-3 focus:ring-2 focus:ring-volcan-ember focus:outline-none"
                  placeholder="Ej: Plan Growth"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-volcan-taupe uppercase mb-1">Precio Regular (ARS)</label>
                  <input 
                    type="number" 
                    value={planForm.precio_regular}
                    onChange={(e) => setPlanForm(prev => ({ ...prev, precio_regular: parseInt(e.target.value) || 0 }))}
                    className="w-full border border-volcan-taupe/20 bg-white rounded-xl p-3 focus:ring-2 focus:ring-volcan-ember focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-volcan-taupe uppercase mb-1">Precio Promo (ARS)</label>
                  <input 
                    type="number" 
                    value={planForm.precio_promo}
                    onChange={(e) => setPlanForm(prev => ({ ...prev, precio_promo: parseInt(e.target.value) || 0 }))}
                    className="w-full border border-volcan-taupe/20 bg-white rounded-xl p-3 focus:ring-2 focus:ring-volcan-ember focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-volcan-taupe uppercase mb-1">Duración Promo (Meses)</label>
                  <input 
                    type="number" 
                    value={planForm.duracion_promo_meses}
                    onChange={(e) => setPlanForm(prev => ({ ...prev, duracion_promo_meses: parseInt(e.target.value) || 0 }))}
                    className="w-full border border-volcan-taupe/20 bg-white rounded-xl p-3 focus:ring-2 focus:ring-volcan-ember focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-volcan-taupe uppercase mb-1">Descripción Breve</label>
                <textarea 
                  value={planForm.descripcion}
                  onChange={(e) => setPlanForm(prev => ({ ...prev, descripcion: e.target.value }))}
                  className="w-full border border-volcan-taupe/20 bg-white rounded-xl p-3 focus:ring-2 focus:ring-volcan-ember focus:outline-none h-16 resize-none"
                  placeholder="Texto descriptivo para la landing..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-volcan-taupe uppercase mb-1">Qué Incluye (1 por línea)</label>
                  <textarea 
                    value={planForm.incluyeRaw}
                    onChange={(e) => setPlanForm(prev => ({ ...prev, incluyeRaw: e.target.value }))}
                    className="w-full border border-volcan-taupe/20 bg-white rounded-xl p-3 focus:ring-2 focus:ring-volcan-ember focus:outline-none h-32"
                    placeholder="Diagnóstico inicial&#10;Google Analytics 4&#10;Soporte 24/7"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-volcan-taupe uppercase mb-1">Qué NO Incluye (1 por línea)</label>
                  <textarea 
                    value={planForm.no_incluyeRaw}
                    onChange={(e) => setPlanForm(prev => ({ ...prev, no_incluyeRaw: e.target.value }))}
                    className="w-full border border-volcan-taupe/20 bg-white rounded-xl p-3 focus:ring-2 focus:ring-volcan-ember focus:outline-none h-32"
                    placeholder="Inversión publicitaria&#10;Filmación en locación"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-volcan-taupe uppercase mb-1">Orden del Plan (Posición)</label>
                <input 
                  type="number" 
                  value={planForm.orden}
                  onChange={(e) => setPlanForm(prev => ({ ...prev, orden: parseInt(e.target.value) || 0 }))}
                  className="w-full border border-volcan-taupe/20 bg-white rounded-xl p-3 focus:ring-2 focus:ring-volcan-ember focus:outline-none"
                />
              </div>

              <div className="pt-4 border-t border-volcan-taupe/20 flex justify-end gap-2 bg-white">
                <button
                  type="button"
                  onClick={() => setShowPlanModal(false)}
                  className="px-5 py-2.5 border border-volcan-taupe/20 text-volcan-night hover:bg-volcan-cream rounded-xl text-sm font-semibold transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 btn-gradient-whatsapp text-white rounded-xl text-sm font-bold shadow transition-all flex items-center gap-1.5"
                >
                  <Save size={16} />
                  Guardar
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* -------------------- MODAL: EQUIPO FORM -------------------- */}
      {showMemberModal && (
        <div className="fixed inset-0 bg-volcan-night/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleSaveMember} className="bg-white rounded-2xl max-w-lg w-full border border-volcan-taupe/20 shadow-2xl p-6 relative">
            <button
              type="button"
              onClick={() => setShowMemberModal(false)}
              className="absolute top-4 right-4 text-volcan-taupe hover:text-volcan-night p-1 rounded-lg hover:bg-volcan-cream transition-colors"
            >
              <X size={20} />
            </button>
            <h3 className="text-xl font-serif font-bold text-volcan-night mb-4">
              {editingMember ? 'Editar Integrante' : 'Agregar Integrante'}
            </h3>

            <div className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-bold text-volcan-taupe uppercase mb-1">Nombre Completo *</label>
                <input 
                  type="text" 
                  required
                  value={memberForm.nombre}
                  onChange={(e) => setMemberForm(prev => ({ ...prev, nombre: e.target.value }))}
                  className="w-full border border-volcan-taupe/20 bg-white rounded-xl p-3 focus:ring-2 focus:ring-volcan-ember focus:outline-none"
                  placeholder="Ej: Pablo"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-volcan-taupe uppercase mb-1">Rol / Especialidad *</label>
                <input 
                  type="text" 
                  required
                  value={memberForm.rol}
                  onChange={(e) => setMemberForm(prev => ({ ...prev, rol: e.target.value }))}
                  className="w-full border border-volcan-taupe/20 bg-white rounded-xl p-3 focus:ring-2 focus:ring-volcan-ember focus:outline-none"
                  placeholder="Ej: Especialista Meta Ads, WP"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-volcan-taupe uppercase mb-1">Foto del Integrante (JPG/PNG/WEBP, máx 5MB)</label>
                <div className="mt-1 flex items-center gap-4 p-3 border border-dashed border-volcan-taupe/20 rounded-xl bg-volcan-cream/30">
                  <div className="w-16 h-16 rounded-xl bg-white border border-volcan-taupe/20 flex items-center justify-center overflow-hidden shrink-0">
                    {memberPreview ? (
                      <img src={memberPreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : memberImageUrl ? (
                      <img src={memberImageUrl} alt="Current" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-volcan-taupe/40 font-bold text-2xl">?</span>
                    )}
                  </div>
                  <div className="flex-grow">
                    <input 
                      type="file" 
                      accept="image/png, image/jpeg, image/webp"
                      onChange={handleMemberFileChange}
                      className="block w-full text-xs text-volcan-night file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-volcan-ember/15 file:text-volcan-ember hover:file:bg-volcan-ember/25 cursor-pointer"
                    />
                    <p className="mt-1 text-[10px] text-volcan-taupe">
                      {memberFile ? `Archivo seleccionado: ${memberFile.name} (${(memberFile.size / 1024).toFixed(1)} KB)` : 'Seleccioná un archivo para cargar/reemplazar'}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-volcan-taupe uppercase mb-1">Orden de Visualización</label>
                <input 
                  type="number" 
                  value={memberForm.orden}
                  onChange={(e) => setMemberForm(prev => ({ ...prev, orden: parseInt(e.target.value) || 0 }))}
                  className="w-full border border-volcan-taupe/20 bg-white rounded-xl p-3 focus:ring-2 focus:ring-volcan-ember focus:outline-none"
                />
              </div>

              <div className="pt-4 border-t border-volcan-taupe/20 flex justify-end gap-2 bg-white">
                <button
                  type="button"
                  onClick={() => setShowMemberModal(false)}
                  className="px-5 py-2.5 border border-volcan-taupe/20 text-volcan-night hover:bg-volcan-cream rounded-xl text-sm font-semibold transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 btn-gradient-whatsapp text-white rounded-xl text-sm font-bold shadow transition-all flex items-center gap-1.5"
                >
                  <Save size={16} />
                  Guardar
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
