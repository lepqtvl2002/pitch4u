import { UserRole } from "@/enums/roles";
import { IToken } from "./token";

export interface IUser {
  user_id: number;
  avatar: string | null;
  fullname: string;
  phone: string | null;
  email: string;
  provider: string;
  password?: string;
  is_verified: boolean;
  gender: "male" | "female" | "other";
  birthday: string;
  role_id: number;
  is_suspended: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  role: Role;
  access: IToken;
  refresh: IToken;
}

interface Role {
  name: UserRole;
}
