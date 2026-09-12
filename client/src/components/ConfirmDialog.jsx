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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/50">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 border border-line">
        <h3 className="font-display text-2xl text-ink">{title}</h3>
        {message && (
          <p className="mt-3 text-sm text-muted leading-relaxed">{message}</p>
        )}
        <div className="mt-8 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={submitting}
            className="text-sm text-muted hover:text-ink px-4 py-2 disabled:opacity-50 transition"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={submitting}
            className={
              'text-sm font-medium text-white px-6 py-2.5 rounded-full disabled:opacity-50 transition shadow-sm ' +
              (danger
                ? 'bg-error hover:bg-error-dark'
                : 'bg-brand hover:bg-brand-dark')
            }
          >
            {submitting ? 'Working…' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
