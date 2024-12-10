import { toast } from "react-toastify";

// define a global success message 
export const SuccessToast = (message?: string) =>
  toast.success(message ?? "Task updadet succefully 🎉", {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
