import { Bounce, toast, ToastOptions } from 'react-toastify';

export const getCoreVersion = () => {
  const { version } = require('@data-story/core/package.json');
  return version;
}

export const tryParseJSON = (data: string) => {
  try {
    const result = JSON.parse(data);
    return {
      valid: true,
      result
    }
  } catch (e) {
    return {
      valid: false,
      result: data
    }
  }
}

const toastConfig: ToastOptions = {
  position: 'top-right',
  autoClose: 2000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: false,
  theme: 'light',
  transition: Bounce,
}
export function errorToast(content: string): void {
  toast.error(content, toastConfig);
}
export function successToast(content: string): void {
  toast.success(content, toastConfig);
}
