import { toast } from 'react-toastify';

const errorId = 'custom-id-error';
const successId = 'custom-id-success';

export const errorNotification = (message: string) => {
  if (message.length) {
    toast.error(message, {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
      toastId: errorId,
    });
  }
};

export const successNotification = (message: string) => {
  if (message.length) {
    toast.success(message, {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
      toastId: successId,
    });
  }
};
