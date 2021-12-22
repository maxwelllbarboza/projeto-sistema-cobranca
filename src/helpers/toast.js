import { toast } from "react-toastify";

function messageError(message, callback) {
  toast.error(message, {
    position: "top-right",
    autoClose: 3000,
    theme: "colored",
    closeOnClick: true,
    pauseOnHover: false,
    onClose: () => callback(),
  });
}

function messageSuccess(message, callback) {
  toast.success(message, {
    position: "top-right",
    autoClose: 3000,
    theme: "colored",
    closeOnClick: true,
    pauseOnHover: false,
    onClose: () => callback(),
  });
}

// eslint-disable-next-line
export default { messageError, messageSuccess };
