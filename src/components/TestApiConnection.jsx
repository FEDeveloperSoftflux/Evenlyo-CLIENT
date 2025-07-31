import React, { useEffect } from 'react';
import { apiFetch } from '../utils/api';

const TestApiConnection = () => {
  useEffect(() => {
    apiFetch('/api/health')
      .then(data => {
        console.log('Backend connected! Response:', data);
      })
      .catch(err => {
        console.error('Backend connection failed:', err);
      });
  }, []);

  return (
    <div>
      <h2>Testing Backend Connection...</h2>
      <p>Check the browser console for results.</p>
    </div>
  );
};

export default TestApiConnection;
