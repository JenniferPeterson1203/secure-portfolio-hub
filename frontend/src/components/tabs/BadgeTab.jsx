import badgeAvatar from '../../assets/access-badge.png';

function BadgeTab() {
  return (
    <section style={{ textAlign: 'center', padding: '10px 0' }}>
      <h1><span className="prompt">jpeterson@root:~$</span> cat /etc/security/personnel_id.crt</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
        Verified Security Clearance & System Operator Identification Card
      </p>

      <div style={{
        display: 'inline-flex',
        gap: '20px',
        alignItems: 'center',
        border: '1px solid var(--cyber-blue)',
        borderRadius: '8px',
        padding: '20px',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        boxShadow: '0 0 20px rgba(88, 166, 255, 0.15)',
        textAlign: 'left',
        maxWidth: '520px',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        <img 
          src={badgeAvatar} 
          alt="Jennifer Peterson Access Badge" 
          style={{ width: '180px', borderRadius: '6px', border: '1px solid var(--border-color)' }} 
        />
        
        <div style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>
          <div style={{ color: 'var(--cyber-blue)', fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '8px' }}>
            JENNIFER PETERSON
          </div>
          <div style={{ color: 'var(--terminal-green)', marginBottom: '5px' }}>
            <strong>ROLE:</strong> Software & Security Eng.
          </div>
          <div style={{ color: 'var(--text-main)', marginBottom: '5px' }}>
            <strong>CLEARANCE:</strong> LEVEL_04 (FULL)
          </div>
          <div style={{ color: 'var(--text-main)', marginBottom: '5px' }}>
            <strong>ID_HASH:</strong> 0x7F89B2A
          </div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '10px' }}>
            ISSUER: CUNY LaGuardia Community College
          </div>
        </div>
      </div>
    </section>
  );
}

export default BadgeTab;