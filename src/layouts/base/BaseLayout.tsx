import Navbar from "./navbar/Navbar.tsx";
import MySidebar from "./sidebar/MySidebar.tsx";
import { Outlet } from "react-router-dom";
const BaseLayout = () => {
  return (
    <>
      <div className={"w-full shrink-0"}>
        <Navbar />
      </div>
      <div className={"flex h-[calc(100%-70px)] w-full shrink"}>
        <MySidebar />
        <div className={`size-full overflow-y-auto p-3`}>
          <div className="min-h-full rounded-lg bg-gray-50 p-3 dark:bg-dark-primary">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default BaseLayout;
