import pixelWorkspace from '../../assets/hacker-workspace.png';

function InfrastructureTab() {
  return (
    <section>
      <h1><span className="prompt">jpeterson@root:~$</span> netstat -an | grep listen</h1>
      <p>Demonstrated Systems Administration & Network Support Proficiency:</p>

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
  );
}

export default InfrastructureTab;