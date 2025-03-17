import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import useAuthStore from "../store/useAuthStore.ts";

interface IsLoggedInProps {
  children?: ReactNode;
}

const IsLoggedIn = ({ children }: IsLoggedInProps) => {
  const { accessToken } = useAuthStore();

  return <>{accessToken ? children : <Navigate to={`/auth`} />}</>;
};

export default IsLoggedIn;
