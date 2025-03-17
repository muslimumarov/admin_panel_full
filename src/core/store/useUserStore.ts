import { createJSONStorage, persist } from "zustand/middleware";
import { create } from "zustand";
import { UserInterface } from "../interfaces/user.interface.ts";

type UserStoreState = {
  me: UserInterface | null;
  setMe: (_info: UserStoreState["me"]) => void;
};
const useUserStore = create<UserStoreState>()(
  persist(
    (set) => ({
      setMe: (data) => {
        set({ me: data });
      },
      me: null,
    }),
    {
      name: "userStore",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useUserStore;
