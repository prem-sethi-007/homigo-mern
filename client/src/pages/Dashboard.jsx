import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-slate-900">
        Welcome, {user.name}!
      </h1>
      <p className="text-slate-600 mt-2">
        You are logged in as a{' '}
        <span className="font-semibold">{user.role}</span>.
      </p>

      <div className="mt-6 bg-white border border-slate-200 rounded-lg p-4 text-sm text-slate-500">
        Property browsing, favorites, and roommate features will appear here in
        later steps.
      </div>
    </div>
  );
}
