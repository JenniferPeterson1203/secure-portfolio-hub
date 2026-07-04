// frontend/src/App.jsx
import React, { useState, useEffect } from 'react'; // Added useEffect for network requests
import { resumeData } from './data/resumeData';

function App() {
  const [activeTab, setActiveTab] = useState('identity');
  
  // STUDY NOTE: Set up a state variable to hold our backend live network status data
  const [backendStatus, setBackendStatus] = useState({ status: "offline", message: "Connecting..." });

  // STUDY NOTE: useEffect lets me run code automatically when the page first boots up.
  // This is where I can perform network diagnostics, just like a tech support engineer triage!
  useEffect(() => {
    fetch('http://127.0.0.1:8000/')
      .then((response) => {
        // If the server returns a 200 OK, parse the incoming JSON data
        if (response.ok) return response.json();
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        // Save the live server data into our component's short-term memory
        setBackendStatus(data);
      })
      .catch((error) => {
        // If the server is down or blocked, catch the error and log it
        console.error("Triage Error: Could not connect to API server.", error);
        setBackendStatus({ status: "offline", message: "Backend API offline or unreachable." });
      });
  }, []); // Empty array means this runs exactly ONCE when the component mounts

  return (
    <div className="terminal-container">
      
      {/* WINDOW HEADER */}
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
        {/* MULTI-ROLE TARGETED NAVIGATION TABS */}
        <nav className="nav-tabs">
          {/* ... keeping my tab buttons exactly the same ... */}
          <button className={`tab-btn ${activeTab === 'identity' ? 'active' : ''}`} onClick={() => setActiveTab('identity')}>01_identity.sh</button>
          <button className={`tab-btn ${activeTab === 'credentials' ? 'active' : ''}`} onClick={() => setActiveTab('credentials')}>02_credentials.cfg</button>
          <button className={`tab-btn ${activeTab === 'experience' ? 'active' : ''}`} onClick={() => setActiveTab('experience')}>03_deployment_history.log</button>
          <button className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`} onClick={() => setActiveTab('projects')}>04_code_repositories.json</button>
          <button className={`tab-btn ${activeTab === 'infrastructure' ? 'active' : ''}`} onClick={() => setActiveTab('infrastructure')}>05_server_infrastructure.log</button>
        </nav>

        {/* DYNAMIC CONTENT CONTAINER */}
        <main className="animate-fade-in">
          
          {/* TAB 1: IDENTITY (General Overview) */}
          {activeTab === 'identity' && (
            <section>
              {/* STUDY NOTE: Dynamically color the badge based on whether our live API handshake succeeds! */}
              <div className="status-badge" style={{ 
                borderColor: backendStatus.status === 'online' ? '#27c93f' : '#ff5f56',
                color: backendStatus.status === 'online' ? '#27c93f' : '#ff5f56',
                backgroundColor: backendStatus.status === 'online' ? 'rgba(39, 201, 63, 0.1)' : 'rgba(255, 95, 86, 0.1)'
              }}>
                ● API_LINK: {backendStatus.message}
              </div>
              
              <h1><span className="prompt">jpeterson@root:~$</span> whoami</h1>
              <p>{resumeData.identity.bio}</p>
              <p className="accent-text">📍 Based in {resumeData.identity.location}</p>
            </section>
          )}

          {/* ... keeping all other tabs exactly the same ... */}
          {activeTab === 'credentials' && ( <section><h1><span className="prompt">jpeterson@root:~$</span> cat security_credentials.json</h1><p>Verified Technical Accreditations & Training:</p><div className="grid-layout">{resumeData.credentials.map((cert) => (<div key={cert.id} className="card"><h3>{cert.name}</h3><p>{cert.issuer} ({cert.year})</p><span className="status-badge" style={{ borderColor: 'rgba(88,166,255,0.3)', color: 'var(--cyber-blue)' }}>{cert.status}</span></div>))}</div></section> )}
          {activeTab === 'experience' && ( <section><h1><span className="prompt">jpeterson@root:~$</span> tail -n 5 execution_history.log</h1><p>System Deployment History:</p>{resumeData.experience.map((job) => (<div key={job.id} className="card" style={{ marginBottom: '15px' }}><span className="prompt">[{job.period}] {job.type}</span><h3>{job.role} @ <span className="accent-text">{job.company}</span></h3><ul style={{ paddingLeft: '20px', margin: '10px 0 0 0' }}>{job.bullets.map((bullet, index) => (<li key={index} style={{ marginBottom: '5px' }}>{bullet}</li>))}</ul></div>))}</section> )}
          {activeTab === 'projects' && ( <section><h1><span className="prompt">jpeterson@root:~$</span> curl -s api.github.com/users/jennifer/repos</h1><p>Featured Software Engineering Implementations:</p><div className="grid-layout">{resumeData.projects.map((project) => (<div key={project.id} className="card"><h3>{project.title}</h3><p>{project.description}</p><div style={{ marginTop: '10px', display: 'flex', gap: '5px', flexWrap: 'wrap' }}>{project.tech.map((t, idx) => (<span key={idx} style={{ fontSize: '0.75rem', border: '1px solid var(--border-color)', padding: '2px 6px', borderRadius: '3px', color: 'var(--text-muted)' }}>{t}</span>))}</div></div>))}</div></section> )}
          {activeTab === 'infrastructure' && ( <section><h1><span className="prompt">jpeterson@root:~$</span> netstat -an | grep listen</h1><p>Demonstrated Systems Administration & Network Support Proficiency:</p><table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px', fontSize: '0.9rem' }}><thead><tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}><th style={{ padding: '10px', color: 'var(--cyber-blue)' }}>Subsystem Parameter</th><th style={{ padding: '10px', color: 'var(--cyber-blue)' }}>Demonstrated Competency / Lab Environment</th></tr></thead><tbody><tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}><td style={{ padding: '10px', color: 'var(--terminal-green)' }}>Operating Systems</td><td style={{ padding: '10px' }}>Linux Environment (Command Line Navigation, Permissions Audit)</td></tr><tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}><td style={{ padding: '10px', color: 'var(--terminal-green)' }}>Web Infrastructure</td><td style={{ padding: '10px' }}>Apache HTTP Server Local Deployment & Configuration</td></tr><tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}><td style={{ padding: '10px', color: 'var(--terminal-green)' }}>Networking Protocols</td><td style={{ padding: '10px' }}>Analyzing traffic sessions via HTTP (80), SSH/SFTP (22), DNS (53)</td></tr><tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}><td style={{ padding: '10px', color: 'var(--terminal-green)' }}>Diagnostics Tools</td><td style={{ padding: '10px' }}>Packet capturing & Network troubleshooting using Wireshark</td></tr></tbody></table></section> )}

        </main>
      </div>
    </div>
  );
}

export default App;