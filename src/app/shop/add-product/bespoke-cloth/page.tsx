"use client";
import { Alert, Button, Dropdown, Label, TextInput } from "flowbite-react";
import { useContext, useEffect, useState } from "react";

import { HiInformationCircle } from "react-icons/hi";
import { useSelector } from "react-redux";
import Multiselect from "multiselect-react-dropdown";
import { ThemeContext } from "@/contexts/themeContext";
import { globalSelectors } from "@/redux/services/global.slice";
import { AuthContext } from "@/contexts/authContext";
import { useSearchParams } from "next/navigation";
import {
  MeasurementInterface,
  VariationInterface,
} from "@/interface/interface";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import Loading from "@/app/loading";
import BespokeBodyMeasurement from "@/components/shop/BespokeBodyMeasurement";
import BespokeImages from "@/components/shop/BespokeImages";
import BespokeVariation from "@/components/shop/BespokeVariation";
import AutoPriceAdjustment from "@/components/shop/AutoPriceAdjustment";
import SubmitProductModal from "@/components/shop/SubmitProductModal";
import Editor from "@/components/editor/EditorWithUseQuill";

// import ProductHeader from '../components/ProductHeader'

interface PayloadInterface {
  title?: string;
  subtitle?: string;
  description?: string;
  shopId?: string;
  productType?: string;
  productId?: string;
}
interface CategoriesInterface {
  main: string[];
  style: string[];
  gender: string[];
  age: { ageGroup: string; ageRange?: string };
  brand: string;
  design: string[];
  occasion: string[];
  sleeveLength: string;
  fastening: string[];
  fit: string[];
}
type OptionType = { value: string; id: number };

