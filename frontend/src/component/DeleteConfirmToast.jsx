import toast from "react-hot-toast";

const DeleteConfirmToast = ({ onConfirm }) => {
  return toast((t) => (
    <div className="flex flex-col text-sm">
      <p>Are you sure you want to delete this product?</p>
      <div className="flex justify-end gap-2 mt-2">
        <button
          onClick={() => {
            toast.dismiss(t.id);
            onConfirm();
          }}
          className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700"
        >
          Yes
        </button>
        <button
          onClick={() => toast.dismiss(t.id)}
          className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-xs hover:bg-gray-300"
        >
          No
        </button>
      </div>
    </div>
  ), { duration: 5000 });
};

export default DeleteConfirmToast;