import { UserRole } from "../../pages/user/enums/UserRole.ts";

export interface UserInterface {
  id: number;
  avatar: string;
  email: string;
  password: string;
  role: UserRole;
}
