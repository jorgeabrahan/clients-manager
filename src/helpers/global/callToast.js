import toast from "react-hot-toast"

export const showSuccessMessage = (message = '') => toast.success(message)
export const showErrorMessage = (error = '') => toast.error(error)
