import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../lib/api';
import { Flame, Eye, EyeOff, AlertCircle, CheckCircle2, Loader2, Check, X } from 'lucide-react';

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
        {/* Brand */}
        <div style={styles.brandRow}>
          <div style={styles.logoCircle}>
            <Flame size={28} color="#ff6b2b" />
          </div>
          <div>
            <div style={styles.brandName}>Volcán Digital</div>
            <div style={styles.brandSub}>Solicitar acceso</div>
          </div>
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
          <AlertCircle size={15} style={{ flexShrink: 0, color: '#fbbf24' }} />
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

          {/* Confirm password */}
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
                style={{
                  ...styles.input,
                  paddingRight: '48px',
                  borderColor:
                    confirmPassword && confirmPassword !== password
                      ? 'rgba(239,68,68,0.5)'
                      : confirmPassword && confirmPassword === password
                      ? 'rgba(34,197,94,0.5)'
                      : undefined,
                }}
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

          {/* Error */}
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
                Creando cuenta…
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
    maxWidth: '440px',
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
    margin: '0 0 20px',
  },
  link: {
    color: '#ff6b2b',
    textDecoration: 'none',
    fontWeight: 500,
  },
  infoBanner: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
    padding: '12px 14px',
    borderRadius: '10px',
    background: 'rgba(251,191,36,0.08)',
    border: '1px solid rgba(251,191,36,0.2)',
    color: 'rgba(253,230,138,0.85)',
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
    borderRadius: '10px',
    fontSize: '13px',
    lineHeight: '1.5',
  },
  alertError: {
    background: 'rgba(239,68,68,0.12)',
    border: '1px solid rgba(239,68,68,0.3)',
    color: '#fca5a5',
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
    transition: 'opacity 0.2s',
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
    padding: '13px',
    background: 'linear-gradient(135deg, #ff6b2b 0%, #ff3860 100%)',
    borderRadius: '10px',
    color: '#fff',
    fontWeight: 600,
    fontSize: '15px',
    textDecoration: 'none',
    letterSpacing: '0.2px',
  },
  footer: {
    textAlign: 'center' as const,
    fontSize: '11px',
    color: 'rgba(255,255,255,0.2)',
    marginTop: '32px',
    marginBottom: 0,
  },
};
