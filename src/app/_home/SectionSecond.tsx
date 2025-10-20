import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import { ArrowRightIcon } from "@heroicons/react/24/solid";


const SectionSecond = () => {
  return (
    <div className="items-stretch justify-center bg-lightGold lg:flex ">
      <div className="basis-[50%] space-y-10 py-10 pl-5 text-primary md:pl-10">
        <p className="text-2xl font-medium">FASHION WORLD</p>
        <div
          className="flex items-center gap-1 text-[40px] font-bold md:text-[70px]"
          style={{ lineHeight: "1em" }}
        >
          Home of Stunning Fashion
        </div>

        <ButtonSecondary
          href="/products"
          className="hover:bg-white hover:text-primary bg-secondary"
        >
          Shop Now
          <ArrowRightIcon className="w-5 h-5 ml-2" />
        </ButtonSecondary>
      </div>
      <div className="flex basis-[30%] items-end overflow-hidden">
        <video
          src={"/home.mp4"}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          className="object-cover w-full h-full rounded-full"
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

export default SectionSecond;
