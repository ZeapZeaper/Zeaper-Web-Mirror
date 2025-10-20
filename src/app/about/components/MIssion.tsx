import Image from "next/image";
import Pic from "@/images/two-african-dressmaker.jpg";

const Mission = () => {
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
            Our Mission
          </span>
        </div>
        <div className="flex flex-col gap-5 md:max-w-[27rem]">
          <p className="text-md">
            To give every customer the freedom to express themselves through
            fashion, without worrying about trust, quality, or disappointment.
            We do this by protecting every transaction, supporting authentic
            creators, and placing your satisfaction at the center of everything
            we offer.
          </p>
          <p className="text-md">
            Our goal is to make fashion feel personal, secure, and uplifting.
            Whether you are choosing a one of a kind outfit or something
            beautifully crafted and ready to wear, we make sure the experience
            feels right from the moment you order to the moment it arrives.
          </p>
          <p className="text-md">
            Because at Zeaper, fashion is not just about what you wear. It is
            about how it makes you feel. We are here to ensure you feel seen,
            confident, and valued every step of the way.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Mission;
