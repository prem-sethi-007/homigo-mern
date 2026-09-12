import { useAuth } from '../context/AuthContext';
import RoleBadge from '../components/RoleBadge';
import TenantDashboard from './TenantDashboard';
import OwnerDashboard from './OwnerDashboard';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-6 pt-16 pb-24">
      <div className="flex items-start justify-between flex-wrap gap-6 border-b border-line pb-8">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-brand font-semibold">
            Dashboard
          </p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl leading-[1.02] tracking-tight text-ink">
            Welcome back, {user.name.split(' ')[0]}.
          </h1>
          <p className="mt-3 text-muted">
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
