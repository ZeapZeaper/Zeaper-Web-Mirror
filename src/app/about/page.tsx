"use client";
import { useRef } from "react";
import CoverPage from "./components/CoverPage";
import Mission from "./components/MIssion";
import WhoAreWe from "./components/WhoAreWe";

const AboutPage = () => {
  const whoWeAreRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  const handleScrollToWhoWeAre = () => {
    scrollToSection(whoWeAreRef);
  };
  const handleScrollToMission = () => {
    scrollToSection(missionRef);
  };

  return (
    <div>
      <CoverPage
        handleScrollToWhoWeAre={handleScrollToWhoWeAre}
        handleScrollToMission={handleScrollToMission}
      />
      <div ref={whoWeAreRef} className="container mx-auto px-4 py-6 lg:pb-28 ">
        <WhoAreWe />
      </div>
      <div ref={missionRef} className="container mx-auto px-4 py-6 lg:pb-28 ">
        <Mission />
      </div>
    </div>
  );
};

export default AboutPage;
