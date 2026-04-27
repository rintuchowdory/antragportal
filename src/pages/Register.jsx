import { useState } from 'react';
import { Mail, Lock, User, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useApp } from '../context/AppContext';
import './Auth.css';

export default function Register() {
  const { login, setPage } = useApp();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const update = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) { setError('Bitte alle Felder ausfüllen.'); return; }
    if (form.password !== form.confirm) { setError('Passwörter stimmen nicht überein.'); return; }
    setLoading(true);
    setTimeout(() => { login(form.email, form.name); setLoading(false); }, 800);
  };

  return (
    <div className="auth-page">
      <div className="auth-card animate-up">
        <button className="auth-back btn-ghost" onClick={() => setPage('landing')}>
          <ArrowLeft size={16} /> Zurück
        </button>

        <div className="auth-logo">🏛️</div>
        <h1 className="auth-title">Konto erstellen</h1>
        <p className="auth-sub">Kostenlos registrieren und Anträge digital einreichen</p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">Vollständiger Name</label>
            <div className="input-icon-wrap">
              <User size={16} className="input-icon" />
              <input className="form-input input-with-icon" placeholder="Max Mustermann" value={form.name} onChange={e => update('name', e.target.value)} />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">E-Mail-Adresse</label>
            <div className="input-icon-wrap">
              <Mail size={16} className="input-icon" />
              <input type="email" className="form-input input-with-icon" placeholder="ihre@email.de" value={form.email} onChange={e => update('email', e.target.value)} />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Passwort</label>
            <div className="input-icon-wrap">
              <Lock size={16} className="input-icon" />
              <input type={showPass ? 'text' : 'password'} className="form-input input-with-icon input-with-icon-right" placeholder="Mind. 8 Zeichen" value={form.password} onChange={e => update('password', e.target.value)} />
              <button type="button" className="input-eye" onClick={() => setShowPass(!showPass)}>
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Passwort bestätigen</label>
            <div className="input-icon-wrap">
              <Lock size={16} className="input-icon" />
              <input type="password" className="form-input input-with-icon" placeholder="••••••••" value={form.confirm} onChange={e => update('confirm', e.target.value)} />
            </div>
          </div>

          <p className="auth-terms">
            Mit der Registrierung stimmen Sie unseren <button className="link-btn">Nutzungsbedingungen</button> und der <button className="link-btn">Datenschutzerklärung</button> zu.
          </p>

          <button type="submit" className="btn-primary auth-submit" disabled={loading}>
            {loading ? <span className="loading-dot"></span> : 'Kostenlos registrieren'}
          </button>
        </form>

        <p className="auth-switch">
          Bereits ein Konto?{' '}
          <button className="link-btn" onClick={() => setPage('login')}>Jetzt anmelden</button>
        </p>
      </div>
    </div>
  );
}
