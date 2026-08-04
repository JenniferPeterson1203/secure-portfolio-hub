
// This modal overlay receives the selected 'project' object and a 'onClose' callback function.
// When 'project' is null, the component returns null and renders nothing on screen.
function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div className="animate-fade-in" style={{
        backgroundColor: 'var(--panel-bg)',
        border: '1px solid var(--cyber-blue)',
        borderRadius: '6px',
        maxWidth: '650px',
        width: '100%',
        maxHeight: '85vh',
        overflowY: 'auto',
        padding: '25px',
        boxShadow: '0 0 25px rgba(88, 166, 255, 0.25)',
        fontFamily: 'monospace'
      }}>
        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--terminal-green)' }}>[SYSTEM_ARCHITECTURE_INSPECTOR]</span>
            <h2 style={{ color: 'var(--cyber-blue)', margin: '5px 0 0 0', fontSize: '1.4rem' }}>{project.title}</h2>
          </div>
          <button 
            onClick={onClose}
            style={{
              backgroundColor: 'transparent',
              border: '1px solid var(--border-color)',
              color: '#ff5f56',
              borderRadius: '4px',
              padding: '4px 10px',
              cursor: 'pointer',
              fontFamily: 'inherit'
            }}
          >
            [close_x]
          </button>
        </div>

        <p style={{ color: 'var(--text-main)', fontSize: '0.9rem', lineHeight: '1.5' }}>{project.description}</p>

{/* Security Architecture Highlights */}
<div style={{ marginTop: '20px', borderTop: '1px solid var(--border-color)', paddingTop: '15px' }}>
  <h4 style={{ color: 'var(--terminal-green)', marginTop: 0 }}>🔒 Security Engineering & Core Architecture</h4>
  
  <ul style={{ paddingLeft: '20px', fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
    {project.securitySpecs && project.securitySpecs.length > 0 ? (
      project.securitySpecs.map((spec, index) => (
        <li key={index} style={{ marginBottom: '6px' }}>{spec}</li>
      ))
    ) : (
      <li>Standard secure application architecture implemented following modern web security practices.</li>
    )}
  </ul>
</div>

        {/* Tech Stack Breakdown Tags */}
        <div style={{ marginTop: '20px' }}>
          <h4 style={{ color: 'var(--cyber-blue)', marginBottom: '8px' }}>🛠 Tech Stack Implementations</h4>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {project.tech.map((t, idx) => (
              <span key={idx} style={{
                fontSize: '0.75rem',
                border: '1px solid var(--cyber-blue)',
                color: 'var(--cyber-blue)',
                padding: '3px 8px',
                borderRadius: '3px',
                backgroundColor: 'rgba(88, 166, 255, 0.08)'
              }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Action Links */}
        <div style={{ marginTop: '25px', display: 'flex', gap: '15px', justifyContent: 'flex-end', borderTop: '1px solid var(--border-color)', paddingTop: '15px' }}>
          {project.frontendRepo && (
            <a href={project.frontendRepo} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--terminal-green)', fontSize: '0.85rem', textDecoration: 'underline' }}>
              [view_repository 📁]
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--cyber-blue)', fontSize: '0.85rem', textDecoration: 'underline' }}>
              [launch_demo 🔗]
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectModal;