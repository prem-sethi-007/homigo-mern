import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function OwnerRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-slate-500 text-sm">
        Loading...
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== 'owner') return <Navigate to="/dashboard" replace />;

  return children;
}
