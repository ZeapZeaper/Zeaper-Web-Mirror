import { Modal } from 'flowbite-react';
import { useContext, useEffect, useState } from 'react';
import { Alert, ModalBody, ModalFooter, ModalHeader } from 'flowbite-react';
import { AuthContext } from '@/contexts/authContext';
import { ThemeContext } from '@/contexts/themeContext';


const modalTheme = {
  root: {
    base: 'fixed inset-x-0 top-0 z-999999 w-screen h-screen overflow-y-auto overflow-x-hidden ',
  },
};

const ForgotPasswordModal = ({
  openModal,
  setOpenModal,
}: {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
}) => {
  const { resetPassword, loginError, loading } = useContext(AuthContext);
  const { setDimBackground } = useContext(ThemeContext);
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(
    () => {
      setDimBackground(openModal);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [openModal],
  );

  const handleResetPassword = async () => {
    if (email.trim() === '') {
      setError('Email is required');
      return;
    }
    try {
      await resetPassword(email);
      setEmail('');
      setError('');
    } catch (err) {
      console.error('Error resetting password:', err);
      setError('Failed to reset password. Please try again.');
    }
  };

  return (
    <Modal
      show={openModal}
      onClose={() => setOpenModal(false)}
      size="lg"
      popup={true}
      theme={modalTheme}
    >
      <ModalHeader className="text-center">Forgot Password</ModalHeader>
      <ModalBody>
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Enter your email address to reset your password.
          </p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
          />
          {error && (
            <Alert color="failure" className="mb-4">
              {error}
            </Alert>
          )}
          {loginError && (
            <Alert
              color={
                loginError.includes('successfully') ? 'success' : 'failure'
              }
              className="mb-4"
            >
              {loginError}
            </Alert>
          )}
          <button
            onClick={handleResetPassword}
            disabled={loading}
            className={`w-full p-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Sending...' : 'Reset Password'}
          </button>
        </div>
      </ModalBody>
      <ModalFooter className="text-center">
        <button
          onClick={() => setOpenModal(false)}
          className="text-green-600 hover:text-green-800 focus:outline-none"
        >
          Close
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default ForgotPasswordModal;
