import { ArrowRight, FileText, Upload, Send, CheckCircle, Shield, Clock, Users, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import './Landing.css';

const ANTRAEGE = [
  { id: 'wohngeld', icon: '🏠', title: 'Wohngeld', desc: 'Mietzuschuss oder Lastenzuschuss beantragen', badge: 'Beliebt' },
  { id: 'kindergeld', icon: '👶', title: 'Kindergeld', desc: 'Kindergeld erstmalig beantragen oder ändern', badge: null },
  { id: 'bafog', icon: '🎓', title: 'BAföG', desc: 'Ausbildungsförderung für Studium oder Schule', badge: null },
  { id: 'elterngeld', icon: '👨‍👩‍👧', title: 'Elterngeld', desc: 'Elterngeld nach der Geburt eines Kindes', badge: 'Neu' },
  { id: 'grundsicherung', icon: '🛡️', title: 'Grundsicherung', desc: 'Antrag auf Grundsicherung im Alter', badge: null },
  { id: 'schwerbehinderung', icon: '♿', title: 'Schwerbehinderung', desc: 'Feststellung der Schwerbehinderung', badge: null },
];

const STEPS = [
  { icon: <FileText size={28} />, num: '01', title: 'Formular ausfüllen', desc: 'Einfache Schritt-für-Schritt Anleitung durch alle benötigten Informationen' },
  { icon: <Upload size={28} />, num: '02', title: 'Dokumente hochladen', desc: 'Belege einfach fotografieren oder hochladen – optional aber empfohlen' },
  { icon: <Send size={28} />, num: '03', title: 'Automatisch versenden', desc: 'PDF wird erstellt und direkt an die zuständige Behörde gesendet' },
];

export default function Landing() {
  const { setPage, startWizard, user } = useApp();

  return (
    <div className="landing">
      {/* Hero */}
      <section className="hero">
        <div className="hero-badge">
          <span className="badge-dot"></span>
          Neu: Alle Behördenanträge digital einreichen
        </div>
        <h1 className="hero-title">
          Behördenanträge<br />
          <span className="hero-accent">einfach digital</span>
        </h1>
        <p className="hero-desc">
          Reichen Sie Ihre Anträge schnell und unkompliziert online ein.<br />
          Ohne Warteschlangen, ohne Papierkram – direkt von Ihrem Computer.
        </p>
        <div className="hero-ctas">
          <button className="btn-primary hero-btn" onClick={() => setPage(user ? 'dashboard' : 'login')}>
            Jetzt Antrag stellen <ArrowRight size={18} />
          </button>
          <button className="btn-secondary hero-btn" onClick={() => setPage('landing')}>
            Hilfe & FAQ
          </button>
        </div>
        <div className="hero-stats">
          <div className="stat"><strong>12.000+</strong><span>Anträge gestellt</span></div>
          <div className="stat-divider"></div>
          <div className="stat"><strong>98%</strong><span>Erfolgsrate</span></div>
          <div className="stat-divider"></div>
          <div className="stat"><strong>∅ 8 Min</strong><span>pro Antrag</span></div>
        </div>
      </section>

      {/* How it works */}
      <section className="section how-section">
        <div className="section-inner">
          <div className="section-label">So funktioniert's</div>
          <h2 className="section-title">In nur wenigen Minuten<br />zum fertigen Antrag</h2>
          <div className="steps-grid">
            {STEPS.map((s, i) => (
              <div className="step-card" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="step-num">{s.num}</div>
                <div className="step-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                {i < STEPS.length - 1 && <div className="step-arrow"><ChevronRight size={20} /></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Antrag types */}
      <section className="section antraege-section">
        <div className="section-inner">
          <div className="section-label">Verfügbare Anträge</div>
          <h2 className="section-title">Welchen Antrag möchten<br />Sie stellen?</h2>
          <div className="antraege-grid">
            {ANTRAEGE.map((a) => (
              <div
                key={a.id}
                className="antrag-card"
                onClick={() => user ? startWizard(a) : setPage('login')}
              >
                {a.badge && <span className={`antrag-badge ${a.badge === 'Neu' ? 'badge-new' : 'badge-pop'}`}>{a.badge}</span>}
                <div className="antrag-icon">{a.icon}</div>
                <div className="antrag-info">
                  <h3>{a.title}</h3>
                  <p>{a.desc}</p>
                </div>
                <ArrowRight size={18} className="antrag-arrow" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust section */}
      <section className="trust-section">
        <div className="section-inner">
          <div className="trust-grid">
            <div className="trust-item"><Shield size={24} /> <div><h4>Sicher & verschlüsselt</h4><p>SSL-Verschlüsselung und DSGVO-konform</p></div></div>
            <div className="trust-item"><CheckCircle size={24} /> <div><h4>Offiziell anerkannt</h4><p>Direkte Übermittlung an Behörden</p></div></div>
            <div className="trust-item"><Clock size={24} /> <div><h4>24/7 verfügbar</h4><p>Anträge jederzeit einreichen</p></div></div>
            <div className="trust-item"><Users size={24} /> <div><h4>Kostenlos nutzen</h4><p>Für alle Bürgerinnen und Bürger</p></div></div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner">
        <div className="section-inner cta-inner">
          <h2>Bereit, Ihren ersten Antrag einzureichen?</h2>
          <p>Registrieren Sie sich kostenlos und starten Sie sofort.</p>
          <button className="btn-primary cta-btn" onClick={() => setPage('register')}>
            Jetzt kostenlos registrieren <ArrowRight size={18} />
          </button>
        </div>
      </section>

      <footer className="footer">
        <div className="section-inner footer-inner">
          <div className="footer-logo">🏛️ AntragPortal</div>
          <div className="footer-links">
            <a href="#">Impressum</a>
            <a href="#">Datenschutz</a>
            <a href="#">Barrierefreiheit</a>
            <a href="#">Kontakt</a>
          </div>
          <p className="footer-copy">© 2025 AntragPortal. Alle Rechte vorbehalten.</p>
        </div>
      </footer>
    </div>
  );
}
