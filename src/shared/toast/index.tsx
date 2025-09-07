import { useSelector } from 'react-redux';
import Toast from './Toast';
import { globalSelectors } from '@/redux/services/global.slice';

const ToastContainer = () => {
  const toasts = useSelector(globalSelectors.selectToasts);

  return (
    <div className="absolute right-0 bottom-0 z-50 p-4">
      {toasts.map((toast) => (
        <div key={toast.id}>
          <Toast
            message={toast.title || toast.message}
            id={toast.id}
            variant={toast.variant}
          />
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