const AddBespokeClothPage = () => {
  const { setDimBackground } = useContext(ThemeContext);
  const token = useSelector(globalSelectors.selectAuthToken);
  const { user } = useContext(AuthContext);
  const shopId = user?.shopId;
  const params = useSearchParams();
  const id = params.get("id");
  const [productId, setProductId] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [openSubmitModal, setOpenSubmitModal] = useState(false);
  const [stage, setStage] = useState(1);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [colorType, setColorType] = useState<string>("");
  const [availableColors, setAvailableColors] = useState<string[]>([]);
  const [price, setPrice] = useState<number>(0);
  const [categories, setCategories] = useState<CategoriesInterface>({
    main: [],
    style: [],
    gender: [],
    age: { ageGroup: "", ageRange: "" },
    brand: "",
    design: [],
    occasion: [],
    sleeveLength: "",
    fastening: [],
    fit: [],
  });
  const [measurements, setMeasurements] = useState<MeasurementInterface[]>([]);

  const [error, setError] = useState({
    title: "",
    description: "",
    main: "",
    style: "",
    gender: "",
    age: "",
  });
  const [serverError, setServerError] = useState("");
  const [createProduct, creteProductStatus] =
    zeapApiSlice.useCreateProductMutation();
  const [updateProduct, updateProductStatus] =
    zeapApiSlice.useUpdateProductMutation();
  const [addVariation, addVariationStatus] =
    zeapApiSlice.useAddProductVariationMutation();
  const [editVariation, editVariationStatus] =
    zeapApiSlice.useEditProductVariationMutation();
  const [addProductBodyMeasurement, addProductBodyMeasurementStatus] =
    zeapApiSlice.useAddProductBodyMeasurementMutation();
  const productOptionsQuery = zeapApiSlice.useGetProductsOptionsQuery(
    {},
    { skip: !token }
  );
  const options = productOptionsQuery?.data?.data;
  const mainOptions: [] = options?.bespokeClothes?.mainEnums
    ?.map((str: string, index: number) => ({ value: str, id: index + 1 }))
    .sort((a: OptionType, b: OptionType) => a.value.localeCompare(b.value));

  const styleOptions = options?.bespokeClothes?.clothStyleEnums
    ?.map((str: string, index: number) => ({ value: str, id: index + 1 }))
    .sort((a: OptionType, b: OptionType) => a.value.localeCompare(b.value));
  const genderOptions = options?.bespokeClothes?.genderEnums
    ?.map((str: string, index: number) => ({ value: str, id: index + 1 }))
    .sort((a: OptionType, b: OptionType) => a.value.localeCompare(b.value));
  const ageGroupEnums = options?.bespokeClothes?.ageGroupEnums;
  const ageRangeEnums = options?.bespokeClothes?.ageRangeEnums;
  const brandEnums = options?.bespokeClothes?.brandEnums;
  const designOptionEnums = options?.bespokeClothes?.designEnums
    ?.map((str: string, index: number) => ({ value: str, id: index + 1 }))
    .sort((a: OptionType, b: OptionType) => a.value.localeCompare(b.value));
  const occasionOptionEnums = options?.bespokeClothes?.occasionEnums
    ?.map((str: string, index: number) => ({ value: str, id: index + 1 }))
    .sort((a: OptionType, b: OptionType) => a.value.localeCompare(b.value));
  const sleeveLengthEnums = options?.bespokeClothes?.sleeveLengthEnums;
  const colorEnums = options?.bespokeClothes?.colorEnums;
  const fasteningOptionEnums = options?.bespokeClothes?.fasteningEnums
    ?.map((str: string, index: number) => ({ value: str, id: index + 1 }))
    .sort((a: OptionType, b: OptionType) => a.value.localeCompare(b.value));
  const fitOptionEnums = options?.bespokeClothes?.fitEnums
    ?.map((str: string, index: number) => ({ value: str, id: index + 1 }))
    .sort((a: OptionType, b: OptionType) => a.value.localeCompare(b.value));
  const bodyMeasurementEnums = options?.bespokeClothes?.bodyMeasurementEnums;
  const productQuery = zeapApiSlice.useGetProductQuery(
    { productId: id || productId, currency: "NGN" },
    { skip: !token || (stage === 1 && !id) }
  );
  const product = productQuery?.data?.data;

  const isLoading =
    creteProductStatus.isLoading ||
    productOptionsQuery.isLoading ||
    productQuery.isLoading ||
    updateProductStatus.isLoading ||
    addVariationStatus.isLoading ||
    editVariationStatus.isLoading ||
    addProductBodyMeasurementStatus.isLoading;

  useEffect(() => {
    if (product) {
      setTitle(product.title);
      setSubtitle(product.subtitle);
      setDescription(product.description);
      setProductId(product.productId);
      setCategories({
        main: product?.categories?.main,
        style: product?.categories.style,
        gender: product?.categories.gender,
        age: product?.categories.age
          ? product?.categories.age
          : { ageGroup: "", ageRange: "" },
        brand: product.categories.brand,
        design: product.categories.design,
        occasion: product.categories.occasion,
        sleeveLength: product?.categories.sleeveLength,
        fastening: product?.categories.fastening,
        fit: product?.categories.fit,
      });
      setRefresh(true);
    }
  }, [product]);

  const getClass = (step: number) => {
    if (step === stage) {
      return "flex w-full items-center text-darkGold   after:w-full after:h-1 after:border-b after:border-darkGold after:border-4 after:inline-block";
    }
    if (step < stage) {
      return "flex w-full items-center text-success  after:content-[''] after:w-full after:h-1 after:border-b after:border-success after:border-4 after:inline-block ";
    }
    return "flex w-full items-center text-grey7 after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-700";
  };

  const getLabel = () => {
    if (stage === 1) {
      return "Basic details";
    }
    if (stage === 2) {
      return "Categories";
    }
    if (stage === 3) {
      return "Body Measurement";
    }

    if (stage === 4) {
      return "Images";
    }
    if (stage === 5) {
      return "Variations";
    }
    if (stage === 6) {
      return "Auto Price Adjustment";
    }
    if (stage === 7) {
      return "Review";
    }
  };
  const getColor = (value: string | undefined, isError: string) => {
    if (value) {
      return "success";
    }
    if (isError) {
      return "failure";
    }
  };
  const handleValidation = () => {
    if (stage === 1) {
      if (!title) {
        setError({ ...error, title: "Title is required" });
        console.log("error", error);
        return false;
      }
      if (!description) {
        setError({ ...error, description: "Description is required" });

        return false;
      }
      return true;
    }
    if (stage === 2) {
      if (categories.main.length === 0) {
        setError({ ...error, main: "Select at least one main category" });
        return false;
      }
      if (categories.style.length === 0) {
        setError({ ...error, style: "Select at least one style category" });
        return false;
      }
      if (categories.gender.length === 0) {
        setError({ ...error, gender: "Select at least one gender" });
        return false;
      }
      if (categories?.age?.ageGroup === "") {
        setError({ ...error, age: "Select at least one age group" });
        return false;
      }
      if (
        categories?.age?.ageGroup === "Kids" &&
        categories?.age?.ageRange === ""
      ) {
        setError({ ...error, age: "Select at least one age range" });
        return false;
      }
      return true;
    }
    if (stage === 3) {
      if (measurements.length === 0) {
        setServerError("Please add at least one body measurement");
        return false;
      }
    }

    if (stage === 4) {
      if (!productId) {
        setServerError(
          "Please save the product before adding images and colors"
        );
        return false;
      }
      if (!product?.colors || product?.colors?.length === 0) {
        setServerError(
          "Please add at least one color with image to the product"
        );
        return false;
      }
    }
    if (stage === 5) {
      if (!colorType) {
        setServerError("Please select color type");
        return false;
      }
      if (
        (!availableColors || availableColors.length) === 0 &&
        colorType === "single"
      ) {
        setServerError("Please select at least one color");
        return false;
      }
    }
    return true;
  };

  const handleCreateProduct = async (payload: PayloadInterface) => {
    createProduct({ payload })
      .unwrap()
      .then((res) => {
        setProductId(res.data.productId);

        setStage(stage + 1);
      })
      .catch((err) => {
        setServerError(err?.data?.error);
      });
  };
  const handleUpdateProduct = async (payload: PayloadInterface) => {
    updateProduct({ payload })
      .unwrap()
      .then((res) => {
        setProductId(res.data.productId);

        setStage(stage + 1);
      })
      .catch((err) => {
        setServerError(err?.data?.error);
      });
  };
  const handleAddBodyMeasurement = () => {
    const payload = {
      productId: product?.productId,
      measurements: measurements.filter((item) => item.fields.length > 0),
    };
    addProductBodyMeasurement({ payload })
      .unwrap()
      .then(() => {
        setStage(stage + 1);
      })
      .catch((err) => {
        setServerError(err.data.error);
      });
  };

  const handleAddVariation = () => {
    const variations = product?.variations;
    const bespoke = variations?.find(
      (item: VariationInterface) =>
        item.colorValue?.toLocaleLowerCase() === "bespoke"
    );

    const payload = {
      productId: product?.productId,
      variation: {
        colorType,
        availableColors,
        price,
        ...(bespoke && { sku: bespoke.sku }),
      },
    };

    if (product?.variation?.sku) {
      editVariation({ payload })
        .unwrap()
        .then(() => {
          setStage(stage + 1);
        })
        .catch((err) => {
          setServerError(err.data.error);
        });
      return;
    }
    addVariation({ payload })
      .unwrap()
      .then(() => {
        setStage(stage + 1);
      })
      .catch((err) => {
        setServerError(err.data.error);
      });
  };
  const clearError = () => {
    setError({
      title: "",
      description: "",
      main: "",
      style: "",
      gender: "",
      age: "",
    });
    setServerError("");
  };
  const nextStep = () => {
    clearError();

    if (!handleValidation()) {
      setTimeout(() => {
        setServerError("");
      }, 1000);
      return;
    }
    if (stage === 6) {
      setDimBackground(true);
      setOpenSubmitModal(true);
      return;
    }
    let payload = {};
    if (stage === 1) {
      payload = {
        title,
        subtitle,
        description,
        shopId,
        productType: "bespokeCloth",
        ...(productId && { productId }),
      };
    }
    if (stage === 2) {
      payload = {
        categories,
        productId,
      };
    }

    if (stage === 3) {
      return handleAddBodyMeasurement();
    }
    if (stage === 4) {
      return setStage(stage + 1);
    }
    if (stage === 5) {
      return handleAddVariation();
    }

    if (!productId) {
      return handleCreateProduct(payload);
    }
    return handleUpdateProduct(payload);
  };
  const prevStep = () => {
    clearError();
    setStage(stage - 1);
  };

  return (
    <div className="container py-6 lg:pb-28">
       <span className="text-xl md:text-2xl font-bold ">
       Bespoke Cloth
      </span>
      <ol className="flex items-center w-full mb-4 sm:mb-5">
        <li className={`${getClass(1)} md:after:content-['Basic_Details']`}>
          <div
            className={`flex items-center justify-center w-10 h-10  rounded-full lg:h-12 lg:w-12  shrink-0 ${
              stage === 1 && "bg-blue-100"
            }`}
          >
            <svg
              className="w-4 h-4 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.408-5.5a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4a1 1 0 0 0-1-1h-2Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </li>
        <li className={`${getClass(2)} md:after:content-['Categories']`}>
          <div
            className={`flex items-center justify-center w-10 h-10  rounded-full lg:h-12 lg:w-12  shrink-0 ${
              stage === 2 && "bg-blue-100"
            }`}
          >
            <svg
              className="w-4 h-4 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.9"
                d="M9.143 4H4.857A.857.857 0 0 0 4 4.857v4.286c0 .473.384.857.857.857h4.286A.857.857 0 0 0 10 9.143V4.857A.857.857 0 0 0 9.143 4Zm10 0h-4.286a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286A.857.857 0 0 0 20 9.143V4.857A.857.857 0 0 0 19.143 4Zm-10 10H4.857a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286a.857.857 0 0 0 .857-.857v-4.286A.857.857 0 0 0 9.143 14Zm10 0h-4.286a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286a.857.857 0 0 0 .857-.857v-4.286a.857.857 0 0 0-.857-.857Z"
              />
            </svg>
          </div>
        </li>
        <li className={`${getClass(3)} md:after:content-['Body_Measurement']`}>
          <div
            className={`flex items-center justify-center w-10 h-10  rounded-full lg:h-12 lg:w-12  shrink-0 ${
              stage === 2 && "bg-blue-100"
            }`}
          >
            <svg
              className="w-4 h-4 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.9"
                d="M5 7h14M5 12h14M5 17h10"
              />
            </svg>
          </div>
        </li>

        <li className={`${getClass(4)} md:after:content-['Images_and_Colors']`}>
          <div
            className={`flex items-center justify-center w-10 h-10  rounded-full lg:h-12 lg:w-12  shrink-0 ${
              stage === 3 && "bg-blue-100"
            }`}
          >
            <svg
              className="w-4 h-4 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M5 3a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5Zm14 18a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h4ZM5 11a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2H5Zm14 2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h4Z" />
            </svg>
          </div>
        </li>
        <li className={`${getClass(5)} md:after:content-['Variations']`}>
          <div
            className={`flex items-center justify-center w-10 h-10  rounded-full lg:h-12 lg:w-12  shrink-0 ${
              stage === 4 && "bg-blue-100"
            }`}
          >
            <svg
              className="w-4 h-4 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 7.205c4.418 0 8-1.165 8-2.602C20 3.165 16.418 2 12 2S4 3.165 4 4.603c0 1.437 3.582 2.602 8 2.602ZM12 22c4.963 0 8-1.686 8-2.603v-4.404c-.052.032-.112.06-.165.09a7.75 7.75 0 0 1-.745.387c-.193.088-.394.173-.6.253-.063.024-.124.05-.189.073a18.934 18.934 0 0 1-6.3.998c-2.135.027-4.26-.31-6.3-.998-.065-.024-.126-.05-.189-.073a10.143 10.143 0 0 1-.852-.373 7.75 7.75 0 0 1-.493-.267c-.053-.03-.113-.058-.165-.09v4.404C4 20.315 7.037 22 12 22Zm7.09-13.928a9.91 9.91 0 0 1-.6.253c-.063.025-.124.05-.189.074a18.935 18.935 0 0 1-6.3.998c-2.135.027-4.26-.31-6.3-.998-.065-.024-.126-.05-.189-.074a10.163 10.163 0 0 1-.852-.372 7.816 7.816 0 0 1-.493-.268c-.055-.03-.115-.058-.167-.09V12c0 .917 3.037 2.603 8 2.603s8-1.686 8-2.603V7.596c-.052.031-.112.059-.165.09a7.816 7.816 0 0 1-.745.386Z" />
            </svg>
          </div>
        </li>
        <li
          className={`${getClass(
            6
          )} md:after:content-['Auto_Price_Adjustment']`}
        >
          <div
            className={`flex items-center justify-center w-10 h-10  rounded-full lg:h-12 lg:w-12  shrink-0 ${
              stage === 6 && "bg-blue-100"
            }`}
          >
            <svg
              className="w-4 h-4 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M5 13.17a3.001 3.001 0 0 0 0 5.66V20a1 1 0 1 0 2 0v-1.17a3.001 3.001 0 0 0 0-5.66V4a1 1 0 0 0-2 0v9.17ZM11 20v-9.17a3.001 3.001 0 0 1 0-5.66V4a1 1 0 1 1 2 0v1.17a3.001 3.001 0 0 1 0 5.66V20a1 1 0 1 1-2 0Zm6-1.17V20a1 1 0 1 0 2 0v-1.17a3.001 3.001 0 0 0 0-5.66V4a1 1 0 1 0-2 0v9.17a3.001 3.001 0 0 0 0 5.66Z" />
            </svg>
          </div>
        </li>
      </ol>
      <div>
        <h3 className="md:hidden mb-4 text-lg font-medium leading-none text-darkGold">
          {getLabel()}
        </h3>
        <div className="flex flex-col gap-4 min-h-[57vh] overflow-auto">
          {isLoading && <Loading />}
          {serverError && (
            <Alert color="failure" icon={HiInformationCircle} className="my-4">
              {serverError}
            </Alert>
          )}
          {stage === 1 && (
            <>
              <div>
                <div className="mb-2 block">
                  <Label value="Title" />
                </div>
                <TextInput
                  type="text"
                  placeholder="Title / Name of the product"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  color={getColor(title, error.title)}
                  helperText={
                    error.title && !title ? (
                      <>
                        <span className="text-xs">{error?.title}</span>
                      </>
                    ) : (
                      ""
                    )
                  }
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label value="Subtitle" />
                </div>
                <TextInput
                  type="text"
                  placeholder="Subtitle if any..."
                  value={subtitle || ""}
                  onChange={(e) => setSubtitle(e.target.value)}
                  color={subtitle ? "success" : ""}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label value="Description" />
                </div>

                <Editor
                  placeholder={"Description of the product"}
                  value={description}
                  onChange={(value) => setDescription(value)}
                  refresh={refresh}
                />
              </div>
            </>
          )}
          {stage === 2 && (
            <div className="flex flex-col gap-6">
              <div className="border rounded p-2">
                <div className="mb-2 block">
                  <Label value="Main Category" />
                  <div className="text-xs text-slate-500 mb-2">
                    Select at least one main category
                  </div>

                  {mainOptions?.length > 0 && (
                    <div>
                      <Multiselect
                        options={mainOptions}
                        displayValue="value"
                        onSelect={(selectedList) => {
                          setCategories({
                            ...categories,
                            main: selectedList.map(
                              (item: OptionType) => item.value
                            ),
                          });
                        }}
                        onRemove={(selectedList) =>
                          setCategories({
                            ...categories,
                            main: selectedList.map(
                              (item: OptionType) => item.value
                            ),
                          })
                        }
                        selectedValues={mainOptions.filter((item: OptionType) =>
                          categories.main.includes(item.value)
                        )}
                        placeholder="Select main categories"
                        style={{
                          chips: {
                            background: "#219653",
                          },

                          searchBox: {
                            border: "none",
                            borderBottom: "1px solid #a17f1a",
                            borderRadius: "0px",
                          },
                        }}
                      />
                    </div>
                  )}
                  {error.main && categories?.main?.length === 0 && (
                    <span className="text-xs text-danger">{error.main}</span>
                  )}
                </div>
              </div>
              <div className="border rounded p-2">
                <div className="mb-2 block">
                  <Label value="Style" />
                  <div className="text-xs text-slate-500 mb-2">
                    Select at least one style
                  </div>
                  {styleOptions?.length > 0 && (
                    <div>
                      <Multiselect
                        options={styleOptions}
                        displayValue="value"
                        onSelect={(selectedList) => {
                          setCategories({
                            ...categories,
                            style: selectedList.map(
                              (item: OptionType) => item.value
                            ),
                          });
                        }}
                        onRemove={(selectedList) =>
                          setCategories({
                            ...categories,
                            style: selectedList.map(
                              (item: OptionType) => item.value
                            ),
                          })
                        }
                        selectedValues={styleOptions.filter(
                          (item: OptionType) =>
                            categories.style.includes(item.value)
                        )}
                        placeholder="Select style categories"
                        style={{
                          chips: {
                            background: "#219653",
                          },

                          searchBox: {
                            border: "none",
                            borderBottom: "1px solid #a17f1a",
                            borderRadius: "0px",
                          },
                        }}
                      />
                    </div>
                  )}
                  {error.style && categories?.style?.length === 0 && (
                    <span className="text-xs text-danger">{error.style}</span>
                  )}
                </div>
              </div>

              <div className="border rounded p-2">
                <div className="mb-2 block">
                  <Label value="Gender" />
                  <div className="text-xs text-slate-500 mb-2">
                    Select at least one gender
                  </div>

                  {genderOptions?.length > 0 && (
                    <div>
                      <Multiselect
                        options={genderOptions}
                        displayValue="value"
                        onSelect={(selectedList) => {
                          setCategories({
                            ...categories,
                            gender: selectedList.map(
                              (item: OptionType) => item.value
                            ),
                          });
                        }}
                        onRemove={(selectedList) =>
                          setCategories({
                            ...categories,
                            gender: selectedList.map(
                              (item: OptionType) => item.value
                            ),
                          })
                        }
                        selectedValues={genderOptions.filter(
                          (item: OptionType) =>
                            categories.gender.includes(item.value)
                        )}
                        placeholder="Select gender"
                        style={{
                          chips: {
                            background: "#219653",
                          },

                          searchBox: {
                            border: "none",
                            borderBottom: "1px solid #a17f1a",
                            borderRadius: "0px",
                          },
                        }}
                      />
                    </div>
                  )}
                  {error.gender && categories?.gender?.length === 0 && (
                    <span className="text-xs text-danger">{error.gender}</span>
                  )}
                </div>

                <div></div>
              </div>

              <div className="border rounded p-2">
                <div className="mb-2 block">
                  <Label value="Age" />
                  <div className="flex flex-col-gap-2">
                    <div>
                      <div className="text-xs text-slate-500 mb-2">
                        Select one age group
                      </div>
                      <Dropdown
                        label={categories?.age?.ageGroup || "Select Age Group"}
                        color={categories.age?.ageGroup ? "success" : "primary"}
                        size="xs"
                        inline={categories.age?.ageGroup ? false : true}
                      >
                        {ageGroupEnums?.map((item: string, index: number) => (
                          <Dropdown.Item
                            className="text-black"
                            key={index}
                            onClick={() => {
                              if (item === "Adults") {
                                setCategories({
                                  ...categories,
                                  age: { ageGroup: item },
                                });
                              } else {
                                setCategories({
                                  ...categories,
                                  age: { ageGroup: item, ageRange: "" },
                                });
                              }
                            }}
                          >
                            {item}
                          </Dropdown.Item>
                        ))}
                      </Dropdown>
                    </div>
                    {categories?.age?.ageGroup === "Kids" && (
                      <div>
                        <div className="text-xs text-slate-500 mb-2">
                          Select one age range
                        </div>
                        <Dropdown
                          label={categories.age?.ageRange || "Select Age Range"}
                          color={
                            categories.age?.ageRange ? "success" : "primary"
                          }
                          size="xs"
                          inline={categories.age?.ageRange ? false : true}
                        >
                          {ageRangeEnums?.map((item: string, index: number) => (
                            <Dropdown.Item
                              className="text-black"
                              key={index}
                              onClick={() =>
                                setCategories({
                                  ...categories,
                                  age: { ageGroup: "Kids", ageRange: item },
                                })
                              }
                            >
                              {item}
                            </Dropdown.Item>
                          ))}
                        </Dropdown>
                      </div>
                    )}
                  </div>
                  {error.age &&
                    (!categories?.age?.ageGroup ||
                      (categories?.age?.ageGroup === "Kids" &&
                        !categories?.age?.ageRange)) && (
                      <span className="text-xs text-danger">{error.age}</span>
                    )}
                </div>
              </div>

              <div className="border rounded p-2">
                <div className="mb-2 block">
                  <Label value="Brand" />
                </div>
                <Dropdown
                  label={categories?.brand || "Select Brand"}
                  color={categories.brand ? "success" : "primary"}
                  size="xs"
                  inline={categories.brand ? false : true}
                  className="max-h-[30vw] overflow-auto"
                >
                  {brandEnums?.map((item: string, index: number) => (
                    <Dropdown.Item
                      className="text-black"
                      key={index}
                      onClick={() =>
                        setCategories({ ...categories, brand: item })
                      }
                    >
                      {item}
                    </Dropdown.Item>
                  ))}
                </Dropdown>
              </div>
              <div className="border rounded p-2">
                <div className="mb-2 block">
                  <Label value="Design" />
                  <div className="text-xs text-slate-500 mb-2">
                    Select as many designs as possible that apply
                  </div>
                  {designOptionEnums?.length > 0 && (
                    <div>
                      <Multiselect
                        options={designOptionEnums}
                        displayValue="value"
                        onSelect={(selectedList) => {
                          setCategories({
                            ...categories,
                            design: selectedList.map(
                              (item: OptionType) => item.value
                            ),
                          });
                        }}
                        onRemove={(selectedList) =>
                          setCategories({
                            ...categories,
                            design: selectedList.map(
                              (item: OptionType) => item.value
                            ),
                          })
                        }
                        selectedValues={designOptionEnums.filter(
                          (item: OptionType) =>
                            categories.design.includes(item.value)
                        )}
                        placeholder="Select design categories"
                        style={{
                          chips: {
                            background: "#219653",
                          },

                          searchBox: {
                            border: "none",
                            borderBottom: "1px solid #a17f1a",
                            borderRadius: "0px",
                          },
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="border rounded p-2">
                <div className="mb-2 block">
                  <Label value="Occasion" />
                  <div className="text-xs text-slate-500 mb-2">
                    Select as many occasions as possible that apply
                  </div>
                  {occasionOptionEnums?.length > 0 && (
                    <div>
                      <Multiselect
                        options={occasionOptionEnums}
                        displayValue="value"
                        onSelect={(selectedList) => {
                          setCategories({
                            ...categories,
                            occasion: selectedList.map(
                              (item: OptionType) => item.value
                            ),
                          });
                        }}
                        onRemove={(selectedList) =>
                          setCategories({
                            ...categories,
                            occasion: selectedList.map(
                              (item: OptionType) => item.value
                            ),
                          })
                        }
                        selectedValues={occasionOptionEnums.filter(
                          (item: OptionType) =>
                            categories.occasion.includes(item.value)
                        )}
                        placeholder="Select occasion categories"
                        style={{
                          chips: {
                            background: "#219653",
                          },

                          searchBox: {
                            border: "none",
                            borderBottom: "1px solid #a17f1a",
                            borderRadius: "0px",
                          },
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="border rounded p-2">
                <div className="mb-2 block">
                  <Label value="Sleeve Length" />
                  <div className="text-xs text-slate-500 mb-2">
                    Select the sleeve length
                  </div>
                  <Dropdown
                    label={categories?.sleeveLength || "Select Sleeve Length"}
                    color={categories.sleeveLength ? "success" : "primary"}
                    size="xs"
                    inline={categories.sleeveLength ? false : true}
                  >
                    {sleeveLengthEnums?.map((item: string, index: number) => (
                      <Dropdown.Item
                        key={index}
                        onClick={() =>
                          setCategories({ ...categories, sleeveLength: item })
                        }
                      >
                        {item}
                      </Dropdown.Item>
                    ))}
                  </Dropdown>
                </div>
              </div>

              <div className="border rounded p-2">
                <div className="mb-2 block">
                  <Label value="Fastening" />
                  <div className="text-xs text-slate-500 mb-2">
                    Select the fastening
                  </div>
                  {fasteningOptionEnums?.length > 0 && (
                    <div>
                      <Multiselect
                        options={fasteningOptionEnums}
                        displayValue="value"
                        onSelect={(selectedList) => {
                          setCategories({
                            ...categories,
                            fastening: selectedList.map(
                              (item: OptionType) => item.value
                            ),
                          });
                        }}
                        onRemove={(selectedList) =>
                          setCategories({
                            ...categories,
                            fastening: selectedList.map(
                              (item: OptionType) => item.value
                            ),
                          })
                        }
                        selectedValues={fasteningOptionEnums.filter(
                          (item: OptionType) =>
                            categories.fastening.includes(item.value)
                        )}
                        placeholder="Select fastening categories"
                        style={{
                          chips: {
                            background: "#219653",
                          },

                          searchBox: {
                            border: "none",
                            borderBottom: "1px solid #a17f1a",
                            borderRadius: "0px",
                          },
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="border rounded p-2">
                <div className="mb-2 block">
                  <Label value="Fit" />
                  <div className="text-xs text-slate-500 mb-2">
                    Select the fit
                  </div>
                  {fitOptionEnums?.length > 0 && (
                    <div>
                      <Multiselect
                        options={fitOptionEnums}
                        displayValue="value"
                        onSelect={(selectedList) => {
                          setCategories({
                            ...categories,
                            fit: selectedList.map(
                              (item: OptionType) => item.value
                            ),
                          });
                        }}
                        onRemove={(selectedList) =>
                          setCategories({
                            ...categories,
                            fit: selectedList.map(
                              (item: OptionType) => item.value
                            ),
                          })
                        }
                        selectedValues={fitOptionEnums.filter(
                          (item: OptionType) =>
                            categories.fit.includes(item.value)
                        )}
                        placeholder="Select fit categories"
                        style={{
                          chips: {
                            background: "#219653",
                          },

                          searchBox: {
                            border: "none",
                            borderBottom: "1px solid #a17f1a",
                            borderRadius: "0px",
                          },
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {stage === 3 && (
            <BespokeBodyMeasurement
              product={product}
              bodyMeasurementEnums={bodyMeasurementEnums}
              measurements={measurements}
              setMeasurements={setMeasurements}
              genders={categories.gender}
            />
          )}
          {stage === 4 && <BespokeImages product={product} />}
          {stage === 5 && (
            <div>
              <BespokeVariation
                product={product}
                allColors={colorEnums}
                colorType={colorType}
                setColorType={setColorType}
                availableColors={availableColors}
                setAvailableColors={setAvailableColors}
                price={price}
                setPrice={setPrice}
              />
            </div>
          )}
          {stage === 6 && (
            <AutoPriceAdjustment
             
              setServerError={(error: string | null) =>
                setServerError(error || "")
              }
              serverError={serverError}
              product={product}
           
            />
          )}
        </div>
        {openSubmitModal && (
          <SubmitProductModal
            productId={productId}
            open={openSubmitModal}
            close={() => {
              setDimBackground(false);
              setOpenSubmitModal(false);
            }}
          />
        )}
        <div className="flex justify-between items-end my-4">
          <Button
            onClick={prevStep}
            size="sm"
            disabled={stage === 1}
            color="primary"
          >
            Previous
          </Button>
          <Button
            onClick={nextStep}
            disabled={stage === 7}
            size="sm"
            color="success"
          >
            {stage === 6 ? "Save and Submit" : "Save and Continue"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddBespokeClothPage;
