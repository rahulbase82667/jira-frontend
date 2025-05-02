import React, { useState } from 'react';

const ProjectStatus = () => {
  const [projectId, setProjectId] = useState('');
  const [message, setMessage] = useState('');

  const handleSecureProject = async () => {
    if (!projectId) {
      setMessage('Please enter a Project ID.');
      
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/projects/secure', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(`Jira Epic Created: ${data.epicKey}`);
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Failed to secure project.');
    }
  };

  //main

  return (
    <div className="project-status">
      <input
        type="text"
        placeholder="Enter Project ID"
        value={projectId}
        onChange={(e) => setProjectId(e.target.value)}
      />
      <button onClick={handleSecureProject}>Secure Project</button>
      <p>{message}</p>
    </div>
  );
};

export default ProjectStatus;
