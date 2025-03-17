import { useTranslation } from "react-i18next";
import { NavLink, useNavigate } from "react-router-dom";
import { ArrowRight, LockKeyhole } from "lucide-react";
import { Button, Tooltip } from "flowbite-react";
import useMediaQuerySizes from "../../../core/hooks/useMediaQuerySizes.tsx";

const SettingsPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { sm } = useMediaQuerySizes();

  return (
    <div className="container mx-auto p-6">
      <div className={"float-end flex"}>
        <Tooltip content={t("back")}>
          <Button color={"light"} onClick={() => navigate(-1)}>
            {sm && t("back")} <ArrowRight size={20} />
          </Button>
        </Tooltip>
      </div>
      <div className=" mt-6 border-gray-200 dark:border-gray-700">
        <ul className="-mb-px flex flex-wrap text-center text-sm font-medium text-gray-500 dark:text-gray-400">
          {/*<li className="me-2">*/}
          {/*  <NavLink*/}
          {/*    to=""*/}
          {/*    end*/}
          {/*    className={({ isActive }) =>*/}
          {/*      `group inline-flex items-center justify-center rounded-t-lg border-b-2 p-4 ${*/}
          {/*        isActive*/}
          {/*          ? "border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500"*/}
          {/*          : "border-transparent hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300"*/}
          {/*      }`*/}
          {/*    }*/}
          {/*  >*/}
          {/*    <User className="me-2 size-4" /> {t("Profile")}*/}
          {/*  </NavLink>*/}
          {/*</li>*/}
          <li className="me-2 ">
            <NavLink
              to=""
              className={({ isActive }) =>
                `group inline-flex items-center justify-center rounded rounded-t-lg  border-b-2 p-4 ${
                  isActive
                    ? "border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500"
                    : "border-transparent hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300"
                }`
              }
            >
              <LockKeyhole className="me-2 size-4" />{" "}
              {t("Parolni o'zgartirish")}
            </NavLink>
          </li>
          {/*<li className="me-2">*/}
          {/*  <NavLink*/}
          {/*    to="themes"*/}
          {/*    className={({ isActive }) =>*/}
          {/*      `group inline-flex items-center justify-center rounded-t-lg border-b-2 p-4 ${*/}
          {/*        isActive*/}
          {/*          ? "border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500"*/}
          {/*          : "border-transparent hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300"*/}
          {/*      }`*/}
          {/*    }*/}
          {/*  >*/}
          {/*    <Settings className="me-2 size-4 cursor-not-allowed" />{" "}*/}
          {/*    {t("Mavzular")}*/}
          {/*  </NavLink>*/}
          {/*</li>*/}
        </ul>
      </div>
    </div>
  );
};

export default SettingsPage;
