import { Alert, Drawer, DrawerItems } from "flowbite-react";
const drawerTheme = {
  root: {
    base: "fixed z-50  overflow-y-auto bg-white p-4 transition-transform dark:bg-gray-800",

    position: {
      top: {
        on: "left-0 right-0 top-0 w-full transform-none",
        off: "left-0 right-0 top-0 w-full -translate-y-full",
      },
    },
  },
};

function MobileAddedToCart({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) {
  return (
    <Drawer
      theme={drawerTheme}
      open={isOpen}
      onClose={() => setIsOpen(false)}
      position="top"
      edge
    >
      <DrawerItems>
        <Alert
          color="success"
          onDismiss={() => setIsOpen(false)}
          additionalContent={
            <div className="flex items-center justify-center cursor-pointer bg-primary mt-4  p-2 text-white rounded-md">
              My Cart
            </div>
          }
          icon={() => (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1-1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
              />
            </svg>
          )}
        >
          <span className="ml-2">Added to cart</span>
        </Alert>
      </DrawerItems>
    </Drawer>
  );
}
export default MobileAddedToCart;
