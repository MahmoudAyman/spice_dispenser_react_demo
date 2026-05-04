import { PlayArrow, Close } from '@mui/icons-material';
import { Dialog } from '@mui/material';

interface DispenseConfirmModalProps {
  open: boolean;
  recipeName: string;
  onStart: () => void;
  onAbort: () => void;
}

export function DispenseConfirmModal({
  open,
  recipeName,
  onStart,
  onAbort,
}: DispenseConfirmModalProps) {
  return (
    <Dialog
      open={open}
      onClose={onAbort}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        style: {
          borderRadius: '16px',
          margin: '16px',
        },
      }}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-1">Start Dispensing?</h2>
            <p className="text-sm text-blue-600 font-medium">{recipeName}</p>
          </div>
          <button
            onClick={onAbort}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Close className="text-gray-500" />
          </button>
        </div>

        {/* Message */}
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg mb-6">
          <p className="text-gray-800 font-medium">
            Make sure to place the bowl in the machine, and start when ready.
          </p>
        </div>

        {/* Info */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-600">
            The dispensing process will begin immediately. You can abort at any time using the
            emergency stop button.
          </p>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onAbort}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            Abort
          </button>
          <button
            onClick={onStart}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <PlayArrow />
            Start
          </button>
        </div>
      </div>
    </Dialog>
  );
}
