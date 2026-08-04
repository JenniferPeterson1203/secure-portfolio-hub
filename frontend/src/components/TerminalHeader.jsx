import React from 'react';
import shieldLogo from '../assets/jp-shield.png';

// Beginner Note: This component renders the window title bar, window control buttons,
// social links, and system auth status at the top of the terminal frame.
function TerminalHeader() {
  return (
    <div className="terminal-header">
      <div className="window-buttons">
        <div className="dot dot-red"></div>
        <div className="dot dot-yellow"></div>
        <div className="dot dot-green"></div>
        <img src={shieldLogo} alt="JP Logo" style={{ width: '22px', height: '22px', borderRadius: '4px', marginLeft: '6px' }} />
      </div>
      
      <div className="window-title">jpeterson@root:~</div>

      <div style={{ display: 'flex', gap: '15px', alignItems: 'center', fontSize: '0.75rem', fontFamily: 'monospace' }}>
        <a href="https://github.com/JenniferPeterson1203" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--cyber-blue)', textDecoration: 'none' }}>
          [github ↗]
        </a>
        <a href="https://www.linkedin.com/in/jennifer--peterson/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--cyber-blue)', textDecoration: 'none' }}>
          [linkedin ↗]
        </a>
        <span style={{ color: 'var(--terminal-green)' }}>● AUTH_ACTIVE</span>
      </div>
    </div>
  );
}

export default TerminalHeader;