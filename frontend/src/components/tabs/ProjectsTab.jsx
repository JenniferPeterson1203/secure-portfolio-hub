import { resumeData } from '../../data/resumeData';

function ProjectsTab() {
  return (
    <section>
      <h1><span className="prompt">jpeterson@root:~$</span> curl -s api.github.com/users/jennifer/repos</h1>
      <p>Featured Software Engineering Implementations:</p>
      <div className="grid-layout">
        {resumeData.projects.map((project) => (
          <div 
            key={project.id}
            className="card" 
            style={{ 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              
              <div style={{ marginTop: '15px', display: 'flex', gap: '12px', fontSize: '0.85rem' }}>
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--cyber-blue)', textDecoration: 'underline' }}>
                    [live_site 🔗]
                  </a>
                )}
                {project.frontendRepo && (
                  <a href={project.frontendRepo} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--terminal-green)', textDecoration: 'underline' }}>
                    {project.backendRepo ? '[frontend_src 📁]' : '[source_code 📁]'}
                  </a>
                )}
                {project.backendRepo && (
                  <a href={project.backendRepo} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--terminal-green)', textDecoration: 'underline' }}>
                    [backend_src 📁]
                  </a>
                )}
              </div>
            </div>

            <div style={{ marginTop: '15px', display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
              {project.tech.map((t, idx) => (
                <span key={idx} style={{ fontSize: '0.75rem', border: '1px solid var(--border-color)', padding: '2px 6px', borderRadius: '3px', color: 'var(--text-muted)' }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProjectsTab;