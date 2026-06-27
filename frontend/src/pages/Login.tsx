import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../lib/api';
import { Flame, Eye, EyeOff, AlertCircle, Loader2 } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // If already authenticated, redirect to admin
  useEffect(() => {
    if (localStorage.getItem('volcan_admin_auth') === 'true') {
      navigate('/admin');
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Completá todos los campos.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const data = await loginUser(email, password);
      localStorage.setItem('volcan_auth_token', data.token);
      localStorage.setItem('volcan_auth_user', data.email);
      localStorage.setItem('volcan_auth_role', data.rol);
      localStorage.setItem('volcan_auth_nombre', data.nombre || '');
      localStorage.setItem('volcan_admin_auth', 'true');
      navigate('/admin');
    } catch (err: any) {
      const detail = err.response?.data?.detail;
      if (detail) {
        setError(detail);
      } else {
        setError('No se pudo conectar con el servidor. Intentá de nuevo.');
      }
    } finally {
      setLoading(false);
    }
  };

  const isPending = error.includes('pendiente');
  const isRejected = error.includes('rechazado');
  const isTooMany = error.includes('Demasiados');

  return (
    <div style={styles.page}>
      {/* Animated background orbs */}
      <div style={{ ...styles.orb, ...styles.orb1 }} />
      <div style={{ ...styles.orb, ...styles.orb2 }} />
      <div style={{ ...styles.orb, ...styles.orb3 }} />

      <div style={styles.card}>
        {/* Logo / Brand */}
        <div style={styles.brandRow}>
          <div style={styles.logoCircle}>
            <Flame size={28} color="#ff6b2b" />
          </div>
          <div>
            <div style={styles.brandName}>Volcán Digital</div>
            <div style={styles.brandSub}>Panel de Administración</div>
          </div>
        </div>

        <h1 style={styles.title}>Iniciar sesión</h1>
        <p style={styles.subtitle}>
          ¿No tenés cuenta?{' '}
          <Link to="/register" style={styles.link}>
            Registrate
          </Link>
        </p>

        <form onSubmit={handleSubmit} style={styles.form} autoComplete="off">
          {/* Email */}
          <div style={styles.fieldGroup}>
            <label style={styles.label} htmlFor="login-email">
              Email
            </label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              style={styles.input}
              disabled={loading}
              autoComplete="username"
            />
          </div>

          {/* Password */}
          <div style={styles.fieldGroup}>
            <label style={styles.label} htmlFor="login-password">
              Contraseña
            </label>
            <div style={styles.passwordWrapper}>
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{ ...styles.input, paddingRight: '48px' }}
                disabled={loading}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                style={styles.eyeBtn}
                tabIndex={-1}
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div
              style={{
                ...styles.alert,
                ...(isPending
                  ? styles.alertWarning
                  : isRejected || isTooMany
                  ? styles.alertDanger
                  : styles.alertError),
              }}
            >
              <AlertCircle size={16} style={{ flexShrink: 0 }} />
              <span>{error}</span>
            </div>
          )}

          <button
            id="login-submit-btn"
            type="submit"
            disabled={loading}
            style={{ ...styles.submitBtn, ...(loading ? styles.submitBtnDisabled : {}) }}
          >
            {loading ? (
              <>
                <Loader2 size={18} style={styles.spinner} />
                Iniciando sesión…
              </>
            ) : (
              'Ingresar'
            )}
          </button>
        </form>

        <p style={styles.footer}>
          © {new Date().getFullYear()} Volcán Digital · Todos los derechos reservados
        </p>
      </div>
    </div>
  );
}

// ─── Inline Styles ────────────────────────────────────────────────────────────

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0d0d0f 0%, #111317 50%, #0a0c10 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    position: 'relative',
    overflow: 'hidden',
  },
  orb: {
    position: 'absolute',
    borderRadius: '50%',
    filter: 'blur(80px)',
    opacity: 0.15,
    pointerEvents: 'none',
  },
  orb1: {
    width: '500px',
    height: '500px',
    background: 'radial-gradient(circle, #ff6b2b, transparent)',
    top: '-150px',
    right: '-100px',
  },
  orb2: {
    width: '400px',
    height: '400px',
    background: 'radial-gradient(circle, #ff3860, transparent)',
    bottom: '-100px',
    left: '-80px',
  },
  orb3: {
    width: '300px',
    height: '300px',
    background: 'radial-gradient(circle, #7c3aed, transparent)',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  card: {
    background: 'rgba(255,255,255,0.04)',
    backdropFilter: 'blur(24px)',
    WebkitBackdropFilter: 'blur(24px)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '20px',
    padding: '48px 40px',
    width: '100%',
    maxWidth: '420px',
    boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
    position: 'relative',
    zIndex: 1,
  },
  brandRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    marginBottom: '32px',
  },
  logoCircle: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    background: 'rgba(255,107,43,0.15)',
    border: '1px solid rgba(255,107,43,0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandName: {
    fontSize: '18px',
    fontWeight: 700,
    color: '#fff',
    letterSpacing: '-0.3px',
  },
  brandSub: {
    fontSize: '12px',
    color: 'rgba(255,255,255,0.4)',
    marginTop: '2px',
  },
  title: {
    fontSize: '26px',
    fontWeight: 700,
    color: '#fff',
    margin: '0 0 8px',
    letterSpacing: '-0.5px',
  },
  subtitle: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.45)',
    margin: '0 0 32px',
  },
  link: {
    color: '#ff6b2b',
    textDecoration: 'none',
    fontWeight: 500,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '13px',
    fontWeight: 500,
    color: 'rgba(255,255,255,0.7)',
    letterSpacing: '0.2px',
  },
  input: {
    width: '100%',
    padding: '13px 16px',
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '10px',
    color: '#fff',
    fontSize: '15px',
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
  },
  passwordWrapper: {
    position: 'relative',
  },
  eyeBtn: {
    position: 'absolute',
    right: '14px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: 'rgba(255,255,255,0.4)',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
  },
  alert: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
    padding: '12px 14px',
    borderRadius: '10px',
    fontSize: '13px',
    lineHeight: '1.5',
  },
  alertError: {
    background: 'rgba(239,68,68,0.12)',
    border: '1px solid rgba(239,68,68,0.3)',
    color: '#fca5a5',
  },
  alertWarning: {
    background: 'rgba(251,191,36,0.1)',
    border: '1px solid rgba(251,191,36,0.3)',
    color: '#fcd34d',
  },
  alertDanger: {
    background: 'rgba(239,68,68,0.15)',
    border: '1px solid rgba(239,68,68,0.4)',
    color: '#f87171',
  },
  submitBtn: {
    padding: '14px',
    background: 'linear-gradient(135deg, #ff6b2b 0%, #ff3860 100%)',
    border: 'none',
    borderRadius: '10px',
    color: '#fff',
    fontSize: '15px',
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: 'opacity 0.2s, transform 0.1s',
    marginTop: '4px',
    letterSpacing: '0.2px',
  },
  submitBtnDisabled: {
    opacity: 0.6,
    cursor: 'not-allowed',
  },
  spinner: {
    animation: 'spin 1s linear infinite',
  },
  footer: {
    textAlign: 'center' as const,
    fontSize: '11px',
    color: 'rgba(255,255,255,0.2)',
    marginTop: '32px',
    marginBottom: 0,
  },
};
