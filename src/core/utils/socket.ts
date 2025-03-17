import { io } from "socket.io-client";
import { get } from "lodash";

let accessToken = "";

const authStore = localStorage.getItem("authStore");
if (authStore) {
  accessToken = get(JSON.parse(authStore), "state.accessToken", "");
}

export const socket = io("/", {
  query: {
    token: `${accessToken}`,
  },
});

socket.on("connect", () => {
  console.log("Connected");
});

socket.on("connect_error", (err) => {
  console.log(err);
});

socket.on("disconnect", () => {
  console.log("Disconnected");
});

export default socket;
