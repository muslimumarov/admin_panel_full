import { SyntheticEvent } from "react";
import useUserStore from "../store/useUserStore.ts";
import { UserRole } from "../../pages/user/enums/UserRole.ts";

const createSlug = (name: string) => {
  return name.toLowerCase().replace(/(-|\s)/g, "_");
};

const handleImageFallback = ($e: SyntheticEvent<HTMLDivElement, Event>) => {
  const img = $e.target as HTMLImageElement;
  if (img) {
    img.src = "/images/fallback.png";
  }
};

const hasAccess = (roles: UserRole[] = []) => {
  const { me } = useUserStore.getState();
  return me && roles.includes(me?.role);
};

export { createSlug, handleImageFallback, hasAccess };
