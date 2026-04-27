import { useState } from 'react';
import { ChevronLeft, ChevronRight, Check, Upload, X, FileText } from 'lucide-react';
import { useApp } from '../context/AppContext';
import './Wizard.css';

// Step components
function StepType({ data, update }) {
  const types = [
    { id: 'erstantrag', icon: '📄', title: 'Erstantrag', desc: 'Sie beantragen zum ersten Mal oder nach einer Unterbrechung.' },
    { id: 'weiterleistung', icon: '🔄', title: 'Weiterleistungsantrag', desc: 'Ihr Bewilligungszeitraum läuft bald ab und Sie möchten weiterhin Leistungen erhalten.' },
    { id: 'erhoehung', icon: '📈', title: 'Erhöhungsantrag', desc: 'Ihre Miete oder Ihr Einkommen hat sich wesentlich geändert und Sie möchten eine Anpassung.' },
  ];
  return (
    <div className="step-content">
      <h2 className="step-title">Art des Antrags wählen</h2>
      <p className="step-desc">Bitte sagen Sie uns, welche Art von Antrag Sie stellen möchten.</p>
      <div className="type-list">
        {types.map(t => (
          <div
            key={t.id}
            className={`type-option ${data.antragArt === t.id ? 'selected' : ''}`}
            onClick={() => update({ antragArt: t.id })}
          >
            <span className="type-icon-char">{t.icon}</span>
            <div>
              <div className="type-title">{t.title}</div>
              <div className="type-desc">{t.desc}</div>
            </div>
            {data.antragArt === t.id && <Check size={18} className="type-check" />}
          </div>
        ))}
      </div>
    </div>
  );
}

function StepPersonal({ data, update }) {
  const field = (k, label, type = 'text', placeholder = '') => (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <input className="form-input" type={type} placeholder={placeholder} value={data[k] || ''} onChange={e => update({ [k]: e.target.value })} />
    </div>
  );
  return (
    <div className="step-content">
      <h2 className="step-title">Persönliche Angaben</h2>
      <p className="step-desc">Bitte geben Sie Ihre persönlichen Daten ein.</p>
      <div className="form-row">
        {field('vorname', 'Vorname', 'text', 'Max')}
        {field('nachname', 'Nachname', 'text', 'Mustermann')}
      </div>
      {field('geburtsdatum', 'Geburtsdatum', 'date')}
      {field('telefon', 'Telefonnummer', 'tel', '030 12345678')}
      <div className="form-group">
        <label className="form-label">Familienstand</label>
        <select className="form-input" value={data.familienstand || ''} onChange={e => update({ familienstand: e.target.value })}>
          <option value="">Bitte wählen</option>
          <option value="ledig">Ledig</option>
          <option value="verheiratet">Verheiratet</option>
          <option value="geschieden">Geschieden</option>
          <option value="verwitwet">Verwitwet</option>
        </select>
      </div>
    </div>
  );
}

function StepAddress({ data, update }) {
  return (
    <div className="step-content">
      <h2 className="step-title">Wohnanschrift</h2>
      <p className="step-desc">Geben Sie Ihre aktuelle Wohnanschrift ein.</p>
      <div className="form-group">
        <label className="form-label">Straße und Hausnummer</label>
        <input className="form-input" placeholder="Musterstraße 1" value={data.strasse || ''} onChange={e => update({ strasse: e.target.value })} />
      </div>
      <div className="form-row">
        <div className="form-group" style={{ flex: '0 0 120px' }}>
          <label className="form-label">PLZ</label>
          <input className="form-input" placeholder="12345" value={data.plz || ''} onChange={e => update({ plz: e.target.value })} />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label className="form-label">Stadt</label>
          <input className="form-input" placeholder="Berlin" value={data.stadt || ''} onChange={e => update({ stadt: e.target.value })} />
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">Monatliche Kaltmiete (€)</label>
        <input className="form-input" type="number" placeholder="850" value={data.miete || ''} onChange={e => update({ miete: e.target.value })} />
      </div>
      <div className="form-group">
        <label className="form-label">Anzahl der im Haushalt lebenden Personen</label>
        <select className="form-input" value={data.personen || ''} onChange={e => update({ personen: e.target.value })}>
          <option value="">Bitte wählen</option>
          {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} Person{n > 1 ? 'en' : ''}</option>)}
        </select>
      </div>
    </div>
  );
}

