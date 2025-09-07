"use client";
import { ProductInterface } from "@/interface/interface";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import {
  Alert,
  Badge,
  Button,
  Label,
  Modal,
  TextInput,
  ToggleSwitch,
} from "flowbite-react";
import {  useContext, useEffect, useState } from "react";
import { HiInformationCircle } from "react-icons/hi";
import Loading from "../loading/Loading";
import { ThemeContext } from "@/contexts/themeContext";

const ModalTheme = {
  root: {
    base: "fixed inset-x-0 top-0 z-99999 h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full opacity-100",
  },
  content: {
    base: "relative h-full w-full p-4 md:h-auto",
    inner:
      "relative flex max-h-[90dvh] flex-col rounded-lg bg-white shadow dark:bg-gray-700",
  },
};
const toggleTheme = {
  root: {
    base: "group flex rounded-lg focus:outline-none",
    active: {
      on: "cursor-pointer",
      off: "cursor-not-allowed opacity-50",
    },
    label:
      "ms-3 mt-0.5 text-start text-sm font-medium text-gray-900 dark:text-gray-300",
  },
  toggle: {
    base: "relative rounded-full border after:absolute after:rounded-full after:bg-white after:transition-all group-focus:ring-4 group-focus:ring-cyan-500/25",
    checked: {
      on: "after:translate-x-full after:border-white rtl:after:-translate-x-full",
      off: "border-gray-200 bg-slate-700 dark:border-gray-600 dark:bg-gray-700",
    },
  },
};

const AutoPriceAdjustment = ({
  product,
  setServerError,
  serverError,
}: {
  product: ProductInterface;
  setServerError: (error: string | null) => void;
  serverError: string | null;
}) => {
  const { setDimBackground } = useContext(ThemeContext);
  const [showInfo, setShowInfo] = useState(true);
  const [open, setOpen] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdjustable, setIsAdjustable] = useState(false);
  const [adjustmentPercentage, setAdjustmentPercentage] = useState(0);
  const [updateAutoPriceAdjustment] =
    zeapApiSlice.useUpdateAutoPriceAdjustmentMutation();
  useEffect(() => {
    if (product.autoPriceAdjustment) {
      setIsAdjustable(product.autoPriceAdjustment.isAdjustable);
      setAdjustmentPercentage(product.autoPriceAdjustment.adjustmentPercentage);
    }
  }, [product.autoPriceAdjustment]);

  useEffect(
    () => {
      setDimBackground(open);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [open]
  );
  useEffect(
    () => {
      setDimBackground(openConfirmModal);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [openConfirmModal]
  );

  const handleUpdateAutoPriceAdjustment = () => {
    setIsLoading(true);
    const payload = {
      productId: product.productId,
      isAdjustable,
      adjustmentPercentage,
    };
    updateAutoPriceAdjustment({ payload })
      .unwrap()
      .then(() => {
        setIsLoading(false);
        setServerError(null);
        setOpenConfirmModal(false);
        setOpen(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setServerError(err.data.error);
      });
  };

  return (
    <div className="flex flex-col gap-4">
      {!showInfo && (
        <Badge
          color="info"
          icon={HiInformationCircle}
          className="cursor-pointer"
          size="xs"
          onClick={() => setShowInfo(true)}
        >
          Show Info
        </Badge>
      )}

      {showInfo && (
        <Alert
          color="info"
          icon={HiInformationCircle}
          onDismiss={() => setShowInfo(false)}
          rounded
        >
          <span className="w-full flex flex-col gap-2">
            <span className="font-medium">Info alert! </span>
            <span className="block sm:inline">
              Allow auto price adjustment for this product. If accepted, the
              price of this product will be adjusted by our automated
              system/admin based on market conditions like demand,
              competitor,inflation, exchange rate, etc.
            </span>
            <span className="block sm:inline">
              This will help you stay competitive in the market and increase
              your sales.
            </span>
            <span className="block sm:inline">
              The price adjustment would never go below or beyond your chosen
              percentage.
            </span>
          </span>
        </Alert>
      )}
      <div className="flex gap-4 flex-col md:flex-row md:justify-between">
        <div className="flex gap-4 flex-col">
          <Label className="text-darkGold">Auto Price Adjustment</Label>
          <ToggleSwitch
            theme={toggleTheme}
            name="isAdjustable"
            checked={isAdjustable}
            onChange={() => {
              if (!isAdjustable) {
                setOpen(true);
              }
              if (isAdjustable && adjustmentPercentage === 0) {
                setIsAdjustable(false);
              }
              if (
                isAdjustable &&
                product.autoPriceAdjustment.adjustmentPercentage !== 0
              ) {
                setIsAdjustable(false);
                return setOpenConfirmModal(true);
              }
              setIsAdjustable(!isAdjustable);
            }}
            label="Enable Auto Price Adjustment"
          />
        </div>
        {isAdjustable && (
          <div className="flex gap-4 flex-col">
            <Label className="text-darkGold">Adjustment Percentage</Label>
            <Button
              color="success"
              onClick={() => {
                setOpen(true);
              }}
            >
              {adjustmentPercentage}%
            </Button>
          </div>
        )}
      </div>
      <Modal
        size="7xl"
        theme={ModalTheme}
        show={open}
        onClose={() => {
          if (adjustmentPercentage === 0) {
            setIsAdjustable(false);
          }
          setOpen(false);
        }}
      >
        <Modal.Header>
          Set Percentage Limit for Auto Price Adjustment
        </Modal.Header>
        <Modal.Body>
          {isLoading && <Loading />}
          {serverError && (
            <Alert color="failure" icon={HiInformationCircle} className="my-4">
              {serverError}
            </Alert>
          )}
          <Alert color="warning" className="my-4">
            <p className="text-xs">
              This action will set the percentage limit for auto price
              adjustment. The price adjustment would never go below or beyond
              your chosen percentage.
            </p>
          </Alert>
          <div className="flex gap-4 ">
            <TextInput
              name="adjustmentPercentage"
              value={adjustmentPercentage}
              disabled={!isAdjustable}
              color="success"
              rightIcon={() => <span>%</span>}
              addon="+-"
              type="number"
              min={0}
              max={100}
              onChange={(e) => setAdjustmentPercentage(Number(e.target.value))}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="success" onClick={handleUpdateAutoPriceAdjustment}>
            Save
          </Button>
          <Button
            color="failure"
            onClick={() => {
              if (adjustmentPercentage === 0) {
                setIsAdjustable(false);
              }
              setOpen(false);
            }}
          >
            Cancel{" "}
          </Button>
        </Modal.Footer>
      </Modal>
      {openConfirmModal && (
        <Modal
          size="7xl"
          theme={ModalTheme}
          show={openConfirmModal}
          onClose={() => {
            setIsAdjustable(true);
            setOpenConfirmModal(false);
          }}
        >
          <Modal.Header>Confirm Auto Price Adjustment</Modal.Header>
          <Modal.Body>
            <Alert color="warning" className="my-4">
              <p className="text-xs">
                This action will disable auto price adjustment for this product.
              </p>
            </Alert>
          </Modal.Body>
          <Modal.Footer>
            <Button
              color="success"
              onClick={() => {
                setIsAdjustable(false);
                setAdjustmentPercentage(0);
                handleUpdateAutoPriceAdjustment();
              }}
            >
              Yes, I&#39;m sure
            </Button>
            <Button
              color="failure"
              onClick={() => {
                setIsAdjustable(true);
                setOpenConfirmModal(false);
              }}
            >
              Cancel{" "}
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default AutoPriceAdjustment;
