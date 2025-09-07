"use client";

import { Drawer, DrawerHeader } from "flowbite-react";
import Variations from "./Variations";
import { ProductInterface } from "@/interface/interface";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import { useSelector } from "react-redux";
import { globalSelectors } from "@/redux/services/global.slice";

const drawerTheme = {
  root: {
    base: "fixed z-50  overflow-y-auto bg-slate-100   p-4 transition-transform ",

    position: {
      right: {
        // on: " md:top-10 h-screen w-screen lg:w-[80vw] transform-none",
        off: "right-0 top-0 h-screen w-80 translate-x-full",
        on: "right-0 top-0 md:top-10 h-screen w-screen lg:w-[80vw]  transform-none",
      },
    },
  },
};

export function ManageVariationDrawer({
  isOpen,
  setIsOpen,
  product,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  product: ProductInterface;
}) {
  const token = useSelector(globalSelectors.selectAuthToken);

  const productOptionsQuery = zeapApiSlice.useGetProductsOptionsQuery(
    {},
    { skip: !token }
  );
  const options = productOptionsQuery?.data?.data;
  const colorEnums = options?.readyMadeClothes?.colorEnums;

  const handleClose = () => setIsOpen(false);

  return (
    <Drawer
      open={isOpen}
      onClose={handleClose}
      position="right"
      theme={drawerTheme}
    >
      <DrawerHeader title="Manage Variations" />
      <Drawer.Items className="p-4 flex flex-col gap-4">
        {" "}
        <div>
          <Variations product={product} allColors={colorEnums} />
        </div>
      </Drawer.Items>
    </Drawer>
  );
}
