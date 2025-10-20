import Image from "next/image";
import Pic from "@/images/fashionDesigner1.jpg";

const WhoAreWe = () => {
  return (
    <div className="flex flex-col md:flex-row  gap-4 p-4 w-full flex-col-reverse items-center md:justify-between">
      <div className="flex flex-col gap-2 justify-start items-start w-full">
        <span className="text-lg md:text-2xl font-bold ">Who Are We?</span>
        <div className="flex flex-col gap-5 md:max-w-[27rem]">
          <p className="text-md">
            At Zeaper, fashion should feel personal, and shopping for it should
            feel secure. We are a fashion platform connecting clients to skilled
            designers and creatives offering <strong>bespoke</strong>{" "}
            (custom-made) and <strong>ready-to-wear</strong> pieces that reflect
            your unique style across the country, all through a trusted
            escrow-based marketplace.
          </p>
          <p className="text-md">
            Shopping with us means peace of mind. Your money is safely held
            until your order is completed to your satisfaction, so you get
            exactly what you paid for with zero stress. Our Vendors are
            thoroughly vetted for quality and reliability, so you can shop with
            confidence, knowing you&apos;re in trusted hands. Whether you are
            going for a showstopping custom look or selecting from our premium
            ready-to-wear pieces.
          </p>
          <p className="text-md">
            We are more than a marketplace. We are a community of creators and
            clients who care deeply about style, trust, and the details that
            make all the difference
          </p>
        </div>
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

export default WhoAreWe;
