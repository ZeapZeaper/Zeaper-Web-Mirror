import type { FC } from "react";
import React from "react";

import MainNav from "./MainNav";

export type HeaderProps = object;

const Header: FC<HeaderProps> = () => {
  return (
    <div className="nc-Header sticky top-0 left-0 z-50 bg-white ">
      <MainNav />
    </div>
  );
};

export default Header;
