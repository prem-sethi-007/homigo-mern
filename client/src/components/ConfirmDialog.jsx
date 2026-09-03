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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        {message && <p className="mt-2 text-sm text-slate-600">{message}</p>}
        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={submitting}
            className="text-sm font-medium bg-slate-100 hover:bg-slate-200 text-slate-800 px-4 py-2 rounded disabled:opacity-50"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={submitting}
            className={
              'text-sm font-medium text-white px-4 py-2 rounded disabled:opacity-50 ' +
              (danger
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-slate-900 hover:bg-slate-800')
            }
          >
            {submitting ? 'Working...' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
