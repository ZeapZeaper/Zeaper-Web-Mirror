"use client";

import { Drawer } from "flowbite-react";
import Order from "./Order";
import { OrderInterface } from "@/interface/interface";

//import { useSelector } from 'react-redux';
//import { globalSelectors } from '../../../redux/services/global.slice';
// import { numberWithCommas } from '../../../utils/helpers';

const drawerTheme = {
  root: {
    base: "fixed z-50  overflow-y-auto bg-slate-100   p-4 transition-transform ",

    position: {
      right: {
        on: "right-0 top-0 md:top-[7%] h-screen w-screen lg:w-[40vw] transform-none",
        off: "right-0 top-0 h-screen w-80 translate-x-full",
      },
    },
  },
};

export function OrderDrawer({
  isOpen,
  setIsOpen,
  order,
}: {
  order: OrderInterface;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  // const token = useSelector(globalSelectors.selectAuthToken);
  // const orderQuery = zeapApiSlice.useGetOrderQuery(
  //   { order_id },
  //   { skip: !token || !order_id },
  // );
  // const order = orderQuery?.data?.data;
  // const isLoading = orderQuery.isLoading;

  const handleClose = () => setIsOpen(false);

  return (
    <Drawer
      open={isOpen}
      onClose={handleClose}
      position="right"
      theme={drawerTheme}
    >
      <Drawer.Header title="Order" className="text-darkGold" />
      <Drawer.Items>
        {order && (
          <div className="p-4 flex flex-col">
            <Order order={order} />
          </div>
        )}
      </Drawer.Items>
    </Drawer>
  );
}
