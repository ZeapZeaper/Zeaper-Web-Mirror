'use client';

import { Modal, Button } from 'flowbite-react';
import { useContext, useEffect } from 'react';

import RejectionReasonDisplay from './RejectionReasonDisplay';
import { ThemeContext } from '@/contexts/themeContext';


interface RejectionReasonsModalProps {
  showRejectionReasonsModal: boolean;
  setShowRejectionReasonsModal: (open: boolean) => void;
  reasons: string[];
}

const RejectionReasonsModal = ({
  showRejectionReasonsModal,
  setShowRejectionReasonsModal,
  reasons,
}: RejectionReasonsModalProps) => {
  const { setDimBackground } = useContext(ThemeContext);

  // Dim background when modal opens
  useEffect(() => {
    setDimBackground(showRejectionReasonsModal);
  }, [showRejectionReasonsModal, setDimBackground]);

  return (
    <Modal
      show={showRejectionReasonsModal}
      size="2xl"
      popup
      onClose={() => {
        setShowRejectionReasonsModal(false);
        setDimBackground(false);
      }}
    >
      <Modal.Header className="text-darkGold">
        Product Rejection Details
      </Modal.Header>
      <Modal.Body>
        <div className="max-h-[70vh] overflow-y-auto px-1 pb-4">
          <RejectionReasonDisplay reasons={reasons} />
        </div>

        <div className="flex justify-end mt-6">
          <Button
            color="gray"
            onClick={() => {
              setShowRejectionReasonsModal(false);
              setDimBackground(false);
            }}
          >
            Close
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RejectionReasonsModal;
