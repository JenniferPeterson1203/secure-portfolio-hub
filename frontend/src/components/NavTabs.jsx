import React from 'react';

function NavTabs({ activeTab, setActiveTab }) {
  return (
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
  );
}

export default NavTabs;