import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import AuthHookStore from "../store/useAuthStore.ts";

interface IsGuestProps {
  children?: ReactNode;
}

const IsGuest = ({ children }: IsGuestProps) => {
  const { accessToken } = AuthHookStore();

  return <>{accessToken ? <Navigate to={`/`} /> : children}</>;
};

export default IsGuest;
