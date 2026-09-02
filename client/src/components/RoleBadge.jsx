export default function RoleBadge({ role }) {
  const styles = {
    tenant: 'bg-emerald-100 text-emerald-700',
    owner: 'bg-amber-100 text-amber-700',
  };
  const label = role === 'owner' ? 'Owner' : 'Tenant';
  return (
    <span
      className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full ${styles[role] || styles.tenant}`}
    >
      {label}
    </span>
  );
}
