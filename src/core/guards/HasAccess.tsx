// interface HasAccessProps {
//     roles: string[];
//     children?: React.ReactNode;
// }

import useUserStore from "../store/useUserStore.ts";
import { UserRole } from "../../pages/user/enums/UserRole.ts";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface HasAccessProps {
  roles: UserRole[];
  children?: ReactNode;
}

const HasAccess = ({ roles = [], children }: HasAccessProps) => {
  const { me } = useUserStore();

  return (
    <>
      {me && roles.includes(me?.role) ? (
        children
      ) : (
        <Navigate to={"/error/forbidden"} />
      )}
    </>
  );
};

export default HasAccess;
