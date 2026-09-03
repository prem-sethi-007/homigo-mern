import { useAuth } from '../context/AuthContext';
import RoleBadge from '../components/RoleBadge';
import TenantDashboard from './TenantDashboard';
import OwnerDashboard from './OwnerDashboard';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-brand font-semibold">
            Dashboard
          </p>
          <h1 className="mt-1 font-display text-3xl sm:text-4xl text-ink">
            Welcome back, {user.name}
          </h1>
          <p className="mt-2 text-muted">
            Your {user.role === 'owner' ? 'Owner' : 'Tenant'} home base.
          </p>
        </div>
        <RoleBadge role={user.role} />
      </div>

      <div className="mt-10">
        {user.role === 'owner' ? <OwnerDashboard /> : <TenantDashboard />}
      </div>
    </div>
  );
}
