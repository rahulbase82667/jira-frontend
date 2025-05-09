import React, { useState } from 'react';

const ProjectStatus = () => {
  const [projectId, setProjectId] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSecureProject = async () => {
    if (!projectId) {
      setMessage('Please enter a Project ID.');
      return;
    }

    setLoading(true);
    setMessage(''); // Reset message on each attempt

    try {
      const response = await fetch('http://localhost:5000/api/projects/secure', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId }),
      });

      if (!response.ok) {
        throw new Error('Failed to secure project');
      }

      const data = await response.json();
      console.log(data);

      // Display the link as a clickable URL
      if (data?.epic?.self) {
        setMessage(
          <span>
            Jira Epic Created: <a href={data.epic.self} target="_blank" rel="noopener noreferrer">{data.epic.self}</a>
          </span>
        );
      } else {
        setMessage('Failed to retrieve the Epic link.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Failed to secure project. Please try again.');
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  return (
    <div className="project-status-container">
      <div className="project-status">
        <input
          type="text"
          placeholder="Enter Project ID"
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
          className="input-field"
        />
        <button onClick={handleSecureProject} className="secure-button" disabled={loading}>
          {loading ? 'Securing...' : 'Secure Project'}
        </button>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default ProjectStatus;
