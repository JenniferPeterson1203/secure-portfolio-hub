// frontend/src/App.jsx
import React, { useState } from 'react';
import { resumeData } from './data/resumeData';

function App() {
  // Track the active tab state. Default is 'identity'
  const [activeTab, setActiveTab] = useState('identity');

  return (
    <div className="terminal-container">
      
      {/* WINDOW HEADER[cite: 1] */}
      <div className="terminal-header">
        <div className="window-buttons">
          <div className="dot dot-red"></div>
          <div className="dot dot-yellow"></div>
          <div className="dot dot-green"></div>
        </div>
        <div className="window-title">jennifer@apache-server:~</div>
        <div></div>
      </div>

      <div className="terminal-body">
        {/* MULTI-ROLE TARGETED NAVIGATION TABS[cite: 1] */}
        <nav className="nav-tabs">
          <button 
            className={`tab-btn ${activeTab === 'identity' ? 'active' : ''}`}
            onClick={() => setActiveTab('identity')}
          >
            01_identity.sh
          </button>
          <button 
            className={`tab-btn ${activeTab === 'credentials' ? 'active' : ''}`}
            onClick={() => setActiveTab('credentials')}
          >
            02_credentials.cfg
          </button>
          <button 
            className={`tab-btn ${activeTab === 'experience' ? 'active' : ''}`}
            onClick={() => setActiveTab('experience')}
          >
            03_deployment_history.log
          </button>
          <button 
            className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            04_code_repositories.json
          </button>
          <button 
            className={`tab-btn ${activeTab === 'infrastructure' ? 'active' : ''}`}
            onClick={() => setActiveTab('infrastructure')}
          >
            05_server_infrastructure.log
          </button>
        </nav>

        {/* DYNAMIC CONTENT CONTAINER[cite: 1] */}
        <main className="animate-fade-in">
          
          {/* TAB 1: IDENTITY (General Overview)[cite: 1] */}
          {activeTab === 'identity' && (
            <section>
              <div className="status-badge">● Environment: Secure Sandbox</div>
              <h1><span className="prompt">jennifer@root:~$</span> whoami</h1>
              <p>{resumeData.identity.bio}</p>
              <p className="accent-text">📍 Based in {resumeData.identity.location}</p>
            </section>
          )}

          {/* TAB 2: CREDENTIALS (Cybersecurity / IT Support Focus) */}
          {activeTab === 'credentials' && (
            <section>
              <h1><span className="prompt">jennifer@root:~$</span> cat security_credentials.json</h1>
              <p>Verified Technical Accreditations & Training:</p>
              <div className="grid-layout">
                {resumeData.credentials.map((cert) => (
                  <div key={cert.id} className="card">
                    <h3>{cert.name}</h3>
                    <p>{cert.issuer} ({cert.year})</p>
                    <span className="status-badge" style={{ borderColor: 'rgba(88,166,255,0.3)', color: 'var(--cyber-blue)' }}>
                      {cert.status}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* TAB 3: DEPLOYMENT HISTORY (Work Experience) */}
          {activeTab === 'experience' && (
            <section>
              <h1><span className="prompt">jennifer@root:~$</span> tail -n 5 execution_history.log</h1>
              <p>System Deployment History:</p>
              {resumeData.experience.map((job) => (
                <div key={job.id} className="card" style={{ marginBottom: '15px' }}>
                  <span className="prompt">[{job.period}] {job.type}</span>
                  <h3>{job.role} @ <span className="accent-text">{job.company}</span></h3>
                  <ul style={{ paddingLeft: '20px', margin: '10px 0 0 0' }}>
                    {job.bullets.map((bullet, index) => (
                      <li key={index} style={{ marginBottom: '5px' }}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          )}

          {/* TAB 4: CODE REPOSITORIES (Software Engineering Focus) */}
          {activeTab === 'projects' && (
            <section>
              <h1><span className="prompt">jennifer@root:~$</span> curl -s api.github.com/users/jennifer/repos</h1>
              <p>Featured Software Engineering Implementations:</p>
              <div className="grid-layout">
                {resumeData.projects.map((project) => (
                  <div key={project.id} className="card">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div style={{ marginTop: '10px', display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
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
          )}

          {/* TAB 5: SYSTEMS & INFRASTRUCTURE (Tech Support / SysAdmin Focus)[cite: 1] */}
          {activeTab === 'infrastructure' && (
            <section>
              <h1><span className="prompt">jennifer@root:~$</span> netstat -an | grep listen</h1>
              <p>Demonstrated Systems Administration & Network Support Proficiency[cite: 1]:</p>
              
              <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
                    <th style={{ padding: '10px', color: 'var(--cyber-blue)' }}>Subsystem Parameter</th>
                    <th style={{ padding: '10px', color: 'var(--cyber-blue)' }}>Demonstrated Competency / Lab Environment</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '10px', color: 'var(--terminal-green)' }}>Operating Systems</td>
                    <td style={{ padding: '10px' }}>Linux Environment (Command Line Navigation, Permissions Audit)[cite: 1]</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '10px', color: 'var(--terminal-green)' }}>Web Infrastructure</td>
                    <td style={{ padding: '10px' }}>Apache HTTP Server Local Deployment & Configuration[cite: 1]</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '10px', color: 'var(--terminal-green)' }}>Networking Protocols</td>
                    <td style={{ padding: '10px' }}>Analyzing traffic sessions via HTTP (80), SSH/SFTP (22), DNS (53)[cite: 1]</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '10px', color: 'var(--terminal-green)' }}>Diagnostics Tools</td>
                    <td style={{ padding: '10px' }}>Packet capturing & Network troubleshooting using Wireshark</td>
                  </tr>
                </tbody>
              </table>
            </section>
          )}

        </main>
      </div>
    </div>
  );
}

export default App;