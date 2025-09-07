import { useCallback, useContext, useEffect } from "react";

import { Button, Modal, Progress } from "flowbite-react";
import { HiCloudDownload } from "react-icons/hi";
import { SocketContext } from "@/contexts/webSocketContext";
import LoadingDots from "@/components/loading/LoadingDots";

const modalTheme = {
  root: {
    base: "fixed inset-x-0 top-0 z-999999 w-screen h-screen overflow-y-auto overflow-x-auto ",
  },
};

const FileDownloadProgressCardDIsplay = ({
  showModal,
  setShowModal,
  title,
  thisSessionId,
  progress,
  progressStatus = "pending",
  setProgress,
  setProgressStatus,
}: {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  title?: string;
  thisSessionId: string;
  progress: number;
  progressStatus: string;
  setProgress: (progress: number) => void;
  setProgressStatus: (status: string) => void;
}) => {
  const webSocket = useContext(SocketContext);
  const socket = webSocket?.socket;

  console.log("progressStatus", progressStatus);

  interface DownloadProgressData {
    progress: number;
    status: string;
  }

  const updateState = useCallback(
    (data: DownloadProgressData) => {
      const newData = { ...data };
      setProgress(newData.progress);
      setProgressStatus(newData.status);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    socket.emit("connectInit", thisSessionId);

    // receiving data from server
    socket.on("downloadProgress", (data: DownloadProgressData) => {
      console.log("data", data);
      updateState(data);
    });

    return () => {
      socket.off("downloadProgress");
    };
  }, [socket, thisSessionId, updateState]);

  const getPrpgressVariant = () => {
    if (progress < 10) return "red";
    else if (progress < 20) return "yellow";
    else if (progress < 70) return "cyan";
    else if (progress > 80) return "gold";
    else if (progress > 85) return "green";
  };

  return (
    <Modal
      className="bg-black bg-opacity-50 z-50"
      theme={modalTheme}
      title="Delete Image"
      onClose={() => setShowModal(false)}
      show={showModal}
    >
      <Modal.Header>
        <div className="text-sm md:text-lg font-bold flex text-center items-center">
          {" "}
          <HiCloudDownload className="me-2" />
          {title ? title : "Progress"}
        </div>
      </Modal.Header>

      <Modal.Body>
        <div className="d-flex justify-content-center">
          <div className="d-flex flex-column align-items-center">
            <h5 className="mt-2 mb-2">
              {progressStatus.charAt(0).toUpperCase() + progressStatus.slice(1)}
            </h5>
            <LoadingDots />
            <div className="d-flex justify-content-center align-items-center w-full">
              <Progress
                progress={progress}
                textLabel={`downloading...`}
                labelProgress
                size="lg"
                color={getPrpgressVariant()}
              />
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            setShowModal(false);
          }}
        >
          Close{" "}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FileDownloadProgressCardDIsplay;
