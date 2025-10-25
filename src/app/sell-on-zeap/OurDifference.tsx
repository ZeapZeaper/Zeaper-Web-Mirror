import { ourDifference } from "@/data/content";
import Pic from "@/images/signage-1.jpg";
import Image from "next/image";
import StartSelling from "../../components/shop/StartSelling";

const OurDifference = ({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="flex flex-col md:flex-row  gap-4 p-4 w-full flex-col-reverse items-center md:justify-between">
      <div className="flex flex-col gap-2 justify-start items-start w-full">
        <span className="text-lg md:text-2xl font-bold ">
          Why Sell on Zeaper?
        </span>
        <div className="flex flex-col gap-5 md:max-w-[27rem]">
          {ourDifference.map((item, index) => (
            <div key={index} className="flex flex-col gap-2">
              <h2 className="text-md font-semibold ">{item.header}</h2>
              <p className="text-md">{item.description}</p>
            </div>
          ))}
        </div>
        <span className="flex mt-4 w-full">
          <StartSelling setIsOpen={setIsOpen} />
        </span>
      </div>
      <div className="flex items-center justify-end w-full ">
        <Image
          src={Pic}
          alt="sell-on-zeap"
          width={500}
          height={500}
          className="rounded-lg  w-full h-auto object-cover"
        />
      </div>
    </div>
  );
};

export default OurDifference;
