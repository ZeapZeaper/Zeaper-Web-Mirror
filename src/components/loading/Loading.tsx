import { smallScreen } from "@/utils/screenSizes";

import LoadingImg from "@/images/loading.gif";
import Image from "next/image";

const Loading = () => {
  return (
    <div className="fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center  bg-opacity-50">
      <Image src={LoadingImg} alt="Loading" width={smallScreen ? 60 : 70} />
    </div>
  );
};

export default Loading;
