import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import pic from "@/images/sell3.jpg";
import Image from "next/image";

const SectionBespoke = () => {
  return (
    <div className="items-stretch justify-between bg-green-50 flex py-2 flex-col-reverse lg:flex-row">
      <div className="basis-[50%] space-y-6  md:space-y-10 py-10 pl-2 text-primary md:pl-10">
        <p className="text-lg md:text-2xl font-medium">
          Clothes made to fit you, not the other way around
        </p>
        <div
          className="flex items-center gap-1 text-[20px] font-bold md:text-[50px]"
          style={{ lineHeight: "1em" }}
        >
          Guarantee return and cash back if tailor fails to deliver
        </div>

        <ButtonSecondary
          href="/collections/isBespoke=true?productGroupPage=BESPOKE&collectionTitle=Bespoke Collections"
          className="hover:bg-white hover:text-primary bg-secondary"
        >
          Browse our Bespoke Collection
          <ArrowRightIcon className="w-5 h-5 ml-2" />
        </ButtonSecondary>
      </div>
      <div className="flex  items-end overflow-hidden">
        <Image
          src={pic}
          alt="pic"
          width={500}
          height={500}
          className="rounded-lg w-full h-auto object-cover"
        />
      </div>
      {/* <div className="flex basis-[30%] items-end overflow-hidden">
        <Image
          src={heroImage}
          alt="hero image"
          className="-mb-16 w-full object-bottom"
        />
      </div> */}
    </div>
  );
};

export default SectionBespoke;
