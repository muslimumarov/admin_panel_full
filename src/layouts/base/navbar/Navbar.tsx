import { Button, Navbar, useThemeMode } from "flowbite-react";
import { ListIcon, MenuIcon } from "lucide-react";
import logo from "../../../assets/images/logo.png";
import logoWhite from "../../../assets/images/logo-white.png";
import useMenuStore from "../../../core/store/useMenuStore.ts";
import { Profile } from "../components";
import { useNavigate } from "react-router-dom";
import LanguageSelector from "../components/LanguageSelector.tsx";
import ThemeToggle from "../components/ThemeToggle.tsx";
import { ThemeMode } from "../../../core/enums/ThemeMode.ts";

const MyNavbar = () => {
  const { menuOpen, setMenuOpen } = useMenuStore();
  const navigate = useNavigate();
  const { mode } = useThemeMode();

  return (
    <Navbar
      className="border-b border-gray-300/50 py-1 dark:bg-dark-primary"
      fluid
      rounded
    >
      <div className="flex flex-row-reverse items-center gap-3">
        <Navbar.Brand
          href="/"
          className={"h-[60px] transition-all duration-700 ease-in-out"}
        >
          <img
            src={mode === ThemeMode.LIGHT ? logo : logoWhite}
            className="size-full object-contain"
            alt="Flowbite Logo"
            onClick={() => navigate("/dashboard")}
          />
        </Navbar.Brand>
        <Button
          color={"gray"}
          size={"xs"}
          className={"cursor-pointer text-gray-600"}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <MenuIcon /> : <ListIcon />}
        </Button>
      </div>

      <div className="flex items-center gap-6 dark:text-white md:order-2">
        <LanguageSelector />
        {/*<Notification />*/}
        <ThemeToggle />
        <Profile />
      </div>
    </Navbar>
  );
};

export default MyNavbar;
