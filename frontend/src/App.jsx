// frontend/src/App.jsx
import React, { useState } from 'react';
import { resumeData } from './data/resumeData';

function App() {
  // 1. STATE MANAGEMENT: Track which terminal tab is currently selected/active
  const [activeTab, setActiveTab] = useState('identity');

  return (
    // The main wrapper styled by our global index.css variables
    <div className="terminal-container">
      
      {/* 2. TERMINAL HEADER: Replicating your clean desktop window bar[cite: 1] */}
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
        {/* 3. NAVIGATION TABS: Mapping your custom script headers dynamically[cite: 1] */}
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
        </nav>

        {/* 4. DYNAMIC CONTENT RENDERING: Swapping panes based on activeTab state[cite: 1] */}
        <main className="animate-fade-in">
          
          {/* TAB 1: IDENTITY PROFILE[cite: 1] */}
          {activeTab === 'identity' && (
            <section>
              <div className="status-badge">● Environment: Secure Sandbox</div>
              <h1><span className="prompt">jennifer@root:~$</span> whoami</h1>
              <p>{resumeData.identity.bio}</p>
              <p className="accent-text">📍 Based in {resumeData.identity.location}</p>
            </section>
          )}

          {/* TAB 2: CREDENTIALS & CERTIFICATIONS */}
          {activeTab === 'credentials' && (
            <section>
              <h1><span className="prompt">jennifer@root:~$</span> cat security_credentials.json</h1>
              <p>Verified Technical Accreditations:</p>
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

          {/* TAB 3: DEPLOYMENT HISTORY (EXPERIENCE) */}
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

        </main>
      </div>
    </div>
  );
}

export default App;