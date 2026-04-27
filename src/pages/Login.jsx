import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';
import './Auth.css';

export default function Login() {
  const { login, setPage } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) { setError('Bitte alle Felder ausfüllen.'); return; }
    setLoading(true);
    setTimeout(() => {
      login(email);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="auth-page">
      <div className="auth-card animate-up">
        <button className="auth-back btn-ghost" onClick={() => setPage('landing')}>
          <ArrowLeft size={16} /> Zurück
        </button>

        <div className="auth-logo">🏛️</div>
        <h1 className="auth-title">Willkommen zurück</h1>
        <p className="auth-sub">Melden Sie sich an, um Ihre Anträge zu verwalten</p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">E-Mail-Adresse</label>
            <div className="input-icon-wrap">
              <Mail size={16} className="input-icon" />
              <input
                type="email"
                className="form-input input-with-icon"
                placeholder="ihre@email.de"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Passwort</label>
            <div className="input-icon-wrap">
              <Lock size={16} className="input-icon" />
              <input
                type={showPass ? 'text' : 'password'}
                className="form-input input-with-icon input-with-icon-right"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <button type="button" className="input-eye" onClick={() => setShowPass(!showPass)}>
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="auth-forgot">
            <button type="button" className="link-btn">Passwort vergessen?</button>
          </div>

          <button type="submit" className="btn-primary auth-submit" disabled={loading}>
            {loading ? <span className="loading-dot"></span> : 'Anmelden'}
          </button>
        </form>

        <div className="auth-divider"><span>oder</span></div>

        <button className="btn-secondary google-btn" onClick={() => login('demo@beispiel.de', 'Demo Nutzer')}>
          <span>🔵</span> Mit Google anmelden
        </button>

        <p className="auth-switch">
          Noch kein Konto?{' '}
          <button className="link-btn" onClick={() => setPage('register')}>Jetzt registrieren</button>
        </p>
      </div>
    </div>
  );
}
