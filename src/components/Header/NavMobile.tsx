import React from "react";
import { MdClose } from "react-icons/md";

import Logo from "@/shared/Logo/Logo";
import MobileMenuBar from "./MobileMenuBar";

export interface NavMobileProps {
  onClickClose?: () => void;
}

const NavMobile: React.FC<NavMobileProps> = ({ onClickClose = () => {} }) => {
  return (
    <div className="h-screen w-full divide-y divide-neutral-300 overflow-y-auto bg-white py-2 shadow-lg ring-1 transition">
      <div className="px-5 py-2">
        <Logo />
        <div className="absolute right-2 top-2 p-1">
          <MdClose onClick={onClickClose} />
        </div>
      </div>
      <MobileMenuBar onClickClose={onClickClose} />
    </div>
  );
};

export default NavMobile;
