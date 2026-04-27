import { Plus, Clock, CheckCircle, FileText, ChevronRight, Bell } from 'lucide-react';
import { useApp } from '../context/AppContext';
import './Dashboard.css';

const MOCK_ANTRAEGE = [
  { id: 1, type: 'Wohngeld – Erstantrag', date: '14. April 2025', status: 'eingereicht', icon: '🏠', ref: 'WG-2025-00147' },
  { id: 2, type: 'Kindergeld – Erstantrag', date: '02. März 2025', status: 'bearbeitung', icon: '👶', ref: 'KG-2025-00038' },
  { id: 3, type: 'BAföG – Weiterleistung', date: '20. Jan 2025', status: 'abgeschlossen', icon: '🎓', ref: 'BF-2025-00012' },
];

const ANTRAEGE_QUICK = [
  { id: 'wohngeld', icon: '🏠', label: 'Wohngeld' },
  { id: 'kindergeld', icon: '👶', label: 'Kindergeld' },
  { id: 'bafog', icon: '🎓', label: 'BAföG' },
  { id: 'elterngeld', icon: '👨‍👩‍👧', label: 'Elterngeld' },
];

const statusConfig = {
  eingereicht: { label: 'Eingereicht', color: 'status-blue', icon: <Clock size={14} /> },
  bearbeitung: { label: 'In Bearbeitung', color: 'status-amber', icon: <Clock size={14} /> },
  abgeschlossen: { label: 'Abgeschlossen', color: 'status-green', icon: <CheckCircle size={14} /> },
};

export default function Dashboard() {
  const { user, startWizard, setPage } = useApp();

  return (
    <div className="dashboard">
      <div className="dash-inner">
        {/* Header */}
        <div className="dash-header animate-up">
          <div>
            <h1 className="dash-title">Guten Tag, {user?.name} 👋</h1>
            <p className="dash-sub">Verwalten Sie Ihre Anträge und stellen Sie neue Anträge ein.</p>
          </div>
          <button className="btn-primary" onClick={() => setPage('landing')}>
            <Plus size={18} /> Neuer Antrag
          </button>
        </div>

        {/* Stats */}
        <div className="stats-row animate-up" style={{ animationDelay: '0.1s' }}>
          <div className="stat-card">
            <div className="stat-icon blue"><FileText size={22} /></div>
            <div><div className="stat-val">3</div><div className="stat-label">Anträge gesamt</div></div>
          </div>
          <div className="stat-card">
            <div className="stat-icon amber"><Clock size={22} /></div>
            <div><div className="stat-val">1</div><div className="stat-label">In Bearbeitung</div></div>
          </div>
          <div className="stat-card">
            <div className="stat-icon green"><CheckCircle size={22} /></div>
            <div><div className="stat-val">1</div><div className="stat-label">Abgeschlossen</div></div>
          </div>
          <div className="stat-card">
            <div className="stat-icon purple"><Bell size={22} /></div>
            <div><div className="stat-val">0</div><div className="stat-label">Benachrichtigungen</div></div>
          </div>
        </div>

        <div className="dash-grid">
          {/* Recent Anträge */}
          <div className="animate-up" style={{ animationDelay: '0.2s' }}>
            <div className="section-head">
              <h2>Meine Anträge</h2>
              <button className="btn-ghost small">Alle anzeigen <ChevronRight size={14} /></button>
            </div>
            <div className="antraege-list">
              {MOCK_ANTRAEGE.map(a => {
                const s = statusConfig[a.status];
                return (
                  <div key={a.id} className="antrag-row card">
                    <div className="antrag-row-icon">{a.icon}</div>
                    <div className="antrag-row-info">
                      <div className="antrag-row-title">{a.type}</div>
                      <div className="antrag-row-meta">
                        <span>Ref: {a.ref}</span>
                        <span>·</span>
                        <span>{a.date}</span>
                      </div>
                    </div>
                    <div className={`status-pill ${s.color}`}>
                      {s.icon} {s.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick actions */}
          <div className="animate-up" style={{ animationDelay: '0.3s' }}>
            <div className="section-head">
              <h2>Schnellstart</h2>
            </div>
            <div className="quick-grid">
              {ANTRAEGE_QUICK.map(a => (
                <div key={a.id} className="quick-card" onClick={() => startWizard(a)}>
                  <span className="quick-icon">{a.icon}</span>
                  <span>{a.label}</span>
                  <ChevronRight size={14} className="quick-arrow" />
                </div>
              ))}
            </div>

            <div className="info-banner">
              <div className="info-icon">💡</div>
              <div>
                <div className="info-title">Tipp: Dokumente bereithalten</div>
                <div className="info-text">Bereiten Sie Einkommensnachweise und Ihren Personalausweis vor – das beschleunigt den Prozess.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
