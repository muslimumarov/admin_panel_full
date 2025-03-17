import { useThemeMode } from "flowbite-react";
import { ThemeMode } from "../../../core/enums/ThemeMode.ts";
import { MoonIcon, SunIcon } from "lucide-react";

const ThemeToggle = () => {
  const { mode, toggleMode } = useThemeMode();

  return (
    <span className={"cursor-pointer"} onClick={() => toggleMode()}>
      {mode === ThemeMode.DARK ? <SunIcon size={22} /> : <MoonIcon size={22} />}
    </span>
  );
};

export default ThemeToggle;
