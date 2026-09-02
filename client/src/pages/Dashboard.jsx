import { useAuth } from '../context/AuthContext';
import RoleBadge from '../components/RoleBadge';
import TenantDashboard from './TenantDashboard';
import OwnerDashboard from './OwnerDashboard';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Welcome back, {user.name}
          </h1>
          <p className="mt-1 text-slate-600">
            Your {user.role === 'owner' ? 'Owner' : 'Tenant'} dashboard
          </p>
        </div>
        <RoleBadge role={user.role} />
      </div>

      <div className="mt-8">
        {user.role === 'owner' ? <OwnerDashboard /> : <TenantDashboard />}
      </div>
    </div>
  );
}
