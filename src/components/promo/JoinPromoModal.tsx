import { ThemeContext } from "@/contexts/themeContext";
import { PromoInterface } from "@/interface/interface";
import { globalSelectors } from "@/redux/services/global.slice";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import { Alert, Badge, Button, Modal, Label, TextInput } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../loading/Loading";
import { displayDate } from "@/utils/helpers";
import { productTypeOptions } from "@/data/content";

const JoinPromoModal = ({
  openModal,
  setOpenModal,
  productId,
}: {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
  productId: string;
}) => {
  const token = useSelector(globalSelectors.selectAuthToken);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [discountPercentage, setDiscountPercentage] = useState<number>(0);
  const [promo, setPromo] = useState<PromoInterface | null>(null);
  const { setDimBackground } = useContext(ThemeContext);
  const getAvailablePromosQuery = zeapApiSlice.useGetAvailablePromosQuery(
    {},
    { skip: !token }
  );

  const availablePromos = getAvailablePromosQuery?.data?.data;
  const [joinPromo, joinPromoStatus] = zeapApiSlice.useJoinPromoMutation();
  const isLoading =
    getAvailablePromosQuery.isLoading || joinPromoStatus.isLoading;

  useEffect(() => {
    setDimBackground(openModal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openModal]);

  useEffect(() => {
    if (promo?.discount) {
      if (promo.discount.type === "fixed") {
        setDiscountPercentage(promo?.discount.fixedPercentage ?? 0);
      } else {
        setDiscountPercentage(promo?.discount.rangePercentage?.min ?? 0);
      }
    }
  }, [promo]);

  const getProductTypeLabel = (type: string) => {
    const found = productTypeOptions.find((option) => option.value === type);
    if (found) {
      return found.name;
    }
    return "";
  };

  const handleJoinPromo = () => {
    const payload = { promoId: promo?.promoId, productId, discountPercentage };
    joinPromo({ payload })
      .unwrap()
      .then(() => {
        setDimBackground(false);
        setOpenModal(false);
      })
      .catch((err) => {
        console.log("err", err);
        setErrorMsg(err.data.error);
      });
  };

  return (
    <Modal
      show={openModal}
      size="2xl"
      onClose={() => {
        setDimBackground(false);
        setOpenModal(false);
      }}
      popup
    >
      <Modal.Header className="text-darkGold">Join Promo</Modal.Header>
      <Modal.Body>
        {isLoading && <Loading />}
        <div className="">
          {errorMsg && (
            <Alert color="failure" className="my-4">
              {errorMsg}
            </Alert>
          )}
          <div className="flex flex-col gap-4">
            {availablePromos?.map((promo: PromoInterface) => (
              <div
                className="flex flex-col  p-4 border border-gray-200 rounded-lg"
                key={promo.promoId}
              >
                <div className="flex items-center justify-between ">
                  <div>
                    <h3 className="text-lg">{promo.title}</h3>
                    <p className="text-xs text-slate-400">({promo.subTitle})</p>
                    <p className="text-xs ">
                      {displayDate(new Date(promo.startDate), false)} -{" "}
                      {displayDate(new Date(promo.endDate), false)}
                    </p>

                    <p className="text-sm text-success">
                      Discount:{" "}
                      {promo.discount.type === "fixed"
                        ? `${promo.discount.fixedPercentage}%`
                        : `from ${
                            promo.discount.rangePercentage?.min || 0
                          }% to ${promo.discount.rangePercentage?.max || 0}%`}
                    </p>
                  </div>
                  <Button
                    color="primary"
                    onClick={() => {
                      setPromo(promo);
                    }}
                  >
                    Select
                  </Button>
                </div>
                <div className=" flex mt-4">
                  <Alert color="info" className="text-xs flex">
                    <p className="text-xs">{promo.description}</p>
                  </Alert>
                </div>
                <div className="flex flex-col  mt-4 ">
                  Allowed Products:{" "}
                  <span className="flex gap-1 flex-wrap">
                    {promo.permittedProductTypes?.map((type) => (
                      <Badge key={type} color="success" className="text-xs">
                        {getProductTypeLabel(type)}
                      </Badge>
                    ))}
                  </span>
                </div>
              </div>
            ))}
            {availablePromos?.length === 0 &&
              getAvailablePromosQuery.status === "fulfilled" && (
                <Alert color="info">
                  <span>
                    No available promos. This means no promo is either live or
                    scheduled
                  </span>
                </Alert>
              )}
          </div>
          {promo && (
            <div className="mt-4">
              <Label htmlFor="discountPercentage">Discount Percentage</Label>
              <TextInput
                id="discountPercentage"
                type="number"
                value={discountPercentage}
                onChange={(e) => setDiscountPercentage(Number(e.target.value))}
                placeholder="Discount Percentage"
                required
                disabled={promo.discount.type === "fixed"}
                min={promo.discount.rangePercentage?.min}
                max={promo.discount.rangePercentage?.max}
              />
            </div>
          )}
          <Button
            color="success"
            onClick={handleJoinPromo}
            disabled={!promo}
            className="mt-4"
          >
            Join
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default JoinPromoModal;
