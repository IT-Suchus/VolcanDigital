import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../lib/api';
import { Eye, EyeOff, AlertCircle, CheckCircle2, Loader2, Check, X } from 'lucide-react';
import BrandLogo from '../components/common/BrandLogo';

interface PasswordRule {
  label: string;
  test: (p: string) => boolean;
}

const PASSWORD_RULES: PasswordRule[] = [
  { label: 'Al menos 8 caracteres', test: (p) => p.length >= 8 },
  { label: 'Una letra mayúscula', test: (p) => /[A-Z]/.test(p) },
  { label: 'Un número', test: (p) => /\d/.test(p) },
];

export default function Register() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('volcan_admin_auth') === 'true') {
      navigate('/admin');
    }
  }, [navigate]);

  const rulesPass = PASSWORD_RULES.map((r) => r.test(password));
  const allRulesPass = rulesPass.every(Boolean);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!nombre.trim() || !email.trim() || !password || !confirmPassword) {
      setError('Completá todos los campos.');
      return;
    }
    if (!allRulesPass) {
      setError('La contraseña no cumple los requisitos de seguridad.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    setLoading(true);
    try {
      await registerUser(nombre.trim(), email.trim(), password);
      setSuccess(true);
    } catch (err: any) {
      const detail = err.response?.data?.detail;
      setError(detail || 'Error al registrarse. Intentá de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div style={styles.page}>
        <div style={{ ...styles.orb, ...styles.orb1 }} />
        <div style={{ ...styles.orb, ...styles.orb2 }} />
        <div style={styles.card}>
          <div style={styles.successIcon}>
            <CheckCircle2 size={48} color="#22c55e" />
          </div>
          <h1 style={{ ...styles.title, textAlign: 'center' }}>¡Registro exitoso!</h1>
          <p style={styles.successText}>
            Tu cuenta fue creada correctamente. Un{' '}
            <strong style={{ color: '#ff6b2b' }}>administrador</strong> debe aprobarla antes de que
            puedas ingresar. Te avisarán cuando esté lista.
          </p>
          <Link to="/login" style={styles.backBtn}>
            Ir al inicio de sesión
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={{ ...styles.orb, ...styles.orb1 }} />
      <div style={{ ...styles.orb, ...styles.orb2 }} />
      <div style={{ ...styles.orb, ...styles.orb3 }} />

      <div style={styles.card}>
        {/* Centered Vector Brand Logo Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <BrandLogo layout="vertical" iconSize="lg" />
        </div>

        <h1 style={styles.title}>Crear cuenta</h1>
        <p style={styles.subtitle}>
          ¿Ya tenés cuenta?{' '}
          <Link to="/login" style={styles.link}>
            Iniciá sesión
          </Link>
        </p>

        {/* Info banner */}
        <div style={styles.infoBanner}>
          <AlertCircle size={15} style={{ flexShrink: 0, color: '#D3A784' }} />
          <span>
            Tu cuenta quedará <strong>pendiente de aprobación</strong>. Un administrador debe
            habilitarla antes de que puedas ingresar.
          </span>
        </div>

        <form onSubmit={handleSubmit} style={styles.form} autoComplete="off">
          {/* Nombre */}
          <div style={styles.fieldGroup}>
            <label style={styles.label} htmlFor="reg-nombre">
              Nombre completo
            </label>
            <input
              id="reg-nombre"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Tu nombre"
              style={styles.input}
              disabled={loading}
            />
          </div>

          {/* Email */}
          <div style={styles.fieldGroup}>
            <label style={styles.label} htmlFor="reg-email">
              Email
            </label>
            <input
              id="reg-email"
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
            <label style={styles.label} htmlFor="reg-password">
              Contraseña
            </label>
            <div style={styles.passwordWrapper}>
              <input
                id="reg-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                placeholder="Mínimo 8 caracteres"
                style={{ ...styles.input, paddingRight: '48px' }}
                disabled={loading}
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                style={styles.eyeBtn}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Password strength rules */}
            {(passwordFocused || password.length > 0) && (
              <div style={styles.rulesBox}>
                {PASSWORD_RULES.map((rule, i) => (
                  <div key={i} style={styles.ruleRow}>
                    {rulesPass[i] ? (
                      <Check size={13} color="#22c55e" />
                    ) : (
                      <X size={13} color="rgba(255,255,255,0.35)" />
                    )}
                    <span
                      style={{
                        ...styles.ruleLabel,
                        color: rulesPass[i] ? '#86efac' : 'rgba(255,255,255,0.35)',
                      }}
                    >
                      {rule.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div style={styles.fieldGroup}>
            <label style={styles.label} htmlFor="reg-confirm">
              Confirmar contraseña
            </label>
            <div style={styles.passwordWrapper}>
              <input
                id="reg-confirm"
                type={showConfirm ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repetí tu contraseña"
                style={{ ...styles.input, paddingRight: '48px' }}
                disabled={loading}
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                style={styles.eyeBtn}
                tabIndex={-1}
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div style={{ ...styles.alert, ...styles.alertError }}>
              <AlertCircle size={16} style={{ flexShrink: 0 }} />
              <span>{error}</span>
            </div>
          )}

          <button
            id="register-submit-btn"
            type="submit"
            disabled={loading}
            style={{ ...styles.submitBtn, ...(loading ? styles.submitBtnDisabled : {}) }}
          >
            {loading ? (
              <>
                <Loader2 size={18} style={styles.spinner} />
                Registrando…
              </>
            ) : (
              'Solicitar acceso'
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
    background: 'radial-gradient(circle at 50% 30%, #1c1819 0%, #121011 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    position: 'relative',
    overflow: 'hidden',
  },
  orb: {
    position: 'absolute',
    borderRadius: '50%',
    filter: 'blur(100px)',
    opacity: 0.25,
    pointerEvents: 'none',
  },
  orb1: {
    width: '550px',
    height: '550px',
    background: 'radial-gradient(circle, #D3A784, transparent)',
    top: '-180px',
    right: '-120px',
  },
  orb2: {
    width: '450px',
    height: '450px',
    background: 'radial-gradient(circle, #684036, transparent)',
    bottom: '-120px',
    left: '-100px',
  },
  orb3: {
    width: '350px',
    height: '350px',
    background: 'radial-gradient(circle, rgba(211,167,132,0.4), transparent)',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  card: {
    background: 'rgba(26, 23, 24, 0.85)',
    backdropFilter: 'blur(28px)',
    WebkitBackdropFilter: 'blur(28px)',
    border: '1px solid rgba(211, 167, 132, 0.2)',
    borderRadius: '24px',
    padding: '48px 40px',
    width: '100%',
    maxWidth: '460px',
    boxShadow: '0 32px 80px rgba(0,0,0,0.65), 0 0 30px rgba(211,167,132,0.06)',
    position: 'relative',
    zIndex: 1,
  },
  title: {
    fontSize: '26px',
    fontWeight: 700,
    color: '#ffffff',
    margin: '0 0 6px',
    letterSpacing: '-0.4px',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.6)',
    margin: '0 0 20px',
    textAlign: 'center',
  },
  link: {
    color: '#D3A784',
    textDecoration: 'none',
    fontWeight: 600,
    transition: 'color 0.2s',
  },
  infoBanner: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
    padding: '12px 14px',
    borderRadius: '12px',
    background: 'rgba(211, 167, 132, 0.08)',
    border: '1px solid rgba(211, 167, 132, 0.2)',
    color: '#D3A784',
    fontSize: '13px',
    lineHeight: '1.5',
    marginBottom: '24px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '13px',
    fontWeight: 500,
    color: 'rgba(255,255,255,0.75)',
    letterSpacing: '0.2px',
  },
  input: {
    width: '100%',
    padding: '14px 18px',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '12px',
    color: '#fff',
    fontSize: '15px',
    outline: 'none',
    transition: 'all 0.2s ease',
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
    color: 'rgba(255,255,255,0.45)',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
  },
  rulesBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    padding: '10px 12px',
    background: 'rgba(255,255,255,0.04)',
    borderRadius: '8px',
    border: '1px solid rgba(255,255,255,0.07)',
  },
  ruleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '7px',
  },
  ruleLabel: {
    fontSize: '12px',
    transition: 'color 0.2s',
  },
  alert: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
    padding: '12px 14px',
    borderRadius: '12px',
    fontSize: '13px',
    lineHeight: '1.5',
  },
  alertError: {
    background: 'rgba(239,68,68,0.12)',
    border: '1px solid rgba(239,68,68,0.3)',
    color: '#fca5a5',
  },
  submitBtn: {
    padding: '15px',
    background: 'linear-gradient(135deg, #684036 0%, #D3A784 100%)',
    border: '1px solid rgba(211, 167, 132, 0.4)',
    borderRadius: '12px',
    color: '#ffffff',
    fontSize: '15px',
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: 'all 0.3s ease',
    marginTop: '6px',
    letterSpacing: '0.5px',
    boxShadow: '0 6px 20px rgba(104, 64, 54, 0.4)',
  },
  submitBtnDisabled: {
    opacity: 0.6,
    cursor: 'not-allowed',
    boxShadow: 'none',
  },
  spinner: {
    animation: 'spin 1s linear infinite',
  },
  successIcon: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  successText: {
    textAlign: 'center' as const,
    color: 'rgba(255,255,255,0.6)',
    fontSize: '15px',
    lineHeight: '1.7',
    margin: '0 0 28px',
  },
  backBtn: {
    display: 'block',
    textAlign: 'center' as const,
    padding: '14px',
    background: 'linear-gradient(135deg, #684036 0%, #D3A784 100%)',
    border: '1px solid rgba(211, 167, 132, 0.4)',
    borderRadius: '12px',
    color: '#ffffff',
    fontWeight: 600,
    fontSize: '15px',
    textDecoration: 'none',
    letterSpacing: '0.5px',
    boxShadow: '0 6px 20px rgba(104, 64, 54, 0.4)',
  },
  footer: {
    textAlign: 'center' as const,
    fontSize: '11px',
    color: 'rgba(255,255,255,0.3)',
    marginTop: '32px',
    marginBottom: 0,
  },
};
