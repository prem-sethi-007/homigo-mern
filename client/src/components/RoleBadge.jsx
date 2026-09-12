export default function RoleBadge({ role }) {
  const styles = {
    tenant: 'bg-sage-soft text-sage-dark',
    owner: 'bg-brand-soft text-brand-dark',
  };
  const label = role === 'owner' ? 'Owner' : 'Tenant';
  return (
    <span
      className={`inline-flex items-center text-[10px] font-semibold uppercase tracking-[0.24em] px-3 py-1.5 rounded-full ${styles[role] || styles.tenant}`}
    >
      {label}
    </span>
  );
}
