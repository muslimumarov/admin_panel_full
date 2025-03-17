import { CustomFlowbiteTheme, Flowbite } from "flowbite-react";
import { ReactNode } from "react";

interface ThemeProviderProps {
  children: ReactNode;
}

const theme: CustomFlowbiteTheme = {
  // dropdown: {
  //     content: 'dark:bg-dark-primary shadow-xl',
  // }
};

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return <Flowbite theme={{ theme }}>{children}</Flowbite>;
};

export default ThemeProvider;
