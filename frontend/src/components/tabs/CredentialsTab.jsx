import { resumeData } from '../../data/resumeData';

function CredentialsTab() {
  return (
    <section>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
        <h1><span className="prompt">jpeterson@root:~$</span> cat security_credentials.json</h1>
        <a 
          href="/jennifer_peterson_resume.pdf" 
          download="Jennifer_Peterson_Resume.pdf"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 12px',
            border: '1px solid var(--terminal-green)',
            color: 'var(--terminal-green)',
            backgroundColor: 'rgba(39, 201, 63, 0.08)',
            borderRadius: '4px',
            textDecoration: 'none',
            fontFamily: 'monospace',
            fontSize: '0.85rem',
            transition: 'all 0.2s ease'
          }}
        >
          <span>📥 wget resume.pdf</span>
        </a>
      </div>

      <p>Verified Technical Accreditations & Training:</p>
      <div className="grid-layout">
        {resumeData.credentials.map((cert) => (
          <div key={cert.id} className="card">
            <h3>{cert.name}</h3>
            <p>{cert.issuer} ({cert.year})</p>
            <span className="status-badge" style={{ borderColor: 'rgba(88,166,255,0.3)', color: 'var(--cyber-blue)' }}>{cert.status}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CredentialsTab;