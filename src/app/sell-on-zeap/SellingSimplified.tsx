import { sellingSimplified } from "@/data/content";
import Pic from "@/images/sell2.jpg";
import Image from "next/image";
import StartSelling from "../../components/shop/StartSelling";

const SellingSimplified = ({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="flex flex-col md:flex-row  gap-4 p-4 w-full  items-center md:justify-between w-full">
      <div className="flex items-center justify-start w-full ">
        <Image
          src={Pic}
          alt="sell-on-zeap"
          width={500}
          height={500}
          className="rounded-lg  w-full h-auto object-cover"
        />
      </div>
      <div className="flex flex-col gap-2  w-full items-end w-100">
        <div className="flex flex-col gap-2 justify-center w-full">
          <span className=" text-lg md:text-2xl font-bold text-center items-center">
            Selling Simplified
          </span>
        </div>
        <div className="flex flex-col gap-5 md:max-w-[27rem]">
          {sellingSimplified.map((item, index) => (
            <div key={index} className="flex flex-col gap-2">
              <h2 className="text-md font-semibold ">{item.header}</h2>
              <p className="text-md">{item.description}</p>
            </div>
          ))}
          <span className="flex mt-4 w-full">
            <StartSelling setIsOpen={setIsOpen} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default SellingSimplified;
