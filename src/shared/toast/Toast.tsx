import { useDispatch } from 'react-redux';
import { globalActions } from '../../redux/services/global.slice';
import { useEffect } from 'react';

const Toast = ({
  message,
  id,
  variant,
}: {
  message: string;
  id: number;
  variant: string;
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(globalActions.removeToast(id));
    }, 1000);
    return () => clearTimeout(timer);
  }, [dispatch, id]);

  return (
    <>
      {/*<!-- Component: Basic text primary notification with close button --> */}
      <div
        id={id.toString()}
        className={`animate-pulse relative flex w-80 max-w-full items-center gap-4 overflow-hidden rounded ${variant === 'error' ? 'bg-danger' : 'bg-success'} px-4 py-3 text-sm text-white shadow-lg shadow-emerald-400/20 ring-1 ring-inset ring-emerald-600`}
        role="status"
      >
        {/*  <!-- Text --> */}
        <p className="flex-1">{message}</p>
        {/*  <!-- Close button --> */}
        <button
          aria-label="Close"
          onClick={() => dispatch(globalActions.removeToast(id))}
          className="inline-flex h-8 items-center justify-center gap-2 justify-self-center whitespace-nowrap rounded-full px-4 text-xs font-medium tracking-wide text-white transition duration-300 hover:bg-emerald-50 hover:text-emerald-600 focus:bg-emerald-100 focus:text-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:text-emerald-600 disabled:shadow-none disabled:hover:bg-transparent"
        >
          <span className="relative only:-mx-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              role="graphics-symbol"
              aria-labelledby="title-20 desc-20"
            >
              <title id="title-20">Icon title</title>
              <desc id="desc-20">A more detailed description of the icon</desc>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </span>
        </button>
      </div>
      {/*<!-- End Basic text primary notification with close button --> */}
    </>
  );
};

export default Toast;
