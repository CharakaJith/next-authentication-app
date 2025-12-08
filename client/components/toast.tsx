import { toast, type ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// for mobile screen
const isMobile = () => (typeof window !== 'undefined' ? window.innerWidth < 480 : false);

// toast config
const defaultOptions: ToastOptions = {
  position: 'bottom-right',
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light',
};

// responsive style
const getResponsiveStyle = (messageLength?: number): ToastOptions =>
  ({
    style: {
      background: '#111827',
      color: '#f9fafb',
      border: '1px solid #000',
      borderRadius: '0.5rem',
      boxShadow: isMobile() ? '0 4px 8px rgba(0,0,0,0.5)' : '0 10px 15px -3px rgba(0,0,0,0.7)',

      padding: isMobile() ? '0.75rem' : '1rem',
      fontSize: isMobile() ? '0.85rem' : '1rem',
      gap: isMobile() ? '0.5rem' : '0.75rem',

      display: 'inline-flex',
      alignItems: 'flex-start',
      minWidth: '200px',
      maxWidth: isMobile() ? '90%' : '500px',
      width: messageLength && messageLength < 20 ? 'auto' : undefined,
    },
    progressStyle: { background: '#22c55e' },
    theme: 'colored',
  } as ToastOptions);

// toast
const Toast = {
  info: (message: string, options?: ToastOptions) =>
    toast.info(message, {
      ...defaultOptions,
      ...getResponsiveStyle(),
      ...options,
    }),

  success: (message: string, options?: ToastOptions) =>
    toast.success(message, {
      ...defaultOptions,
      ...getResponsiveStyle(),
      ...options,
    }),

  error: (message: string, options?: ToastOptions) =>
    toast.error(message, {
      ...defaultOptions,
      ...getResponsiveStyle(),
      ...options,
    }),

  warning: (message: string, options?: ToastOptions) =>
    toast.warning(message, {
      ...defaultOptions,
      ...getResponsiveStyle(),
      ...options,
    }),
};

export default Toast;
