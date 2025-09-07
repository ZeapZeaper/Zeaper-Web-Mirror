import { useSelector } from "react-redux";
import { Alert, Badge, Button } from "flowbite-react";
import { useState } from "react";
import { globalSelectors } from "@/redux/services/global.slice";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import Loading from "../loading/Loading";
import JoinPromoModal from "./JoinPromoModal";
import LeavePromoModal from "./LeavePromoModal";

const ProductPromo = ({ productId }: { productId: string }) => {
  const token = useSelector(globalSelectors.selectAuthToken);
  const [openJoinPromoModal, setOpenJoinPromoModal] = useState(false);
  const [openLeavePromoModal, setOpenLeavePromoModal] = useState(false);
  const promoProductsQuery = zeapApiSlice.useGetProductPromoQuery(
    { productId },
    { skip: !token }
  );
  const isLoading = promoProductsQuery.isLoading;
  const data = promoProductsQuery?.data?.data;
  const promo = data?.promo;
  const product = data?.product;

  return (
    <div>
      {isLoading && <Loading />}
      {!promo && promoProductsQuery.status === "fulfilled" && (
        <Alert color="info">
          <div className="flex  flex-col gap-2">
            <span>This product is not part of any promo </span>
            <Button
              size="xs"
              color="success"
              onClick={() => setOpenJoinPromoModal(true)}
            >
              Join Promo
            </Button>
          </div>
        </Alert>
      )}
      {promo && (
        <div className="flex flex-col bg-grey8 dark:bg-grey2 p-2">
          <div className="flex justify-between ">
            <span className="text-sm">
              {promo?.title} / {promo?.promoId}
            </span>
            <span className="text-sm">
              {product?.promo?.discountPercentage}%
            </span>
          </div>
          <div className="flex justify-between ">
            <span className="text-sm">
              <Badge color="info" className="text-xs">
                {promo?.status}
              </Badge>
            </span>
            <div className="flex justify-end gap-2">
              <Button
                size="xs"
                color="failure"
                onClick={() => setOpenLeavePromoModal(true)}
              >
                Leave Promo
              </Button>
            </div>
          </div>
        </div>
      )}

      {openJoinPromoModal && (
        <JoinPromoModal
          productId={productId}
          openModal={openJoinPromoModal}
          setOpenModal={setOpenJoinPromoModal}
        />
      )}
      {openLeavePromoModal && (
        <LeavePromoModal
          promo={promo}
          openModal={openLeavePromoModal}
          setOpenModal={setOpenLeavePromoModal}
          productId={productId}
        />
      )}
    </div>
  );
};

export default ProductPromo;
