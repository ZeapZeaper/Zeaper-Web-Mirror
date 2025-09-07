"use client";

import { io } from "socket.io-client";

import { createContext } from "react";

export const thisSessionId = Math.random().toString(36).slice(2);
const env = process.env.REACT_APP_ENV || "dev";
//const SOCKET_URL = "http://localhost:8080/";
const SOCKET_URL =
  env === "dev"
    ? process.env.NEXT_PUBLIC_SERVER_URL_DEV || "http://localhost:8080"
    : process.env.NEXT_PUBLIC_SERVER_URL_PROD || "http://localhost:8080";

export const socket = io(SOCKET_URL);
interface WebSocketContextInterface {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  socket: any;
  thisSessionId: string;
}
console.log("SOCKET_URL", SOCKET_URL);
export const SocketContext = createContext<WebSocketContextInterface>({
  socket: socket,
  thisSessionId: thisSessionId,
});

const webSocket = {
  socket: socket,
  thisSessionId: thisSessionId,
};


export const WebSocketProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SocketContext.Provider value={webSocket}>
      {children}
    </SocketContext.Provider>
  );
};
