export default function Modal({ message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black/80  flex items-center justify-center z-[999]">
      <div className="bg-white p-6 rounded shadow-md text-center">
        <h3 className="text-lg font-semibold mb-4">{message}</h3>
        <div className="flex justify-center gap-4">
          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={onConfirm}
          >
            Yes
          </button>
          <button
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
