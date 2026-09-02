import { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function App() {
  const [health, setHealth] = useState({ loading: true });

  useEffect(() => {
    axios
      .get(`${API_URL}/health`)
      .then((res) => setHealth({ loading: false, data: res.data }))
      .catch((err) => setHealth({ loading: false, error: err.message }));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow p-10 text-center">
        <h1 className="text-4xl font-bold text-slate-900">HOMIGO</h1>
        <p className="mt-2 text-slate-600">
          Find Your Home. Find Your People.
        </p>

        <div className="mt-8 text-sm">
          <span className="font-semibold text-slate-700">API status:</span>{' '}
          {health.loading && (
            <span className="text-slate-500">checking...</span>
          )}
          {health.data && (
            <span className="text-green-600">
              OK - {health.data.message}
            </span>
          )}
          {health.error && (
            <span className="text-red-600">ERROR - {health.error}</span>
          )}
        </div>
      </div>
    </div>
  );
}
