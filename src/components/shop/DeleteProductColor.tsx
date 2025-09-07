import { useState } from 'react';

import { Alert, Button, Modal } from 'flowbite-react';
import {
  HiInformationCircle,
  HiOutlineExclamationCircle,
} from 'react-icons/hi';
import { ColorInterface } from '@/interface/interface';
import zeapApiSlice from '@/redux/services/zeapApi.slice';
import Loading from '../loading/Loading';

const DeleteProductColor = ({
  close,
  open,
  color,
  productId,
}: {
  close: (open: boolean) => void;
  open: boolean;
  productId: string;

  color: ColorInterface | undefined;
}) => {
  const [deleteColor, diableColorStatus] =
    zeapApiSlice.useDeleteProductColorMutation();

  const isLoading = diableColorStatus.isLoading;
  const [error, setError] = useState<string | null>(null);

  const handleDeleteColor = () => {
    const payload = {
      productId,
      color: color?.value,
    };

    deleteColor({ payload })
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
              <p className=" text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to delete {color?.value}?
              </p>
              <p className="text-xs text-slate-500">
                This will equally delete all images associated with this color
              </p>
            </div>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteColor}>
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

export default DeleteProductColor;
