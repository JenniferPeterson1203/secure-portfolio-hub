import React, { useState } from 'react';

// Beginner Note: Receives 'setActiveTab' as a prop so typing 'projects' or 'identity'
// inside the CLI input line can trigger a tab switch in the parent App component!
function CliDrawer({ setActiveTab }) {
  const [cliInput, setCliInput] = useState('');
  const [cliOutput, setCliOutput] = useState([
    { type: 'system', text: "Terminal CLI v1.0 initialized. Type 'help' for available system commands." }
  ]);

  const handleCliSubmit = (e) => {
    e.preventDefault();
    const cmd = cliInput.trim().toLowerCase();
    if (!cmd) return;

    const newLog = [{ type: 'user', text: `jpeterson@root:~$ ${cliInput}` }];

    switch (cmd) {
      case 'help':
        newLog.push({ 
          type: 'response', 
          text: "AVAILABLE COMMANDS:\n  • help      - Display system manual\n  • skills    - Query technical security stack\n  • sudo      - Request elevated root privileges\n  • clear     - Purge terminal console\n  • identity  - Navigate to 01_identity.sh\n  • projects  - Navigate to 04_code_repositories.json" 
        });
        break;
      case 'skills':
        newLog.push({ 
          type: 'response', 
          text: "CORE COMPETENCIES:\n  [Languages]: Python, JavaScript, SQL, HTML5/CSS3, Bash\n  [Security]: Regex Audit Rules, Credential Scanning, Wireshark, Permissions Management\n  [Infrastructure]: Linux (UNIX), Apache HTTP, Git/GitHub, REST APIs" 
        });
        break;
      case 'sudo':
      case 'sudo access':
      case 'sudo su':
        newLog.push({ 
          type: 'success', 
          text: "🔓 ACCESS GRANTED: Root level clearance confirmed. Welcome, Operator Peterson." 
        });
        break;
      case 'clear':
        setCliOutput([]);
        setCliInput('');
        return;
      case 'identity':
        setActiveTab('identity');
        newLog.push({ type: 'response', text: "Navigating to 01_identity.sh..." });
        break;
      case 'projects':
        setActiveTab('projects');
        newLog.push({ type: 'response', text: "Navigating to 04_code_repositories.json..." });
        break;
      case 'credentials':
      case 'certs':
        setActiveTab('credentials');
        newLog.push({ type: 'response', text: "Navigating to 02_credentials.cfg..." });
        break;
      default:
        newLog.push({ 
          type: 'error', 
          text: `zsh: command not found: ${cmd}. Type 'help' for system instructions.` 
        });
    }

    setCliOutput(prev => [...prev, ...newLog]);
    setCliInput('');
  };

  return (
    <div style={{
      backgroundColor: 'rgba(0,0,0,0.4)',
      border: '1px solid var(--border-color)',
      borderRadius: '4px',
      padding: '12px',
      marginBottom: '20px',
      fontFamily: 'monospace',
      fontSize: '0.85rem'
    }}>
      <div style={{ maxHeight: '120px', overflowY: 'auto', marginBottom: '8px' }}>
        {cliOutput.map((item, idx) => (
          <div key={idx} style={{ 
            color: item.type === 'error' ? '#ff5f56' : item.type === 'success' ? '#27c93f' : item.type === 'user' ? 'var(--cyber-blue)' : 'var(--text-muted)',
            whiteSpace: 'pre-wrap',
            marginBottom: '4px'
          }}>
            {item.text}
          </div>
        ))}
      </div>

      <form onSubmit={handleCliSubmit} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ color: 'var(--terminal-green)', fontWeight: 'bold' }}>jpeterson@root:~$</span>
        <input 
          type="text"
          value={cliInput}
          onChange={(e) => setCliInput(e.target.value)}
          placeholder="type 'help', 'skills', or 'sudo'..."
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            border: 'none',
            outline: 'none',
            color: 'var(--text-main)',
            fontFamily: 'inherit',
            fontSize: '0.85rem'
          }}
        />
      </form>
    </div>
  );
}

export default CliDrawer;