import { Tabs, TabsProps } from "flowbite-react";

interface MyTabsProps extends TabsProps {}

const MyTabs = ({ ...props }: MyTabsProps) => {
  return (
    <Tabs
      className={"rounded-xl"}
      {...props}
      theme={{
        base: "rounded-xl border border-gray-300",
        tabpanel: "p-3",
        tablist: {
          base: "overflow-hidden  rounded-t-xl bg-gray-100 dark:bg-dark-secondary",
          tabitem: {
            base: "p-3 text-sm",
            variant: {
              underline: {
                base: "rounded-0",
                active: {
                  on: "border-b-2 border-blue-600 bg-white text-blue-600 dark:bg-dark-secondary",
                },
              },
            },
          },
        },
      }}
    />
  );
};

export default MyTabs;
