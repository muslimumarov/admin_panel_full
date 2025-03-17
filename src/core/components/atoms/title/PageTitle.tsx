import { ReactNode } from "react";

interface PageTitleProps {
  title: ReactNode;
}

const PageTitle = ({ title }: PageTitleProps) => {
  return (
    <h2 className={"mb-3 text-2xl font-semibold dark:text-white"}>{title}</h2>
  );
};

export default PageTitle;
