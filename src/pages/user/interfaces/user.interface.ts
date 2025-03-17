import { UserRole } from "../enums/UserRole.ts";

export interface UserInterface {
  id: number;
  username: string;
  avatar?: string;
  email: string;
  password: string;
  role: UserRole;
}
