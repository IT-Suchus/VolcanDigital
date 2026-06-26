import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('volcan_auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface Plan {
  id: number;
  nombre: string;
  precio_promo: number | null;
  precio_regular: number | null;
  duracion_promo_meses: number | null;
  descripcion: string | null;
  incluye: string[] | null;
  no_incluye: string[] | null;
  orden: number;
}

export interface Cliente {
  id: number;
  nombre: string;
  sitio_url: string | null;
  rubro: string | null;
  testimonio: string | null;
  resultado_destacado: string | null;
  orden: number;
  activo: boolean;
  tiene_imagen: boolean;
  color_primario: string | null;
  color_secundario: string | null;
}

export interface Lead {
  id: number;
  nombre: string;
  email: string;
  telefono: string | null;
  negocio: string | null;
  mensaje: string;
  plan_interes: string | null;
  origen: string | null;
  estado: string;
  created_at: string;
}

export interface Integrante {
  id: number;
  nombre: string;
  rol: string;
  orden: number;
  tiene_imagen: boolean;
}

export const fetchPlanes = async (): Promise<Plan[]> => {
  const { data } = await api.get('/api/planes');
  return data;
};

export const fetchClientes = async (): Promise<Cliente[]> => {
  const { data } = await api.get('/api/clientes');
  return data;
};

export const fetchEquipo = async (): Promise<Integrante[]> => {
  const { data } = await api.get('/api/equipo');
  return data;
};

export const submitLead = async (leadData: any) => {
  const { data } = await api.post('/api/leads', leadData);
  return data;
};

// Admin Leads API
export const fetchAdminLeads = async (): Promise<Lead[]> => {
  const { data } = await api.get('/api/admin/leads');
  return data;
};

export const updateLeadStatus = async (leadId: number, estado: string): Promise<Lead> => {
  const { data } = await api.patch(`/api/admin/leads/${leadId}`, { estado });
  return data;
};

// Admin Clientes API
export const fetchAdminClientes = async (): Promise<Cliente[]> => {
  const { data } = await api.get('/api/clientes/admin');
  return data;
};

export const createCliente = async (clienteData: Omit<Cliente, 'id' | 'tiene_imagen'>): Promise<Cliente> => {
  const { data } = await api.post('/api/clientes/', clienteData);
  return data;
};

export const updateCliente = async (clienteId: number, clienteData: Partial<Omit<Cliente, 'id' | 'tiene_imagen'>>): Promise<Cliente> => {
  const { data } = await api.put(`/api/clientes/${clienteId}`, clienteData);
  return data;
};

export const deleteCliente = async (clienteId: number): Promise<void> => {
  await api.delete(`/api/clientes/${clienteId}`);
};

// Admin Planes API
export const createPlan = async (planData: Omit<Plan, 'id'>): Promise<Plan> => {
  const { data } = await api.post('/api/planes/', planData);
  return data;
};

export const updatePlan = async (planId: number, planData: Partial<Omit<Plan, 'id'>>): Promise<Plan> => {
  const { data } = await api.put(`/api/planes/${planId}`, planData);
  return data;
};

export const deletePlan = async (planId: number): Promise<void> => {
  await api.delete(`/api/planes/${planId}`);
};

// Admin Equipo API
export const createIntegrante = async (integranteData: Omit<Integrante, 'id' | 'tiene_imagen'>): Promise<Integrante> => {
  const { data } = await api.post('/api/equipo/', integranteData);
  return data;
};

export const updateIntegrante = async (memberId: number, integranteData: Partial<Omit<Integrante, 'id' | 'tiene_imagen'>>): Promise<Integrante> => {
  const { data } = await api.put(`/api/equipo/${memberId}`, integranteData);
  return data;
};

export const deleteIntegrante = async (memberId: number): Promise<void> => {
  await api.delete(`/api/equipo/${memberId}`);
};

export const uploadClienteImagen = async (clienteId: number, file: File): Promise<{ ok: boolean; id: number }> => {
  const formData = new FormData();
  formData.append('file', file);
  const { data } = await api.put(`/api/clientes/${clienteId}/imagen`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

export const uploadIntegranteImagen = async (memberId: number, file: File): Promise<{ ok: boolean; id: number }> => {
  const formData = new FormData();
  formData.append('file', file);
  const { data } = await api.put(`/api/equipo/${memberId}/imagen`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

export interface LeadsPorMes {
  mes: string;
  cantidad: number;
}

export interface LeadsPorEstado {
  estado: string;
  cantidad: number;
}

export interface LeadsPorPlan {
  plan: string;
  cantidad: number;
}

export interface ResumenMetricas {
  total_leads: number;
  tasa_conversion: number;
  clientes_activos: number;
  lead_mas_reciente: string | null;
}

export const fetchLeadsPorMes = async (): Promise<LeadsPorMes[]> => {
  const { data } = await api.get('/api/admin/metricas/leads-por-mes');
  return data;
};

export const fetchLeadsPorEstado = async (): Promise<LeadsPorEstado[]> => {
  const { data } = await api.get('/api/admin/metricas/leads-por-estado');
  return data;
};

export const fetchLeadsPorPlan = async (): Promise<LeadsPorPlan[]> => {
  const { data } = await api.get('/api/admin/metricas/leads-por-plan');
  return data;
};

export const fetchResumenMetricas = async (): Promise<ResumenMetricas> => {
  const { data } = await api.get('/api/admin/metricas/resumen');
  return data;
};

export interface MetricasTecnicasResumen {
  tiempo_respuesta_promedio: number;
  cantidad_total: number;
  tasa_error: number;
}

export interface MetricasTecnicasTiempoRespuesta {
  hora: string;
  tiempo_promedio: number;
}

export interface MetricasTecnicasRequestsPorEndpoint {
  endpoint: string;
  cantidad: number;
}

export const fetchMetricasTecnicasResumen = async (): Promise<MetricasTecnicasResumen> => {
  const { data } = await api.get('/api/admin/metricas/tecnicas/resumen');
  return data;
};

export const fetchMetricasTecnicasTiempoRespuesta = async (): Promise<MetricasTecnicasTiempoRespuesta[]> => {
  const { data } = await api.get('/api/admin/metricas/tecnicas/tiempo-respuesta');
  return data;
};

export const fetchMetricasTecnicasRequestsPorEndpoint = async (): Promise<MetricasTecnicasRequestsPorEndpoint[]> => {
  const { data } = await api.get('/api/admin/metricas/tecnicas/requests-por-endpoint');
  return data;
};

export const loginUser = async (email: string, password: string): Promise<{ token: string; email: string; rol: string }> => {
  const { data } = await api.post('/api/auth/login', { email, password });
  return data;
};

export default api;
