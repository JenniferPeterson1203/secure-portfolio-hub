import { useState, useEffect } from 'react';
import { resumeData } from './data/resumeData';
import shieldLogo from './assets/jp-shield.png';
import badgeAvatar from './assets/access-badge.png';
import pixelWorkspace from './assets/hacker-workspace.png';

// Automatically choose the correct backend API target location
const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:8000'
  : 'https://secure-portfolio-backend.onrender.com';

function App() {
  const [activeTab, setActiveTab] = useState('identity');
  const [backendStatus, setBackendStatus] = useState({ status: "offline", message: "Connecting..." });
  const [requestMetrics, setRequestMetrics] = useState({ current: 0, max: 5 });

  // STUDY NOTE: Set up state arrays to handle my chat interaction loop.
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState([
  { 
    sender: 'ai', 
    text: "⚡ Copilot Daemon v2.5 🚧[UNDER CONSTRUCTION / TESTING MODE]🚧\nSystems active. AI model layers are currently being optimized for live recruitment queries. Ask me anything about Jennifer's background!" 
  }
]);
  const [isChatLoading, setIsChatLoading] = useState(false);

  useEffect(() => {
    // Swap local URL for live Render production URL
    fetch('https://secure-portfolio-backend.onrender.com/')
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
      const response = await fetch('https://secure-portfolio-backend.onrender.com/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });

      // IF WE HIT YOUR CUSTOM INFRASTRUCTURE RATE LIMIT WALL
      if (response.status === 429) {
        setRequestMetrics({ current: 5, max: 5 }); // Lock to max safely
        setBackendStatus({ status: "offline", message: "Rate Limit Triggered" });
        setChatHistory(prev => [...prev, { 
          sender: 'ai', 
          text: "⚠️ SECURITY PROTOCOL: Local request threshold reached (5/5). Terminal console execution suspended for 60 seconds." 
        }]);
        return;
      }

      // Read the data body directly
      const data = await response.json();

      // IF GOOGLE'S THIRD-PARTY API IS EXHAUSTED
      if (response.status === 503 || data.status === "upstream_error") {
        setRequestMetrics({ 
          current: data.current_use !== undefined ? data.current_use : 0, 
          max: data.max_limit || 5 
        });
        setBackendStatus({ status: "online", message: "AI Core Exhausted" });
        setChatHistory(prev => [...prev, { sender: 'ai', text: data.reply }]);
        return;
      }

      if (!response.ok) throw new Error("API server returned an unstable error code.");

      // SUCCESSFUL SEQUENCE PROCESSING
      setRequestMetrics({ 
        current: data.current_use !== undefined ? data.current_use : 0, 
        max: data.max_limit || 5 
      });
      // Clear the false offline warning since the server just responded!
      setBackendStatus({ status: "online", message: "Production API Active" });  
      // Append the AI's response to the visual conversation stream once
      setChatHistory(prev => [...prev, { sender: 'ai', text: data.reply }]);
    } catch (error) {
      console.error("Chat Pipeline Error:", error);
      setRequestMetrics(prev => ({ ...prev }));
      setChatHistory(prev => [...prev, { sender: 'ai', text: "SYSTEM ERROR: Failed to process text sequence from backend core. Connection timed out." }]);
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
    <>
      {/* FLOATING TOP-LEFT OS BRANDING LOGO */}
      {/* <div style={{
        position: 'fixed',
        top: '25px',
        left: '25px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        zIndex: 10
      }}>
        <img 
          src={shieldLogo} 
          alt="JP Security System Logo" 
          style={{
            width: '45px',
            height: '45px',
            borderRadius: '6px',
            border: '1px solid var(--cyber-blue)',
            boxShadow: '0 0 10px rgba(88, 166, 255, 0.25)',
            objectFit: 'cover'
          }}
        />
        <div style={{ fontFamily: 'monospace', lineHeight: '1.2' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--cyber-blue)', fontWeight: 'bold' }}>JP_SEC // OS</div>
          <div style={{ fontSize: '0.65rem', color: 'var(--terminal-green)' }}>● AUTH_ACTIVE</div>
        </div>
      </div> */}

      <div className="terminal-container">
        
        {/* WINDOW HEADER */}
    {/* WINDOW HEADER WITH INTEGRATED LOGO */}
<div className="terminal-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
  <div className="window-buttons" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
    <div className="dot dot-red"></div>
    <div className="dot dot-yellow"></div>
    <div className="dot dot-green"></div>
    <img 
      src={shieldLogo} 
      alt="JP Logo" 
      style={{ width: '22px', height: '22px', borderRadius: '4px', marginLeft: '6px' }} 
    />
  </div>
  
  <div className="window-title">jpeterson@root:~</div>

  {/* SOCIAL LINKS IN HEADER */}
  <div style={{ display: 'flex', gap: '15px', alignItems: 'center', fontSize: '0.75rem', fontFamily: 'monospace' }}>
    <a 
      href="https://github.com/JenniferPeterson1203" 
      target="_blank" 
      rel="noopener noreferrer" 
      style={{ color: 'var(--cyber-blue)', textDecoration: 'none' }}
    >
      [github ↗]
    </a>
    <a 
      href="https://www.linkedin.com/in/jennifer--peterson/" 
      target="_blank" 
      rel="noopener noreferrer" 
      style={{ color: 'var(--cyber-blue)', textDecoration: 'none' }}
    >
      [linkedin ↗]
    </a>
    <span style={{ color: 'var(--terminal-green)' }}>● AUTH_ACTIVE</span>
  </div>
</div>

        <div className="terminal-body">
          {/* MULTI-ROLE TARGETED NAVIGATION TABS */}
          <nav className="nav-tabs">
            <button 
              className={`tab-btn ${activeTab === 'badge' ? 'active' : ''}`} 
              onClick={() => setActiveTab('badge')}
            >
              00_access_badge.id
            </button>
            <button className={`tab-btn ${activeTab === 'identity' ? 'active' : ''}`} onClick={() => setActiveTab('identity')}>01_identity.sh</button>
            <button className={`tab-btn ${activeTab === 'credentials' ? 'active' : ''}`} onClick={() => setActiveTab('credentials')}>02_credentials.cfg</button>
            <button className={`tab-btn ${activeTab === 'experience' ? 'active' : ''}`} onClick={() => setActiveTab('experience')}>03_deployment_history.log</button>
            <button className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`} onClick={() => setActiveTab('projects')}>04_code_repositories.json</button>
            <button className={`tab-btn ${activeTab === 'infrastructure' ? 'active' : ''}`} onClick={() => setActiveTab('infrastructure')}>05_server_infrastructure.log</button>
          </nav>

          {/* DYNAMIC CONTENT CONTAINER */}
          <main className="animate-fade-in" style={{ minHeight: '220px' }}>
            
            {/* NEW TAB: 00_access_badge.id */}
            {activeTab === 'badge' && (
              <section style={{ textAlign: 'center', padding: '10px 0' }}>
                <h1><span className="prompt">jpeterson@root:~$</span> cat /etc/security/personnel_id.crt</h1>
                <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
                  Verified Security Clearance & System Operator Identification Card
                </p>

                {/* SECURITY BADGE CONTAINER */}
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
                    style={{ 
                      width: '180px', 
                      borderRadius: '6px',
                      border: '1px solid var(--border-color)'
                    }} 
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
            )}

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

                {/* PIXEL ART WORKSTATION MONITOR */}
                <div style={{ textAlign: 'center', margin: '20px 0' }}>
                  <img 
                    src={pixelWorkspace} 
                    alt="Operator Terminal Workstation" 
                    style={{ 
                      maxWidth: '380px', 
                      width: '100%', 
                      borderRadius: '6px', 
                      border: '1px solid var(--terminal-green)',
                      boxShadow: '0 0 12px rgba(39, 201, 63, 0.2)'
                    }} 
                  />
                  <div style={{ fontSize: '0.75rem', color: 'var(--terminal-green)', fontFamily: 'monospace', marginTop: '6px' }}>
                    [LIVE CCTV FEED // SOC WORKSTATION 01]
                  </div>
                </div>

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

              <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                {/* DYNAMIC RETRO TERMINAL RATIO METRIC TRACKER */}
                <span style={{ 
                  fontSize: '0.8rem', 
                  fontFamily: 'monospace',
                  color: requestMetrics.current >= 5 ? '#ff5f56' : requestMetrics.current >= 4 ? '#ffbd2e' : 'var(--terminal-green)',
                  border: '1px solid currentColor',
                  padding: '2px 6px',
                  borderRadius: '3px',
                  backgroundColor: 'rgba(0,0,0,0.3)'
                }}>
                  [Console Load: {requestMetrics.current}/{requestMetrics.max}]
                </span>

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
    </>
  );
}

export default App;