import { resumeData } from '../../data/resumeData';

function ExperienceTab() {
  return (
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
  );
}

export default ExperienceTab;