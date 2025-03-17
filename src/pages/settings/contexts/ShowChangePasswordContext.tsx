import { createContext } from "react";

interface ShowChangePasswordContextProps {
  show: boolean;
  setShow: (disabled: ShowChangePasswordContextProps["show"]) => void;
}

export const ShowChangePasswordContext =
  createContext<ShowChangePasswordContextProps>({
    show: false,
    setShow: () => {},
  });
