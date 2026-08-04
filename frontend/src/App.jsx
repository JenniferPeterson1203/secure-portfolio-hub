import { useState, useEffect } from 'react';

// CSS Imports
import './styles/main.css';
import './styles/terminal.css';
import './styles/components.css';

// Component Imports
import TerminalHeader from './components/TerminalHeader';
import CliDrawer from './components/CliDrawer';
import NavTabs from './components/NavTabs';
import AiCopilot from './components/AiCopilot';

// Tab Views
import BadgeTab from './components/tabs/BadgeTab';
import IdentityTab from './components/tabs/IdentityTab';
import CredentialsTab from './components/tabs/CredentialsTab';
import ExperienceTab from './components/tabs/ExperienceTab';
import ProjectsTab from './components/tabs/ProjectsTab';
import InfrastructureTab from './components/tabs/InfrastructureTab';

function App() {
  const [activeTab, setActiveTab] = useState('identity');
  const [backendStatus, setBackendStatus] = useState({ status: "offline", message: "Connecting..." });

  useEffect(() => {
    fetch('https://secure-portfolio-backend.onrender.com/')
      .then((res) => res.ok ? res.json() : Promise.reject())
      .then((data) => setBackendStatus(data))
      .catch(() => setBackendStatus({ status: "offline", message: "Backend API offline or unreachable." }));
  }, []);

  return (
    <div className="terminal-container">
      <TerminalHeader />

      <div className="terminal-body">
        <CliDrawer setActiveTab={setActiveTab} />
        <NavTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="animate-fade-in" style={{ minHeight: '220px' }}>
          {activeTab === 'badge' && <BadgeTab />}
          {activeTab === 'identity' && <IdentityTab backendStatus={backendStatus} />}
          {activeTab === 'credentials' && <CredentialsTab />}
          {activeTab === 'experience' && <ExperienceTab />}
          {activeTab === 'projects' && <ProjectsTab />}
          {activeTab === 'infrastructure' && <InfrastructureTab />}
        </main>

        <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '25px 0' }} />
        <AiCopilot setBackendStatus={setBackendStatus} />
      </div>
    </div>
  );
}

export default App;