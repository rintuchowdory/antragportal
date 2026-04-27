import { CheckCircle, Download, LayoutDashboard, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import './Success.css';

export default function Success() {
  const { setPage, antragType, wizardData } = useApp();
  const ref = 'WG-2025-' + Math.floor(10000 + Math.random() * 90000);

  return (
    <div className="success-page">
      <div className="success-card animate-up">
        <div className="success-circle">
          <CheckCircle size={48} />
        </div>

        <div className="success-badge">Antrag erfolgreich eingereicht</div>

        <h1 className="success-title">Ihr Antrag ist auf dem Weg! 🎉</h1>
        <p className="success-desc">
          Ihr {antragType?.label || antragType?.title || 'Antrag'} wurde erfolgreich übermittelt und wird nun von der zuständigen Behörde geprüft.
        </p>

        <div className="success-ref-box">
          <div className="ref-label">Vorgangsnummer</div>
          <div className="ref-number">{ref}</div>
          <div className="ref-hint">Bitte notieren Sie diese Nummer für Rückfragen.</div>
        </div>

        <div className="success-timeline">
          <div className="timeline-item done">
            <div className="tl-dot"><CheckCircle size={16} /></div>
            <div>
              <div className="tl-title">Antrag eingereicht</div>
              <div className="tl-date">Heute</div>
            </div>
          </div>
          <div className="timeline-item">
            <div className="tl-dot pending">2</div>
            <div>
              <div className="tl-title">Prüfung durch Behörde</div>
              <div className="tl-date">ca. 5–10 Werktage</div>
            </div>
          </div>
          <div className="timeline-item">
            <div className="tl-dot pending">3</div>
            <div>
              <div className="tl-title">Bescheid erhalten</div>
              <div className="tl-date">Schriftlich per Post</div>
            </div>
          </div>
        </div>

        <div className="success-actions">
          <button className="btn-secondary" onClick={() => {}}>
            <Download size={16} /> PDF herunterladen
          </button>
          <button className="btn-primary" onClick={() => setPage('dashboard')}>
            <LayoutDashboard size={16} /> Zum Dashboard
          </button>
        </div>

        <button className="success-new" onClick={() => setPage('landing')}>
          Weiteren Antrag stellen <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
