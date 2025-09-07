"use client";

import { Alert, Drawer, DrawerHeader } from "flowbite-react";
import { ProductInterface } from "@/interface/interface";
import AutoPriceAdjustment from "./AutoPriceAdjustment";
import { useState } from "react";

const drawerTheme = {
  root: {
    base: "fixed z-50  overflow-y-auto bg-slate-100   p-4 transition-transform ",

    position: {
      right: {
        // on: " md:top-10 h-screen w-screen lg:w-[80vw] transform-none",
        off: "right-0 top-0 h-screen w-80 translate-x-full",
        on: "right-0 top-0 md:top-10 h-screen w-screen lg:w-[50vw]  transform-none",
      },
    },
  },
};

export function ManageAutoPriceDrawer({
  isOpen,
  setIsOpen,
  product,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  product: ProductInterface;
}) {
  const [serverError, setServerError] = useState<string>("");

  const handleClose = () => setIsOpen(false);

  return (
    <Drawer
      open={isOpen}
      onClose={handleClose}
      position="right"
      theme={drawerTheme}
    >
      <DrawerHeader title="Manage Auto Price Adjustment" />
      <Drawer.Items className="p-4 flex flex-col gap-4">
        {" "}
        <div>
          {serverError && (
            <Alert color="failure" className="mb-4">
              <span>
                <span className="font-medium">Error!</span> {serverError}
              </span>
            </Alert>
          )}
          <AutoPriceAdjustment
            setServerError={(error: string | null) =>
              setServerError(error || "")
            }
            serverError={serverError}
            product={product}
          />
        </div>
      </Drawer.Items>
    </Drawer>
  );
}
