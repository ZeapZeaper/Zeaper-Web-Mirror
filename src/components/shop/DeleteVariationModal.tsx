import { useState } from 'react';
import { Alert, Button, Modal } from 'flowbite-react';
import {
  HiInformationCircle,
  HiOutlineExclamationCircle,
} from 'react-icons/hi';
import { VariationInterface } from '@/interface/interface';
import zeapApiSlice from '@/redux/services/zeapApi.slice';
import Loading from '../loading/Loading';

const DeleteVariationModal = ({
  close,
  open,
  variation,
  productId,
}: {
  close: (open: boolean) => void;
  open: boolean;
  productId: string;

  variation: VariationInterface | null;
}) => {
  const [deleteVariation, diableVariationStatus] =
    zeapApiSlice.useDeleteProductVariationMutation();

  const isLoading = diableVariationStatus.isLoading;
  const [error, setError] = useState<string | null>(null);

  const handleDeleteVariation = () => {
    const payload = {
      productId,
      sku: variation?.sku,
    };

    deleteVariation({ payload })
      .unwrap()
      .then(() => {
        close(false);
      })
      .catch((err) => {
        console.log('err', err);
        setError(err.data.error);
      });
  };

  return (
    <>
      <Modal show={open} size="md" onClose={() => close(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            {isLoading && <Loading />}
            {error && (
              <Alert
                color="failure"
                icon={HiInformationCircle}
                className="my-4"
              >
                {error}
              </Alert>
            )}
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-danger" />
            <div className="flex flex-col mb-4">
              <p className=" text-md font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to delete{' '}
                <span className="text-sm text-slate-500 font-normal">
                  {variation?.sku}
                </span>
                ?
              </p>
            </div>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteVariation}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => close(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DeleteVariationModal;
