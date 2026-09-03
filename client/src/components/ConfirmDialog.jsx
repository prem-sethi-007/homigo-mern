export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  submitting = false,
  danger = false,
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/40">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 border border-line">
        <h3 className="text-lg font-semibold text-ink">{title}</h3>
        {message && <p className="mt-2 text-sm text-muted">{message}</p>}
        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={submitting}
            className="text-sm font-medium bg-sand hover:bg-sand-soft text-ink px-4 py-2 rounded-md disabled:opacity-50 transition"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={submitting}
            className={
              'text-sm font-medium text-white px-4 py-2 rounded-md disabled:opacity-50 transition shadow-sm ' +
              (danger
                ? 'bg-error hover:bg-error-dark'
                : 'bg-brand hover:bg-brand-dark')
            }
          >
            {submitting ? 'Working...' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
