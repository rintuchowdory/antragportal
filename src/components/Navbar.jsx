import { FileText, LogOut, LayoutDashboard, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useApp } from '../context/AppContext';
import './Navbar.css';

export default function Navbar() {
  const { user, logout, setPage, page } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="navbar-logo" onClick={() => setPage(user ? 'dashboard' : 'landing')}>
          <div className="logo-icon">
            <span>🏛️</span>
          </div>
          <div>
            <div className="logo-title">AntragPortal</div>
            <div className="logo-sub">Digitale Behördenanträge</div>
          </div>
        </div>

        <div className={`navbar-links ${mobileOpen ? 'open' : ''}`}>
          <button className="btn-ghost" onClick={() => { setPage('landing'); setMobileOpen(false); }}>Startseite</button>
          <button className="btn-ghost" onClick={() => { setPage('landing'); setMobileOpen(false); }}>Hilfe & FAQ</button>
          {user ? (
            <>
              <button className="btn-ghost nav-user-btn" onClick={() => { setPage('dashboard'); setMobileOpen(false); }}>
                <LayoutDashboard size={16} /> Mein Bereich
              </button>
              <button className="btn-ghost" onClick={logout}>
                <LogOut size={16} /> Abmelden
              </button>
            </>
          ) : (
            <>
              <button className="btn-ghost" onClick={() => { setPage('login'); setMobileOpen(false); }}>Anmelden</button>
              <button className="btn-primary" onClick={() => { setPage('register'); setMobileOpen(false); }}>
                Registrieren
              </button>
            </>
          )}
        </div>

        <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </nav>
  );
}
