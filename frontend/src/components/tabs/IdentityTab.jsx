import { resumeData } from '../../data/resumeData';

function IdentityTab({ backendStatus }) {
  return (
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
  );
}

export default IdentityTab;