function StepIncome({ data, update }) {
  return (
    <div className="step-content">
      <h2 className="step-title">Einkommensangaben</h2>
      <p className="step-desc">Bitte geben Sie Ihre monatlichen Einnahmen an.</p>
      {[
        ['einkommen_brutto', 'Monatliches Bruttoeinkommen (€)', '2500'],
        ['einkommen_netto', 'Monatliches Nettoeinkommen (€)', '1800'],
        ['kindergeld_betrag', 'Kindergeld (€, falls zutreffend)', '250'],
        ['sonstige_einnahmen', 'Sonstige Einnahmen (€)', '0'],
      ].map(([k, label, ph]) => (
        <div className="form-group" key={k}>
          <label className="form-label">{label}</label>
          <input className="form-input" type="number" placeholder={ph} value={data[k] || ''} onChange={e => update({ [k]: e.target.value })} />
        </div>
      ))}
      <div className="form-group">
        <label className="form-label">Art der Beschäftigung</label>
        <select className="form-input" value={data.beschaeftigung || ''} onChange={e => update({ beschaeftigung: e.target.value })}>
          <option value="">Bitte wählen</option>
          <option value="vollzeit">Vollzeit angestellt</option>
          <option value="teilzeit">Teilzeit angestellt</option>
          <option value="selbstaendig">Selbstständig</option>
          <option value="arbeitslos">Arbeitssuchend</option>
          <option value="rente">Rentner/in</option>
          <option value="student">Student/in</option>
        </select>
      </div>
    </div>
  );
}

