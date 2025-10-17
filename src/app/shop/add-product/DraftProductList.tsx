import { useState } from "react";
import { Alert, Badge, Modal, Button, Avatar } from "flowbite-react";
import { ProductInterface } from "../../../interface/interface";
import {
  capitalizeFirstLetter,
  shortenLongString,
} from "../../../utils/helpers";
import NoPic from "@/images/noPhoto.png";
import { HiChevronRight, HiInformationCircle, HiTrash } from "react-icons/hi";
import Link from "next/link";
import { productTypeOptions } from "@/data/content";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import Loading from "@/app/loading";

const getProductTypeLabel = (type: string) => {
  const found = productTypeOptions.find((option) => option.value === type);
  return found ? found.name : "";
};

const getProductTypeSlug = (type: string) => {
  const found = productTypeOptions.find((option) => option.value === type);
  return found ? found.slug : "";
};

const DraftProductList = ({
  draftProducts = [],
}: {
  draftProducts: ProductInterface[];
}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [absoluteDeleteProduct, absoluteDeleteProductStatus] =
    zeapApiSlice.useAbsoluteDeleteProductMutation();
  const isLoading = absoluteDeleteProductStatus.isLoading;
  const getDefaultImageLink = (product: ProductInterface) => {
    if (product?.colors?.length > 0) {
      const colors = product.colors;
      const colorImages = colors.map((color) => color.images).flat();
      const isDefault = colorImages.find((image) => image.isDefault);
      return isDefault ? isDefault.link : colorImages[0]?.link;
    }
    return NoPic.src;
  };

  const handleDeleteClick = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedProductId(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (!selectedProductId) {
      setShowModal(false);
      return;
    }
    const payload = {
      productIds: [selectedProductId],
    };

    absoluteDeleteProduct({ payload })
      .unwrap()
      .then(() => {
        setShowModal(false);
        setSelectedProductId(null);
      })
      .catch((err) => {
        setError(err.data.error);
      });
  };

  const getSelectedProduct = () => {
    const selectedProduct = draftProducts.find(
      (product) => product.productId === selectedProductId
    );
    return selectedProduct;
  };

  return (
    <div className="flex flex-col">
      {draftProducts?.length === 0 && (
        <Alert color="info">
          No draft products found for this shop. You can start by selecting one
          of the below options
        </Alert>
      )}

      {draftProducts?.length > 0 && (
        <>
          <div className="flex text-md text-warning font-bold mt-6 mb-2">
            Draft Products
          </div>

          <div className="grid gap-2 md:gap-4 grid-cols-1 md:grid-cols-2 2xl:grid-cols-3">
            {draftProducts.map((product: ProductInterface) => (
              <div
                key={product?.productId}
                className="relative py-3 sm:py-4 px-2 bg-blue-100 rounded-lg my-2 hover:shadow-lg hover:bg-blue-50 transition-all duration-150"
              >
                {/* 🗑️ Delete button */}
                <button
                  onClick={(e) => handleDeleteClick(product?.productId, e)}
                  className="absolute -top-3 right-2 p-1 bg-red-100 hover:bg-red-200 text-red-600 rounded-full transition"
                  title="Delete draft"
                >
                  <HiTrash className="text-lg" />
                </button>

                <Link
                  href={`add-product/${getProductTypeSlug(
                    product?.productType
                  )}?id=${product?.productId}`}
                >
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <Avatar
                      img={getDefaultImageLink(product)}
                      alt="product image"
                      rounded
                      size="sm"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                        {shortenLongString(product?.title, 35)}
                      </p>
                      <p className="truncate text-sm text-slate-500 dark:text-gray-400">
                        {getProductTypeLabel(product?.productType)}
                      </p>
                    </div>
                    <HiChevronRight className="text-secondary text-2xl" />
                  </div>

                  <div className="absolute -top-3 left-2 px-2 py-1 text-xs font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-white">
                    <Badge color="warning" className="text-xs font-medium">
                      {capitalizeFirstLetter(product?.status)}
                    </Badge>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </>
      )}

      {/* 🧾 Delete Confirmation Modal */}
      <Modal
        show={showModal}
        size="md"
        popup
        onClose={() => setShowModal(false)}
      >
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
            <HiTrash className="mx-auto mb-4 text-red-600 w-12 h-12" />
            <h3 className="mb-5 text-lg font-normal text-gray-500">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-gray-900 text-italic">
                {getSelectedProduct()?.title || "this draft product"}
              </span>{" "}
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={confirmDelete}>
                Yes, I&#39;m sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DraftProductList;
