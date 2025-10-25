"use client";

import { ThemeContext } from "@/contexts/themeContext";
import { PromoInterface } from "@/interface/interface";
import { globalSelectors } from "@/redux/services/global.slice";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import { Alert, Badge, Button, Label, Modal,  } from "flowbite-react";
import { useContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../loading/Loading";
import { displayDate } from "@/utils/helpers";
import { productTypeOptions } from "@/data/content";
import { cn } from "@/utils/cn";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import NumberInput from "@/shared/Input/NumberInput";

const JoinPromoModal = ({
  openModal,
  setOpenModal,
  productId,
}: {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
  productId: string;
}) => {
  const topDiv = useRef<HTMLDivElement>(null);
  const token = useSelector(globalSelectors.selectAuthToken);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [discountPercentage, setDiscountPercentage] = useState<
    number | undefined | string
  >(0);
  const [selectedPromo, setSelectedPromo] = useState<PromoInterface | null>(
    null
  );
  const [showClosalModal, setShowClosalModal] = useState(false);
  const { setDimBackground } = useContext(ThemeContext);

  const getAvailablePromosQuery = zeapApiSlice.useGetAvailablePromosQuery(
    {},
    { skip: !token }
  );
  const availablePromos = getAvailablePromosQuery?.data?.data || [];

  const [joinPromo, joinPromoStatus] = zeapApiSlice.useJoinPromoMutation();
  const isLoading =
    getAvailablePromosQuery.isLoading || joinPromoStatus.isLoading;

  useEffect(() => {
    setDimBackground(openModal);
  }, [openModal, setDimBackground]);

  useEffect(() => {
    if (selectedPromo?.discount) {
      if (selectedPromo.discount.type === "fixed") {
        setDiscountPercentage(selectedPromo.discount.fixedPercentage ?? 0);
      } else {
        setDiscountPercentage(selectedPromo.discount.rangePercentage?.min ?? 0);
      }
    }
  }, [selectedPromo]);

  const handleJoinPromo = () => {
    if (!selectedPromo) return;
    const payload = {
      promoId: selectedPromo.promoId,
      productId,
      discountPercentage,
    };

    joinPromo({ payload })
      .unwrap()
      .then(() => {
        setDimBackground(false);
        setOpenModal(false);
      })
      .catch((err) => {
        // scroll to top of modal to show error
        topDiv.current?.scrollIntoView({ behavior: "smooth" });
        setErrorMsg(err.data?.error || "Failed to join promo.");
      });
  };

  const getProductTypeLabel = (type: string) =>
    productTypeOptions.find((opt) => opt.value === type)?.name || "";

  return (
    <Modal
      show={openModal}
      size="3xl"
      onClose={() => {
        if (selectedPromo) {
          return setShowClosalModal(true);
        }
        setDimBackground(false);
        setOpenModal(false);
      }}
      popup
    >
      <Modal.Header className="text-secondary font-semibold">
        Join a Promo
      </Modal.Header>

      <Modal.Body className="relative max-h-[80vh] overflow-y-auto pb-28">
        <div ref={topDiv} />
        {isLoading && <Loading />}

        {errorMsg && (
          <Alert color="failure" className="my-4">
            {errorMsg}
          </Alert>
        )}

        {availablePromos.length === 0 && !isLoading && (
          <Alert color="info" className="mt-6">
            No active or upcoming promos at the moment.
          </Alert>
        )}

        <div className="grid md:grid-cols-2 gap-4 ">
          {availablePromos.map((promo: PromoInterface) => {
            const isSelected = selectedPromo?.promoId === promo.promoId;
            return (
              <div
                key={promo.promoId}
                onClick={() => setSelectedPromo(promo)}
                className={cn(
                  "relative border rounded-xl p-5 cursor-pointer transition-all duration-200 hover:shadow-md ",
                  isSelected
                    ? "border-green-500 bg-green-50 shadow-lg scale-[1.01]"
                    : "border-gray-200 bg-white"
                )}
              >
                {/* Promo Header */}
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {promo.title}
                    </h3>
                    <p className="text-xs text-slate-400">{promo.subTitle}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {displayDate(new Date(promo.startDate), false)} —{" "}
                      {displayDate(new Date(promo.endDate), false)}
                    </p>
                  </div>

                  {isSelected && (
                    <Badge color="success" className="text-xs px-2">
                      Selected
                    </Badge>
                  )}
                </div>

                {/* Discount Info */}
                <p className="text-sm text-green-700 font-medium mt-1">
                  Discount:{" "}
                  {promo.discount.type === "fixed"
                    ? `${promo.discount.fixedPercentage}%`
                    : `${promo.discount.rangePercentage?.min || 0}%–${
                        promo.discount.rangePercentage?.max || 0
                      }%`}
                </p>

                {/* Description */}
                <Alert color="info" className="mt-3 text-sm">
                  {promo.description}
                </Alert>

                {/* Allowed Products */}
                <div className="mt-3">
                  <span className="text-xs font-semibold text-gray-700">
                    Allowed Products:
                  </span>
                  <div className="flex gap-1 flex-wrap mt-1">
                    {promo.permittedProductTypes?.map((type) => (
                      <Badge
                        key={type}
                        color="success"
                        className="text-xs px-2 py-0.5"
                      >
                        {getProductTypeLabel(type)}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Floating Action Area */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] md:w-[70%] bg-green-50 border border-gray-200 rounded-xl shadow-xl p-4 flex flex-col md:flex-row items-center gap-3 justify-between">
          <div className="flex flex-col w-full md:w-auto">
            <Label
              htmlFor="discountPercentage"
              className="text-sm font-medium text-gray-700"
            >
              Discount Percentage
            </Label>
            {/* <TextInput
              id="discountPercentage"
              type="number"
              value={discountPercentage}
              onChange={(e) => setDiscountPercentage(Number(e.target.value))}
              placeholder="Enter discount %"
              required
              disabled={
                !selectedPromo || selectedPromo.discount.type === "fixed"
              }
              min={selectedPromo?.discount.rangePercentage?.min}
              max={selectedPromo?.discount.rangePercentage?.max}
              className="w-full md:w-40"
            /> */}
            <NumberInput
              id="discountPercentage"
              value={discountPercentage}
              onChange={(value) => setDiscountPercentage(value)}
              placeholder="Enter discount %"
              disabled={
                !selectedPromo || selectedPromo.discount.type === "fixed"
              }
              min={selectedPromo?.discount.rangePercentage?.min}
              max={selectedPromo?.discount.rangePercentage?.max}
              showArrows
              className="w-full md:w-40"
            />
          </div>

          <Button
            color="success"
            onClick={handleJoinPromo}
            disabled={!selectedPromo}
            className="w-full md:w-auto px-6"
          >
            Join Promo
          </Button>
        </div>
        {showClosalModal && selectedPromo && (
          <Modal
            show={showClosalModal}
            size="md"
            onClose={() => setShowClosalModal(false)}
            popup
          >
            <Modal.Header />
            <Modal.Body>
              <div className="text-center">
                {/* we want to warn thet they are living the page without joining the promo by clicking on the Join Promo button */}
                <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-danger" />
                <div className="flex flex-col mb-4">
                  <p className="text-md font-normal text-gray-500 dark:text-gray-400 mb-4">
                    You are about to leave this page without joining the promo
                    by clicking the <br />{" "}
                    <span className="font-semibold text-success">
                      &quot;Join Promo&quot;
                    </span>{" "}
                    button.
                  </p>
                  <p className="text-xs text-slate-500">
                    Are you sure you want to leave this page?
                  </p>
                </div>
                <div className="flex justify-center gap-4">
                  <Button
                    color="success"
                    onClick={() => {
                      setShowClosalModal(false);
                      setDimBackground(false);
                      setOpenModal(false);
                    }}
                  >
                    Yes, Leave Page
                  </Button>
                  <Button
                    color="gray"
                    onClick={() => setShowClosalModal(false)}
                  >
                    No, Stay Here
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default JoinPromoModal;
