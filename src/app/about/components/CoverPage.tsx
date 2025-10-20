"use client";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import BackgroudImage from "@/images/signage-1.jpg";
import Typed from "typed.js";
import { useEffect, useMemo, useRef } from "react";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";

const CoverPage = ({
  handleScrollToWhoWeAre,
  handleScrollToMission,
}: {
  handleScrollToWhoWeAre: () => void;
  handleScrollToMission: () => void;
}) => {
  const typrdRef = useRef<HTMLDivElement>(null);
  const options = useMemo(
    () => ({
      strings: ["Personal", "Secure", "Reliable", "Affordable", "Accessible"],
      typeSpeed: 50,
      backSpeed: 30,
      loop: true,
    }),
    []
  );

  useEffect(() => {
    if (typrdRef.current) {
      const typed = new Typed(typrdRef.current, options);
      return () => {
        typed.destroy();
      };
    }
  }, [typrdRef, options]);
  return (
    <div>
      <section
        style={{ backgroundImage: `url(${BackgroudImage.src})` }}
        className="py-24 lg:py-40 w-full table relative bg-center bg-cover"
        id="home"
      >
        <div className="absolute inset-0 bg-slate-800 opacity-80"></div>
        <div className="container relative">
          <div className="grid grid-cols-1 mt-12">
            <h4 className="text-white lg:text-5xl text-2xl lg:leading-normal leading-normal font-medium mb-7 position-relative">
              A Fashion Platform Designed
              <br />
              To Make your Shopping{" "}
              <span
                ref={typrdRef}
                className="typewrite relative text-type-element"
                id="typed"
                data-period="2000"
                data-type='["Personal","Secure","Affordable","Accessible","Reliable"]'
              ></span>
            </h4>

            <div className="relative mt-10 flex items-center gap-4">
              <ButtonPrimary onClick={handleScrollToWhoWeAre}>
                Who We Are
              </ButtonPrimary>
              <ButtonSecondary
                onClick={handleScrollToMission}
                className="text-black bg-lightSuccess"
              >
                Our Mission
              </ButtonSecondary>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CoverPage;
