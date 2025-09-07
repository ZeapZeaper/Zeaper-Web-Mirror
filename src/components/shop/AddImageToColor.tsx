"use client";
import { ColorInterface } from "@/interface/interface";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import { Alert, Button, FileInput, Label, Modal } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import Loading from "../loading/Loading";
import Image from "next/image";

const ModalTheme = {
  root: {
    base: "fixed inset-x-0 top-0 z-99999 h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full opacity-100",

    sizes: {
      sm: "max-w-sm",
      md: "max-w-md",
      lg: "max-w-lg",
      xl: "max-w-xl",
      "2xl": "max-w-2xl",
      "3xl": "max-w-3xl",
      "4xl": "max-w-4xl",
      "5xl": "max-w-5xl",
      "6xl": "max-w-6xl",
      "7xl": "max-w-7xl",
    },
  },
  content: {
    base: "relative h-full w-full p-4 md:h-auto",
    inner:
      "relative flex max-h-[90dvh] flex-col rounded-lg bg-white shadow dark:bg-gray-700",
  },
};
interface PreviewInterface {
  preview: string;
  file: File;
}
const AddImageToColor = ({
  openModal,
  close,
  color,
  productId,
  currColor,
  title,
}: {
  openModal: boolean;
  close: () => void;
  color?: string;
  productId: string;
  title?: string;
  currColor?: ColorInterface;
}) => {
  const myRef = useRef<HTMLImageElement | null>(null);

  const executeScroll = () =>
    myRef.current ? myRef.current.scrollIntoView({ behavior: "smooth" }) : null;
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const [previews, setPreviews] = useState<PreviewInterface[]>([]);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [updateProductColorAndImages, updateProductColorAndImagesStatus] =
    zeapApiSlice.useUpdateProductColorAndImagesMutation();
  const [addImagesToProductColor, addImagesToProductColorStatus] =
    zeapApiSlice.useAddImagesToProductColorMutation();
  const isLoading =
    updateProductColorAndImagesStatus.isLoading ||
    addImagesToProductColorStatus.isLoading;

  useEffect(() => {
    if (!selectedFiles || selectedFiles.length === 0) {
      return setPreviews([]);
    }
    const newPreviews: PreviewInterface[] = [];
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      newPreviews.push({
        preview: URL.createObjectURL(file),
        file,
      });
    }
    setPreviews(newPreviews);
    return () => {
      newPreviews.forEach((preview) => URL.revokeObjectURL(preview.preview));
    };
  }, [selectedFiles]);

  useEffect(() => {
    const MAX_FILE_SIZE = 1500; // 1.5MB
    if (selectedFiles) {
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const fileSizeKiloBytes = file.size / MAX_FILE_SIZE;
        if (fileSizeKiloBytes > MAX_FILE_SIZE) {
          executeScroll();
          setErrorMsg(
            "Selected file size is greater than 1.5MB. Please select a smaller file"
          );
          setTimeout(() => {
            setSelectedFiles(null);
          }, 2000);
          return;
        }
      }
      setErrorMsg("");
    }
  }, [selectedFiles]);

  const handleAddImages = async () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      executeScroll();
      setErrorMsg("Please select at least one image to upload");
      setTimeout(() => {
        setErrorMsg("");
      }, 2000);
      return;
    }
    const formData = new FormData();

    Array.from(selectedFiles).forEach((file) => {
      formData.append("images", file);
    });
    if (color) {
      formData.append("color", color);
    }
    formData.append("productId", productId);
    const payload = formData;
    if (currColor) {
      addImagesToProductColor({ payload })
        .unwrap()
        .then(() => {
          close();
        })
        .catch((err) => {
          executeScroll();
          setErrorMsg(err?.data?.error);
        });
      return;
    }

    updateProductColorAndImages({ payload })
      .unwrap()
      .then(() => {
        close();
      })
      .catch((err) => {
        executeScroll();
        setErrorMsg(err?.data?.error);
      });
  };

  return (
    <Modal
      size="7xl"
      theme={ModalTheme}
      show={openModal}
      onClose={() => close()}
    >
      <Modal.Header>
        {title || `Add Images to colour ${currColor?.value || color}`}
      </Modal.Header>
      <Modal.Body>
        {isLoading && <Loading />}
        {errorMsg && (
          <Alert color="failure" className="mb-4">
            {errorMsg}
          </Alert>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5  bg-bodydark my-2">
          {currColor?.images?.map((image, index) => (
            <div key={index} className="flex wrap gap-2 ">
              <div key={index} className="relative   my-2 p-2">
                <Image
                  key={index}
                  src={image?.link}
                  width={100}
                  height={100}
                  alt={color || ""}
                  className="w-full h-50 object-contain"
                />
              </div>
            </div>
          ))}

          {previews.map((preview, index) => (
            <div key={index} className="relative   my-2 p-2">
              <Image
                ref={index === 0 ? myRef : null}
                src={preview?.preview}
                alt="preview"
                width={100}
                height={100}
                className="w-full h-50 object-contain"
              />
              <button
                onClick={() => {
                  if (selectedFiles) {
                    const newSelectedFiles = [...selectedFiles];
                    newSelectedFiles.splice(index, 1);
                    const dataTransfer = new DataTransfer();
                    newSelectedFiles.forEach((file) =>
                      dataTransfer.items.add(file)
                    );
                    setSelectedFiles(dataTransfer.files);
                  }
                }}
                className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
        <div className="flex w-full items-center justify-center">
          <Label
            htmlFor="dropzone-file"
            className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pb-6 pt-5">
              <svg
                className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop.
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Must not exceed 5 images
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                PNG, JPG, WEBP or AVIF (MAX. 1MB)
              </p>
            </div>
            <FileInput
              id="dropzone-file"
              className="hidden"
              multiple
              onChange={(e) => {
                // add files to existing selected files
                if (selectedFiles) {
                  const dataTransfer = new DataTransfer();
                  for (
                    let i = 0;
                    e.target.files && i < e.target.files.length;
                    i++
                  ) {
                    dataTransfer.items.add(e.target.files[i]);
                  }
                  for (let i = 0; i < selectedFiles.length; i++) {
                    dataTransfer.items.add(selectedFiles[i]);
                  }
                  if (dataTransfer.files?.length > 5) {
                    executeScroll();
                    setErrorMsg(
                      "You can only upload a maximum of 5 images for each color"
                    );
                    setTimeout(() => {
                      setErrorMsg("");
                    }, 3000);
                    return;
                  }
                  setSelectedFiles(dataTransfer.files);
                } else {
                  setSelectedFiles(e.target.files);
                }
              }}
            />
          </Label>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleAddImages} color="success">
          Upload
        </Button>
        <Button color="gray" onClick={() => close()}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddImageToColor;
