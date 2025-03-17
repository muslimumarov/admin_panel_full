import { useEffect } from "react";
import { socket } from "../utils/socket";

const useSocket = () => {
  useEffect(() => {
    if (socket.disconnected) {
      socket.connect();
    }
  }, []);

  return {
    socket,
  };
};

export default useSocket;
