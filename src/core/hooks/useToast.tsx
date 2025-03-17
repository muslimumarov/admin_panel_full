import { Slide, toast, ToastOptions } from "react-toastify";
import ToastContainer from "../components/atoms/toast/ToastContainer.tsx";
import { ReactNode, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useThemeMode } from "flowbite-react";
import { ThemeMode } from "../enums/ThemeMode.ts";

interface ToastProps {
  message?: ReactNode;
  title?: ReactNode;
  icon?: string | null;
}

const useToast = () => {
  const { t } = useTranslation();
  const { mode } = useThemeMode();

  const defaultConfig: ToastOptions = useMemo(
    () => ({
      position: toast.POSITION.TOP_RIGHT,
      hideProgressBar: false,
      transition: Slide,
      closeButton: false,
      bodyClassName: "w-full",
      theme: mode as ThemeMode,
    }),
    [mode],
  );

  const error = ({
    title = t("errorOccurred"),
    message = t("ErrorOccurred."),
  }: ToastProps) =>
    toast.error(<ToastContainer message={message} title={title} />, {
      ...defaultConfig,
    });

  const success = ({
    title = t("successfullyCompleted"),
    message = "",
  }: ToastProps) =>
    toast.success(<ToastContainer message={message} title={title} />, {
      ...defaultConfig,
    });

  const warning = ({ title = t("warning"), message = "" }: ToastProps) =>
    toast.warning(<ToastContainer message={message} title={title} />, {
      ...defaultConfig,
    });

  const info = ({ title = t("message"), message = "" }: ToastProps) =>
    toast.info(<ToastContainer message={message} title={title} />, {
      ...defaultConfig,
    });

  return { error, success, warning, info };
};

export default useToast;
