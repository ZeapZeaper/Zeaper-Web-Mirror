//import '../style/message.css';

import Image from "next/image";

const Message = ({
  notification,
}: {
  notification: {
    image: string;
    title: string;
    body: string;
  };
}) => {
  return (
    <div className="flex w-full flex-col gap-2 z-50">
      <div className="flex gap-2">
        {/* image is optional */}
        {notification.image && (
          <div>
            <Image
              src={notification.image}
              alt="Notification"
              className="w-6 h-6 rounded-full"
              width={24}
              height={24}
            />
          </div>
        )}
        <span className="font-semibold">{notification.title}</span>
      </div>
      <div className="text-sm">{notification.body}</div>
    </div>
  );
};

export default Message;
