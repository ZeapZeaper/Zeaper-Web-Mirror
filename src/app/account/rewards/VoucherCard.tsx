import React, { useContext, useState } from "react";
import ReactTimeAgo from "react-time-ago";

import { VoucherInterface } from "@/interface/interface";
import VoucherLeftImage from "@/images/voucherLeft.png";
import VoucherRightImage from "@/images/voucherRight.png";
import Image from "next/image";
import { formatCurrency } from "@/utils/helpers";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Alert, Badge, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { ThemeContext } from "@/contexts/themeContext";
import { FaCopy } from "react-icons/fa";



const VoucherCard = ({ voucher }: { voucher: VoucherInterface }) => {
  const { setDimBackground } = useContext(ThemeContext);
  const [openModal, setOpenModal] = useState(false);
  const [voucherCodeCopied, setVoucherCodeCopied] = useState(false);

  const handleClose = () => {
    setDimBackground(false);
    setOpenModal(false);
  };
  const checkSupportForCopyToClipBoard = () => {
    return navigator.clipboard && window.isSecureContext;
  };
  const checkExpired = () => {
   
    const today = new Date();
    const expiryDate = new Date(voucher.expiryDate);
    today.setHours(0, 0, 0, 0);
    expiryDate.setHours(0, 0, 0, 0);
    console.log( "Today: ", today.toDateString(), "Expiry Date: ", expiryDate.toDateString());
    const isExpired = expiryDate < today;
    console.log("Is Expired: ", isExpired);
    return isExpired;
  };
  return (
    <div className="grid grid-cols-4 gap-0 p-4 rounded-md">
      <div className="flex items-center  col-span-1 mt-4">
        <Image
          src={VoucherLeftImage}
          alt="Voucher Left"
          width={100}
          height={100}
        />
      </div>
      {/* make right image background */}
      <div
        style={{
          backgroundImage: `url(${VoucherRightImage.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "100%",
        }}
        className="relative flex flex-col items-center justify-center col-span-3 gap-2 my-4"
      >
        <span className="text-md font-semibold text-success ">
          {formatCurrency(voucher.amount, voucher.currency)}
        </span>
        <Alert
          className="text-xs"
          color={
            checkExpired()
              ? "failure"
              : "success"
          }
        >
          {checkExpired() ? (
            <span>
              {" "}
              Expired {""}
              <ReactTimeAgo date={voucher.expiryDate} locale="en-US" />
            </span>
          ) : (
            <span>
              Expires {""}
              <ReactTimeAgo date={voucher.expiryDate} locale="en-US" />
            </span>
          )}
        </Alert>
        <span
          onClick={() => {
            setDimBackground(true);
            setOpenModal(true);
          }}
          className="inline-flex cursor-pointer justify-center text-white items-center gap-2 bg-primary hover:bg-green-500 p-2 rounded-md"
        >
          <span className="text-xs text-gray-500 ">View Voucher Code</span>
          <FaLongArrowAltRight className="" />
        </span>
        <span className="absolute -top-4  right-0 flex  items-center justify-center gap-2 p-2 text-xs text-slate-500">
          <Badge size="xs" color={voucher.isUsed ? "failure" : "success"}>
            {voucher.isUsed ? "Used" : "Unused"}
          </Badge>
          <Badge
            size="xs"
            color={
              checkExpired()
                ? "failure"
                : "success"
            }
          >
            {checkExpired()
              ? "Expired"
              : "Valid"}
          </Badge>
        </span>
      </div>
      <Modal
        show={openModal}
        size="md"
        onClose={handleClose}
        popup
        position="center"
      >
        <ModalHeader>
          <div className="flex flex-col gap-0">
            <h1 className="text-lg font-bold">Voucher</h1>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="flex flex-col gap-4 p-4 justify-center items-center">
            <div className="flex flex-col gap-2 py-4 px-6 bg-lightGold rounded-md">
              <span className="text-sm font-semibold text-slate-500">
                Your voucher code
              </span>
              {voucherCodeCopied && (
                <span className="text-xs text-success">
                  Voucher code copied to clipboard!
                </span>
              )}
              <span className="inline-flex text-lg font-semibold text-success items-center justify-center gap-4">
                {voucher.code} {checkSupportForCopyToClipBoard() && (
                  <FaCopy className="text-xs text-primary cursor-pointer" 
                    onClick={() => {
                      navigator.clipboard.writeText(voucher.code);
                      setVoucherCodeCopied(true);
                      setTimeout(() => {
                        setVoucherCodeCopied(false);
                      }, 2000);
                    }}
                  />
                )}
              </span>
            </div>
            <span className="text-xs text-slate-500">
              Valid until {new Date(voucher.expiryDate).toDateString()}
            </span>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default VoucherCard;
