import useMeasure from "react-use-measure";
import { useMotionValue, useAnimate, motion } from "framer-motion";

import { ReactNode } from "react";

const SliderDrawer = ({
  children,
  direction = "bottom",
}: {
  children: ReactNode;
  direction: "right" | "bottom" | "left" | "top";
}) => {
  const [scope, animate] = useAnimate();
  const [drawerRef, { height }] = useMeasure();

  const y = useMotionValue(0);

  const handleClose = async () => {
    animate(scope.current, {
      opacity: [1, 0],
    });

    const yStart = typeof y.get() === "number" ? y.get() : 0;

    await animate("#drawer", {
      y: [yStart, height],
    });
  };
  const getInitial = () => {
    if (direction === "bottom") {
      return { y: "100%" };
    }
    if (direction === "right") {
      return { x: "100%" };
    }
    if (direction === "left") {
      return { x: "-100%" };
    }
    if (direction === "top") {
      return { y: "-100%" };
    }
  };
  const getAnimate = () => {
    if (direction === "bottom") {
      return { y: 0 };
    }
    if (direction === "right") {
      return { x: 0 };
    }
    if (direction === "left") {
      return { x: 0 };
    }
    if (direction === "top") {
      return { y: 0 };
    }
  };

  return (
    <motion.div
      ref={scope}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={handleClose}
      className="fixed inset-0 z-50 "
    >
      <motion.div
        id="drawer"
        ref={drawerRef}
        onClick={(e) => e.stopPropagation()}
        initial={getInitial()}
        animate={getAnimate()}
        transition={{
          ease: "easeInOut",
        }}
        className="absolute bottom-0 h-[75vh] w-full overflow-hidden rounded-t-3xl "
        style={{ y }}
      >
        <div className="relative z-0 h-full overflow-y-scroll p-4 pt-12">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SliderDrawer;
