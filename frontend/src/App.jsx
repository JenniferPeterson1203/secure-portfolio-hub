import React, { useState, useEffect } from 'react';
import { resumeData } from './data/resumeData';

function App() {
  const [activeTab, setActiveTab] = useState('identity');
  const [backendStatus, setBackendStatus] = useState({ status: "offline", message: "Connecting..." });

  // STUDY NOTE: Set up state arrays to handle my chat interaction loop.
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { sender: 'ai', text: "Systems online. Ask me anything about Jennifer's qualifications, projects, or background." }
  ]);
  const [isChatLoading, setIsChatLoading] = useState(false);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/')
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error("Network response was not ok.");
      })
      .then((data) => setBackendStatus(data))
      .catch((error) => {
        console.error("Triage Error: Could not connect to API server.", error);
        setBackendStatus({ status: "offline", message: "Backend API offline or unreachable." });
      });
  }, []);

  // STUDY NOTE: Create the event handler to dispatch my prompt to the Python API
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!chatInput.trim() || isChatLoading) return;

    const userMessage = chatInput.trim();
    setChatInput('');
    
    setChatHistory(prev => [...prev, { sender: 'user', text: userMessage }]);
    setIsChatLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });

      if (!response.ok) throw new Error("API server returned an error code.");
      
      const data = await response.json();
      setChatHistory(prev => [...prev, { sender: 'ai', text: data.reply }]);
    } catch (error) {
      console.error("Chat Pipeline Error:", error);
      setChatHistory(prev => [...prev, { sender: 'ai', text: "SYSTEM ERROR: Failed to process text sequence from backend core." }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleClearChat = () => {
    setChatHistory([
      { sender: 'ai', text: "Terminal console history cleared. Core AI layers active." }
    ]);
  };

  return (
    <div className="terminal-container">
      
      {/* WINDOW HEADER */}
      <div className="terminal-header">
        <div className="window-buttons">
          <div className="dot dot-red"></div>
          <div className="dot dot-yellow"></div>
          <div className="dot dot-green"></div>
        </div>
        <div className="window-title">jpeterson@root:~</div>
        <div></div>
      </div>

      <div className="terminal-body">
        {/* MULTI-ROLE TARGETED NAVIGATION TABS */}
        <nav className="nav-tabs">
          <button className={`tab-btn ${activeTab === 'identity' ? 'active' : ''}`} onClick={() => setActiveTab('identity')}>01_identity.sh</button>
          <button className={`tab-btn ${activeTab === 'credentials' ? 'active' : ''}`} onClick={() => setActiveTab('credentials')}>02_credentials.cfg</button>
          <button className={`tab-btn ${activeTab === 'experience' ? 'active' : ''}`} onClick={() => setActiveTab('experience')}>03_deployment_history.log</button>
          <button className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`} onClick={() => setActiveTab('projects')}>04_code_repositories.json</button>
          <button className={`tab-btn ${activeTab === 'infrastructure' ? 'active' : ''}`} onClick={() => setActiveTab('infrastructure')}>05_server_infrastructure.log</button>
        </nav>

        {/* DYNAMIC CONTENT CONTAINER */}
        <main className="animate-fade-in" style={{ minHeight: '220px' }}>
          {activeTab === 'identity' && (
            <section>
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

          {activeTab === 'credentials' && ( 
            <section>
              <h1><span className="prompt">jpeterson@root:~$</span> cat security_credentials.json</h1>
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
          )}

          {activeTab === 'experience' && ( 
            <section>
              <h1><span className="prompt">jpeterson@root:~$</span> tail -n 5 execution_history.log</h1>
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

      {activeTab === 'projects' && (
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
                      
                      {/* Interactive Link Hub Area */}
                      <div style={{ marginTop: '15px', display: 'flex', gap: '12px', fontSize: '0.85rem' }}>
                        {project.liveUrl && (
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--cyber-blue)', textDecoration: 'underline' }}>
                            [live_site 🔗]
                          </a>
                        )}
                        {/* If it has BOTH repos, label this one frontend. Otherwise, just call it source_code */}
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
          )}

          {activeTab === 'infrastructure' && ( 
            <section>
              <h1><span className="prompt">jpeterson@root:~$</span> netstat -an | grep listen</h1>
              <p>Demonstrated Systems Administration & Network Support Proficiency:</p>
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
                    <td style={{ padding: '10px' }}>Linux Environment (Command Line Navigation, Permissions Audit)</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '10px', color: 'var(--terminal-green)' }}>Web Infrastructure</td>
                    <td style={{ padding: '10px' }}>Apache HTTP Server Local Deployment & Configuration</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '10px', color: 'var(--terminal-green)' }}>Networking Protocols</td>
                    <td style={{ padding: '10px' }}>Analyzing traffic sessions via HTTP (80), SSH/SFTP (22), DNS (53)</td>
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

        <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '25px 0' }} />

        {/* INTEGRATED AI ASSISTANT TERMINAL INTERFACE */}
        <section className="ai-chat-widget">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <h3 style={{ color: 'var(--cyber-blue)', margin: 0 }}><span className="prompt">●</span> Core AI Copilot Interface</h3>
            <button 
              type="button" 
              onClick={handleClearChat}
              style={{ 
                backgroundColor: 'transparent', 
                border: 'none', 
                color: 'var(--text-muted)', 
                cursor: 'pointer', 
                fontSize: '0.8rem',
                textDecoration: 'underline',
                padding: 0,
                fontFamily: 'inherit'
              }}
            >
              [clear_logs]
            </button>
          </div>
          
          <div style={{ 
            backgroundColor: 'rgba(0,0,0,0.2)', 
            border: '1px solid var(--border-color)', 
            borderRadius: '4px', 
            padding: '15px', 
            height: '180px', 
            overflowY: 'auto',
            fontSize: '0.9rem',
            marginBottom: '10px'
          }}>
            {chatHistory.map((msg, index) => (
              <div key={index} style={{ marginBottom: '10px', lineHeight: '1.4' }}>
                <span style={{ color: msg.sender === 'user' ? 'var(--cyber-blue)' : 'var(--terminal-green)', fontWeight: 'bold' }}>
                  {msg.sender === 'user' ? '↳ Guest@client:~$ ' : '⚡ Copilot_Daemon: '}
                </span>
                <span style={{ 
                  color: msg.sender === 'user' ? 'var(--text-main)' : 'var(--text-muted)',
                  whiteSpace: 'pre-wrap' 
                }}>
                  {msg.text}
                </span>
              </div>
            ))}
            {isChatLoading && <div style={{ color: 'var(--cyber-blue)', fontStyle: 'italic' }}>⚡ Querying model layers...</div>}
          </div>

          <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '10px' }}>
            <input 
              type="text" 
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Query qualifications (e.g., Tell me about Jennifer's Python automation experience)..."
              style={{ 
                flex: 1, 
                backgroundColor: 'var(--bg-color)', 
                border: '1px solid var(--border-color)', 
                borderRadius: '4px', 
                padding: '10px', 
                color: 'var(--text-main)',
                fontFamily: 'inherit'
              }}
            />
            <button 
              type="submit" 
              disabled={isChatLoading}
              style={{ 
                backgroundColor: isChatLoading ? 'transparent' : 'rgba(88, 166, 255, 0.1)', 
                border: '1px solid var(--cyber-blue)', 
                color: 'var(--cyber-blue)',
                padding: '0 20px',
                borderRadius: '4px',
                cursor: isChatLoading ? 'not-allowed' : 'pointer',
                fontFamily: 'inherit'
              }}
            >
              Execute
            </button>
          </form>
        </section>

      </div>
    </div>
  );
}

export default App;