function StepDocuments({ data, update }) {
  const [files, setFiles] = useState(data.dokumente || []);

  const addFile = (e) => {
    const newFiles = [...files, ...Array.from(e.target.files).map(f => ({ name: f.name, size: f.size, type: f.type }))];
    setFiles(newFiles);
    update({ dokumente: newFiles });
  };

  const removeFile = (i) => {
    const newFiles = files.filter((_, idx) => idx !== i);
    setFiles(newFiles);
    update({ dokumente: newFiles });
  };

  const docs = [
    { label: 'Personalausweis / Reisepass', required: true },
    { label: 'Mietvertrag', required: true },
    { label: 'Gehaltsabrechnungen (letzte 3 Monate)', required: true },
    { label: 'Kontoauszüge (letzte 3 Monate)', required: false },
    { label: 'Einkommenssteuerbescheid', required: false },
  ];

  return (
    <div className="step-content">
      <h2 className="step-title">Dokumente hochladen</h2>
      <p className="step-desc">Laden Sie die erforderlichen Nachweise hoch. Dateiformate: PDF, JPG, PNG (max. 10 MB je Datei)</p>

      <div className="doc-checklist">
        {docs.map((d, i) => (
          <div key={i} className="doc-item">
            <div className="doc-dot" style={{ background: d.required ? '#ef4444' : '#9ca3af' }}></div>
            <span>{d.label}</span>
            {d.required && <span className="doc-required">Pflicht</span>}
          </div>
        ))}
      </div>

      <label className="upload-zone">
        <Upload size={28} />
        <div className="upload-text">Dateien hier ablegen oder klicken zum Auswählen</div>
        <div className="upload-sub">PDF, JPG, PNG – max. 10 MB</div>
        <input type="file" multiple accept=".pdf,.jpg,.jpeg,.png" onChange={addFile} style={{ display: 'none' }} />
      </label>

      {files.length > 0 && (
        <div className="file-list">
          {files.map((f, i) => (
            <div key={i} className="file-item">
              <FileText size={16} />
              <span className="file-name">{f.name}</span>
              <span className="file-size">{(f.size / 1024).toFixed(1)} KB</span>
              <button className="file-remove" onClick={() => removeFile(i)}><X size={14} /></button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function StepReview({ data, antragType }) {
  const rows = [
    ['Antrag', antragType?.label || antragType?.title || '–'],
    ['Art', data.antragArt || '–'],
    ['Name', `${data.vorname || ''} ${data.nachname || ''}`.trim() || '–'],
    ['Geburtsdatum', data.geburtsdatum || '–'],
    ['Adresse', data.strasse ? `${data.strasse}, ${data.plz} ${data.stadt}` : '–'],
    ['Kaltmiete', data.miete ? `${data.miete} €/Monat` : '–'],
    ['Haushaltsgröße', data.personen ? `${data.personen} Person(en)` : '–'],
    ['Nettoeinkommen', data.einkommen_netto ? `${data.einkommen_netto} €` : '–'],
    ['Beschäftigung', data.beschaeftigung || '–'],
    ['Dokumente', data.dokumente?.length ? `${data.dokumente.length} Datei(en)` : 'Keine'],
  ];

  return (
    <div className="step-content">
      <h2 className="step-title">Zusammenfassung & Absenden</h2>
      <p className="step-desc">Prüfen Sie Ihre Angaben bevor Sie den Antrag einreichen.</p>
      <div className="review-table">
        {rows.map(([k, v]) => (
          <div key={k} className="review-row">
            <span className="review-key">{k}</span>
            <span className="review-val">{v}</span>
          </div>
        ))}
      </div>
      <div className="review-notice">
        <span>✅</span>
        <div>
          <div className="review-notice-title">Einverständniserklärung</div>
          <div className="review-notice-text">Ich bestätige, dass alle gemachten Angaben der Wahrheit entsprechen und vollständig sind. Ich bin damit einverstanden, dass meine Daten zur Bearbeitung des Antrags genutzt werden.</div>
        </div>
      </div>
    </div>
  );
}

// Main Wizard
const STEPS = [
  { label: 'Art', component: StepType },
  { label: 'Persönlich', component: StepPersonal },
  { label: 'Adresse', component: StepAddress },
  { label: 'Einkommen', component: StepIncome },
  { label: 'Dokumente', component: StepDocuments },
  { label: 'Prüfen', component: StepReview },
];

export default function Wizard() {
  const { wizardData, updateWizardData, antragType, setPage } = useApp();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const StepComp = STEPS[step].component;
  const isLast = step === STEPS.length - 1;
  const isFirst = step === 0;

  const next = () => { if (!isLast) setStep(s => s + 1); };
  const prev = () => { if (!isFirst) setStep(s => s - 1); };

  const submit = () => {
    setSubmitting(true);
    setTimeout(() => { setPage('success'); }, 1500);
  };

  return (
    <div className="wizard-page">
      <div className="wizard-container">
        {/* Progress */}
        <div className="wizard-progress-bar">
          <div className="wizard-progress-fill" style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}></div>
        </div>

        {/* Steps indicator */}
        <div className="wizard-steps-row">
          {STEPS.map((s, i) => (
            <div key={i} className={`wizard-step-dot ${i < step ? 'done' : i === step ? 'active' : ''}`}>
              {i < step ? <Check size={12} /> : <span>{i + 1}</span>}
              <div className="wizard-step-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="wizard-body animate-in" key={step}>
          <div className="wizard-antrag-type">
            <span>{antragType?.icon}</span> {antragType?.label || antragType?.title}
          </div>
          <StepComp data={wizardData} update={updateWizardData} antragType={antragType} />
        </div>

        {/* Navigation */}
        <div className="wizard-nav">
          <button className="btn-secondary" onClick={isFirst ? () => setPage('dashboard') : prev}>
            <ChevronLeft size={16} /> {isFirst ? 'Abbrechen' : 'Zurück'}
          </button>
          <div className="wizard-step-info">{step + 1} von {STEPS.length}</div>
          {isLast ? (
            <button className="btn-primary" onClick={submit} disabled={submitting}>
              {submitting ? <span className="loading-dot"></span> : <>Antrag einreichen <Check size={16} /></>}
            </button>
          ) : (
            <button className="btn-primary" onClick={next}>
              Weiter <ChevronRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
